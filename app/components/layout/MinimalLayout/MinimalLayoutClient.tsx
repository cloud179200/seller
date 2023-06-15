import React from "react";
import Animate from "@/app/components/extended/Animate";
interface IProps {
  children?: React.ReactNode
}
const MinimalLayout = (props: IProps) => (
  <>
    <div className="min-h-screen">
      <Animate animateWhenInView>
        {props.children}
      </Animate>
    </div>
  </>
);

export default MinimalLayout;
