import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import moment from "moment";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailVerifyToken } = req.body;
  if (!emailVerifyToken) {
    res.status(400).send(resErrorJson("Invalid token"));
  }
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where:{
        token: emailVerifyToken
      }
    })

    if(!verificationToken){
      throw new Error("Token expired");
    }

    const user = await prisma.user.update({
      where: {
        email: verificationToken?.email,
      },
      data: {
        emailVerified: moment().toDate(),
      }
    });

    if(!user){
      throw new Error("Not found user");
    }

    await prisma.verificationToken.delete({
      where:{
        email_token:{
          email: user.email,
          token: emailVerifyToken
        }
      }
    })

    res.status(200).send(resSuccessJson());
  } catch (error: any) {
    res.status(500).send(resErrorJson(error.toString()));
  }
}
