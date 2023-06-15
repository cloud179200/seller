"use client"
import React from 'react'
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react'
import { NEXT_AUTH_STATUS } from '@/app/config/constant'
import CustomBox from '@/app/components/custom-box/CustomBox'
const LoadingComponent = dynamic(() => import('@/app/components/Loading')) 

const page = () => {

  const { data, status } = useSession()

  const render = () => {

    if (NEXT_AUTH_STATUS.AUTHENTICATED === status) {
      return (
        <>
          <div>Signed in with {data?.user?.email} </div>
        </>
      )
    }

    return (
      <>
        <LoadingComponent />
      </>
    )
  }

  return <CustomBox>
    {render()}
  </CustomBox>
}

export default page