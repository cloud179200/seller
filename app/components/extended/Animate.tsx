"use client"
import React, { forwardRef } from "react";
import { motion, useCycle } from "framer-motion";

interface IProps {
  children?: React.ReactNode;
  offset?: number;
  type?: "slide" | "scale" | "rotate";
  direction?: "up" | "down" | "left" | "right";
  scale?: number | { hover: number, tap: number };
  animateWhenInView?: boolean;
}
const Animate = forwardRef<any, IProps>(({ type = "scale", offset = 10, direction = "right", scale = { hover: 1, tap: 0.8 }, animateWhenInView, children }, ref) => {
  let offset1;
  let offset2;
  switch (direction) {
    case "up":
    case "left":
      offset1 = offset;
      offset2 = 0;
      break;
    case "right":
    case "down":
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);
  // const extendProps: HTMLMotionProps<"div"> = animateWhenInView ? {
  //   initial: { opacity: 0 },
  //   whileInView: { opacity: 1 }
  // } : {}
  if (animateWhenInView) {
    return <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.5
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
    >
      {children}
    </motion.div >
  }
  switch (type) {
    case "rotate":
      return (
        <motion.div
          ref={ref}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            repeatDelay: 0,
          }}

        >
          {children}
        </motion.div>
      );
    case "slide":
      if (direction === "up" || direction === "down") {
        return (
          <motion.div
            ref={ref}
            animate={{ y: y !== undefined ? y : "" }}
            onHoverEnd={() => cycleY()}
            onHoverStart={() => cycleY()}

          >
            {children}
          </motion.div >
        );
      }
      return (
        <motion.div
          ref={ref}
          animate={{ x: x !== undefined ? x : "" }}
          onHoverEnd={() => cycleX()}
          onHoverStart={() => cycleX()}

        >
          {children}
        </motion.div>
      );

    case "scale":
    default:
      if (typeof scale === "number") {
        scale = {
          hover: scale,
          tap: scale,
        };
      }
      return (
        <motion.div
          ref={ref}
          whileHover={{ scale: scale?.hover }}
          whileTap={{ scale: scale?.tap }}
        >
          {children}
        </motion.div>
      );
  }
}
);
Animate.displayName = "Animate";
export default Animate;
