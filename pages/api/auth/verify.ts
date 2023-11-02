import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import moment from "moment";
import { HTTP_RESPONSE_STATUS } from "@/app/config/constant";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailVerifyToken } = req.body;

  if (!emailVerifyToken) {
    res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).send(resErrorJson("Not found token"));
    return
  }
  
  try {
    const verificationTokenDeleted = await prisma.verificationToken.delete({
      where:{
        token: emailVerifyToken
      }
    })

    if(!verificationTokenDeleted){
      throw new Error("Token expired");
    }

    const user = await prisma.user.update({
      where: {
        id: verificationTokenDeleted.user_id,
      },
      data: {
        emailVerified: moment().toDate(),
      }
    });

    if(!user){
      throw new Error("Not found user");
    }
    
    res.status(HTTP_RESPONSE_STATUS.OK).send(resSuccessJson());
  } catch (error: any) {
    res.status(HTTP_RESPONSE_STATUS.SERVER_ERROR).send(resErrorJson(error.toString()));
  }
}
