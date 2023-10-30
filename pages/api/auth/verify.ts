import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import moment from "moment";
import { TESTING } from "@/app/config/constant";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailVerifyToken } = req.body;

  const isTesting = emailVerifyToken === TESTING.EMAIL_VERIFY_TOKEN;
  if (isTesting) {
    try {
      const testingUser = await prisma.user.findUnique({
        where: {
          email: TESTING.EMAIL,
        }
      });

      if(!testingUser){
        throw new Error("Not found user");
      }

      await prisma.verificationToken.delete({
        where:{
          user_id: testingUser.id
        }
      })
      
      res.status(200).send(resSuccessJson());
    } catch (error: any) {
      res.status(500).send(resErrorJson(error.toString()));
    }
    return
  }

  if (!emailVerifyToken) {
    res.status(400).send(resErrorJson("Invalid token"));
    return
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
        id: verificationToken.user_id,
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
        user_id: user.id
      }
    })

    res.status(200).send(resSuccessJson());
  } catch (error: any) {
    res.status(500).send(resErrorJson(error.toString()));
  }
}
