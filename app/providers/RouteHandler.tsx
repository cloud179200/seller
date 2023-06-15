"use client"
import React, { useMemo, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { NEXT_AUTH_STATUS } from "@/app/config/constant";
import { usePathname, useRouter } from "next/navigation";
import { PRIVATE_ROUTE } from '@/app/config/router';
import toast from 'react-hot-toast';
import { useAppDispatch } from "@/app/redux/store"
import { userActions, userActionsName } from '@/app/redux/user/slice';
import { utilsActions, utilsActionsName } from '../redux/utils/slice';
interface IProps {
  children?: React.ReactNode
}
function RouteHandler(props: IProps) {
  const router = useRouter()
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const { data, status } = useSession()
  const isPrivatePath = useMemo(() => PRIVATE_ROUTE.some(item => (pathname || "").startsWith(item.path)), [pathname])

  useEffect(() => {
    switch (status) {
      case NEXT_AUTH_STATUS.LOADING:
        if (!isPrivatePath) {
          toast.loading("Loading Auth Session...", { id: NEXT_AUTH_STATUS.LOADING });
        }
        dispatch(utilsActions[utilsActionsName.SET_LOADING_COMMON_ACTION]({state: true}))
        break;
      case NEXT_AUTH_STATUS.AUTHENTICATED:
        dispatch(utilsActions[utilsActionsName.SET_LOADING_COMMON_ACTION]({state: false}))
        toast.remove(NEXT_AUTH_STATUS.LOADING)
        if (!isPrivatePath) {
          router.replace("/dashboard")
        } else {
          toast.success(`Welcome ${data?.user?.email}`, { duration: 3000 })
        }
        dispatch(userActions[userActionsName.SET_USER_ACTION](data?.user || null))
        break;
      case NEXT_AUTH_STATUS.UNAUTHENTICATED:
        dispatch(utilsActions[utilsActionsName.SET_LOADING_COMMON_ACTION]({state: false}))
        toast.remove(NEXT_AUTH_STATUS.LOADING)
        if (isPrivatePath) {
          router.replace("/auth/login")
        }
        break;
      default:
        break;
    }
  }, [status, pathname])
  
  return (
    <>
      {props.children}
    </>
  )
}

export default RouteHandler