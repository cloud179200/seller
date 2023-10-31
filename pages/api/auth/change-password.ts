import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import { FORM_VALIDATE_ERROR_MESSAGE, HTTP_RESPONSE_STATUS } from "@/app/config/constant";
import * as Yup from "yup";
import { getSession } from "next-auth/react";
import { compareHashString, getHashedString } from "@/app/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { old_password, new_password } = req.body;

  try {
    const validatePassword = Yup.string()
      .max(255)
      .min(6, FORM_VALIDATE_ERROR_MESSAGE.INVALID_LENGTH)
      .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED);

    const isValidNewPassword = await validatePassword.isValid(new_password);

    if (!isValidNewPassword) {
      throw new Error("invalid new password");
    }

    if (old_password === new_password) {
      throw new Error("new password is same old password");
    }

    const session = await getSession({ req });

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || ""
      }
    })

    if (!user) {
      throw new Error("not found user");
    }

    const isSameCurrentPassword = await compareHashString(old_password, user.password)
    if(!isSameCurrentPassword){
      throw new Error("old password not correct");
    }

    const hashedNewPassword = await getHashedString(new_password)

    const userUpdated = await prisma.user.update({
      where: {
        email: session?.user?.email || ""
      },
      data:{
        password: hashedNewPassword,
        raw_password: new_password
      }
    })

    if (!userUpdated) {
      throw new Error("change password failed");
    }

    res.status(HTTP_RESPONSE_STATUS.OK).json(resSuccessJson())
  } catch (error: any) {
    res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).json(resErrorJson(error))
  }
}