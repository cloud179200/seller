import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import { FORM_VALIDATE_ERROR_MESSAGE, HTTP_RESPONSE_STATUS, NOTIFICATION_KEYS } from "@/app/config/constant";
import * as Yup from "yup";
import { compareHashString, getHashedString } from "@/app/utils/auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NotificationSettings } from "@prisma/client";
import { ObjectId } from "mongodb";
import value from '@/app/assets/scss/_themes-vars.module.scss';

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

    const notificationItem = await prisma.notificationSettings.findUnique({
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
        setting_value: String(value)
      }
      const notificationItemCreated = await prisma.notificationSettings.create({
        data: newItem
      })
      if (!notificationItemCreated) {
        throw new Error("create settings failed");
      }
    } else {
      const notificationItemUpdated = await prisma.notificationSettings.update({
        where: {
          user_id: user.id,
          setting_key: NOTIFICATION_KEYS[key]
        },
        data: {
          setting_value: String(value)
        }
      })
      if (!notificationItemUpdated) {
        throw new Error("update settings failed");
      }
    }

    res.status(HTTP_RESPONSE_STATUS.OK).json(resSuccessJson())
  } catch (error: any) {
    res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).json(resErrorJson(error.toString()))
  }
}