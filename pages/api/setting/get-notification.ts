import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import { API_MESSAGE, HTTP_RESPONSE_STATUS, NOTIFICATION_KEYS } from "@/app/config/constant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await getServerSession(req, res, authOptions)

    if(!session){
      res.status(HTTP_RESPONSE_STATUS.UNAUTHORIZED).json(resErrorJson("unauthorized"))
      return
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || ""
      }
    })

    if (!user) {
      throw new Error("not found user");
    }

    const notificationItems = await prisma.notificationSettings.findMany({
      where: {
        user_id: user.id
      }
    })

    res.status(HTTP_RESPONSE_STATUS.OK).json(resSuccessJson(API_MESSAGE.SUCCESS, notificationItems))
  } catch (error: any) {
    res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).json(resErrorJson(error.toString()))
  }
}