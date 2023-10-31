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
import { TESTING } from "@/app/config/constant";

const TEST_EMAIL = "test@gmail.com"

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


  const isTesting = email === TESTING.EMAIL;

  if (isTesting) {
    try {
      const testingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!testingUser) {
        throw new Error("Create user failed");
      }
      
      await prisma.verificationToken.deleteMany({
        where: {
          user_id: testingUser.id
        },
      });

      const testingEmailVerifyToken = await getHashedString(
        email + password
      );
      
      const newTestingVerificationData: VerificationToken = {
        id: new ObjectId().toString(),
        token: testingEmailVerifyToken,
        user_id: "",
        expires: null
      }

      const verificationToken = await prisma.verificationToken.create({
        data: { ...newTestingVerificationData, user_id: testingUser.id }
      })
  
      if (!verificationToken) {
        throw new Error("Create verification token failed");
      }

      res.status(200).json(testingUser)
    } catch (error: any) {
      res.status(500).send(resErrorJson(error.toString()));
    }
    return
  }

  const userExists = isTesting ? false : await prisma.user.findUnique({
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
        res.status(200).json(userExists);
      } catch (error: any) {
        res.status(500).send(resErrorJson(error.toString()));
      }
      return
    }
    res.status(400).send("User already exists");
    return
  }


  if (!dobMomentObject.isValid()) {
    res.status(400).send("Invalid Date");
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
    
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).send(resErrorJson(error.toString()));
  }
}
