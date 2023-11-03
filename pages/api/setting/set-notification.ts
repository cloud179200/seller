import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import { HTTP_RESPONSE_STATUS, NOTIFICATION_KEYS } from "@/app/config/constant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NotificationSettings } from "@prisma/client";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { key, value }: { key: string, value: boolean } = req.body;

  try {
    const isValidNotificationKey = Boolean(NOTIFICATION_KEYS[key]);

    if (!isValidNotificationKey) {
      throw new Error("invalid key");
    }

    const session = await getServerSession(req, res, authOptions)

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || ""
      }
    })

    if (!user) {
      throw new Error("not found user");
    }

    const notificationItem = await prisma.notificationSettings.findFirst({
      where: {
        user_id: user.id,
        setting_key: NOTIFICATION_KEYS[key]
      }
    })

    if (!notificationItem) {
      const newItem: NotificationSettings = {
        id: new ObjectId().toString(),
        user_id: user.id,
        setting_key: NOTIFICATION_KEYS[key],
        setting_value: value
      }
      const notificationItemCreated = await prisma.notificationSettings.create({
        data: newItem
      })
      if (!notificationItemCreated) {
        throw new Error("create settings failed");
      }
    } else {
      const notificationItemUpdated = await prisma.notificationSettings.updateMany({
        where: {
          user_id: user.id,
          setting_key: NOTIFICATION_KEYS[key]
        },
        data: {
          setting_value: value
        }
      })
      if (notificationItemUpdated.count === 0) {
        throw new Error("update settings failed");
      }
    }

    res.status(HTTP_RESPONSE_STATUS.OK).json(resSuccessJson())
  } catch (error: any) {
    res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).json(resErrorJson(error.toString()))
  }
}