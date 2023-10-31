import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getHashedString as getHashedString } from "@/app/utils/auth";
import { resErrorJson } from "@/app/utils";
import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { User, VerificationToken } from "@prisma/client";
import { sendEmail } from "@/app/utils/email";
import config from "@/app/config";
import { HTTP_RESPONSE_STATUS } from "@/app/config/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    first_Name,
    last_Name,
    email,
    password,
    address,
    date_of_birth,
    country,
    phone_number,
    gender,
  } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const dobMomentObject = moment(date_of_birth);

  if (userExists) {
    if(userExists.emailVerified === null){
      const newEmailVerifyToken = await getHashedString(
        email + password + moment().toISOString()
      );
      try {
        const verificationToken = await prisma.verificationToken.update({
          where:{
            user_id: userExists.id
          },
          data:{
            token: newEmailVerifyToken
          }
        })

        
        if (!verificationToken) {
          throw new Error("Create verification token failed");
        }

        await sendEmail({
          to: email,
          subject: "VERIFY EMAIL",
          html: `<a href="${config.BASE_URL}/auth/verify?emailVerifyToken=${newEmailVerifyToken}">Verify email</a>`,
        });
        res.status(HTTP_RESPONSE_STATUS.OK).json(userExists);
      } catch (error: any) {
        res.status(HTTP_RESPONSE_STATUS.SERVER_ERROR).send(resErrorJson(error.toString()));
      }
      return
    }
    res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).send("User already exists");
    return
  }


  if (!dobMomentObject.isValid()) {
    res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).send("Invalid Date");
    return
  }

  const emailVerifyToken = await getHashedString(
    email + password + moment().toISOString()
  );
  
  const hashedPassword = await getHashedString(password)

  const newUserData: User = {
    id: new ObjectId().toString(),
    name: [first_Name.trim(), last_Name.trim()].join(" "),
    email: email,
    emailVerified: null,
    password: hashedPassword,
    raw_password: password,
    image: faker.image.avatar(),
    address,
    date_of_birth: dobMomentObject.toISOString() as unknown as Date,
    country,
    phone_number,
    gender: Boolean(gender),
  };

  const newVerificationData: VerificationToken = {
    id: new ObjectId().toString(),
    token: emailVerifyToken,
    user_id: "",
    expires: null
  }

  try {
    const user = await prisma.user.create({
      data: newUserData,
    });

    if (!user) {
      throw new Error("Create user failed");
    }

    const verificationToken = await prisma.verificationToken.create({
      data: { ...newVerificationData, user_id: user.id }
    })

    if (!verificationToken) {
      throw new Error("Create verification token failed");
    }

    await sendEmail({
      to: email,
      subject: "VERIFY EMAIL",
      html: `<a href="${config.BASE_URL}/auth/verify?emailVerifyToken=${emailVerifyToken}">Verify email</a>`,
    });
    
    res.status(HTTP_RESPONSE_STATUS.OK).json(user);
  } catch (error: any) {
    res.status(HTTP_RESPONSE_STATUS.SERVER_ERROR).send(resErrorJson(error.toString()));
  }
}
