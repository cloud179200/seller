"use client";
import React, { useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { NEXT_AUTH_STATUS } from "@/app/config/constant";
import { usePathname, useRouter } from "next/navigation";
import { PRIVATE_ROUTE } from "@/app/config/router";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/app/redux/store";
import { userActions, userActionsName } from "@/app/redux/user/slice";
import { utilsActions, utilsActionsName } from "../redux/utils/slice";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import MinimalLayout from "../components/layout/MinimalLayout";
import Lottie from "lottie-react";
import tickIOS from "@/app/assets/lottie/tick-ios.json";
interface IProps {
  children?: React.ReactNode
}
function RouteHandler(props: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data, status } = useSession();
  const isPrivatePath = useMemo(() => PRIVATE_ROUTE.some(item => (pathname || "").startsWith(item.path)), [pathname]);
  
  const Wrapper = isPrivatePath ? MainLayout : MinimalLayout;

  useEffect(() => {
    switch (status) {
      case NEXT_AUTH_STATUS.LOADING:
        if (!isPrivatePath) {
          toast.loading("Loading Auth Session...", { id: NEXT_AUTH_STATUS.LOADING });
        }
        dispatch(utilsActions[utilsActionsName.SET_LOADING_COMMON_ACTION]({ state: true }));
        break;
      case NEXT_AUTH_STATUS.AUTHENTICATED:
        dispatch(utilsActions[utilsActionsName.SET_LOADING_COMMON_ACTION]({ state: false }));
        toast.remove(NEXT_AUTH_STATUS.LOADING);
        if (!isPrivatePath) {
          router.replace("/dashboard");
        } else {
          toast(`Welcome ${data?.user?.email}`, {
            className: "font-medium",
            icon: <Lottie className="h-8 w-8" animationData={tickIOS} initialSegment={[14, 28]} />,
            duration: 1500
          });
        }
        dispatch(userActions[userActionsName.SET_USER_ACTION](data?.user || null));
        break;
      case NEXT_AUTH_STATUS.UNAUTHENTICATED:
        dispatch(utilsActions[utilsActionsName.SET_LOADING_COMMON_ACTION]({ state: false }));
        toast.remove(NEXT_AUTH_STATUS.LOADING);
        if (isPrivatePath) {
          router.replace("/auth/login");
        }
        break;
      default:
        break;
    }
  }, [status, isPrivatePath]);

  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  );
}

export default RouteHandler;