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

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    res.status(400).send("User already exists");
    return
  }

  const dobMomentObject = moment(date_of_birth);

  if(!dobMomentObject.isValid()){
    res.status(400).send("Invalid Date");   
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
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).send(resErrorJson(error.toString()));
  }
}
