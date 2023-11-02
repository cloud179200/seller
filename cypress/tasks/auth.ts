import prisma from '@/app/lib/prisma';
import { User, VerificationToken } from '@prisma/client';
import { TESTING_DATA } from '@/app/config/test';
import moment from "moment";
import { ObjectId } from "mongodb";

const testUser: User = {
  id: new ObjectId().toString(),
  name: TESTING_DATA.USER_NAME,
  email: TESTING_DATA.USER_EMAIL,
  emailVerified: null,
  password: TESTING_DATA.USER_PASSWORD_HASHED,
  raw_password: TESTING_DATA.USER_PASSWORD,
  image: TESTING_DATA.USER_IMG_SRC,
  address: TESTING_DATA.USER_ADDRESS,
  date_of_birth: moment().toISOString() as unknown as Date,
  country: TESTING_DATA.USER_COUNTRY_CODE,
  phone_number: TESTING_DATA.USER_PHONE_NUMBER,
  gender: true,
};

const testVerificationToken: VerificationToken = {
  id: new ObjectId().toString(),
  token: TESTING_DATA.EMAIL_VERIFY_TOKEN,
  user_id: "",
  expires: null
}

export const resetLogin = async () => {
  try {
    await prisma.user.deleteMany({
      where: {
        email: TESTING_DATA.USER_EMAIL
      }
    });

    await prisma.user.create({ data: { ...testUser, emailVerified: moment().toISOString() } });
    return true;
  } catch (error) {
    return error;
  }
}

export const resetRegister = async () => {
  try {
    await prisma.user.deleteMany({
      where: {
        email: TESTING_DATA.USER_EMAIL
      }
    });

    await prisma.verificationToken.deleteMany({
      where: {
        token: TESTING_DATA.EMAIL_VERIFY_TOKEN
      }
    });
    return true;
  } catch (error) {
    return error;
  }
}

export const resetEmailVerification = async () => {
  try {
    await prisma.user.deleteMany({
      where: {
        email: TESTING_DATA.USER_EMAIL
      }
    });

    await prisma.verificationToken.deleteMany({
      where: {
        token: TESTING_DATA.EMAIL_VERIFY_TOKEN
      }
    });

    const userCreated = await prisma.user.create({ data: { ...testUser, emailVerified: moment().toISOString() } });

    if (userCreated) {
      await prisma.verificationToken.create({
        data: { ...testVerificationToken, user_id: userCreated.id }
      });
    }
    return true;
  } catch (error) {
    return error;
  }
}