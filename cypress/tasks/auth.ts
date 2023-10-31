import prisma from '../../app/lib/prisma';
import { User, VerificationToken } from '@prisma/client';
import { TESTING_DATA } from '../../app/config/constant';
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
  await prisma.user.delete({
    where: {
      email: TESTING_DATA.USER_EMAIL
    }
  })

  await prisma.user.create({ data: { ...testUser, emailVerified: moment().toISOString() } })
}

export const resetRegister = async () => {
  const userDeleted = await prisma.user.delete({
    where: {
      email: TESTING_DATA.USER_EMAIL
    }
  })

  if (userDeleted) await prisma.verificationToken.delete({
    where: {
      user_id: userDeleted.id
    }
  })
}

export const resetEmailVerification = async () => {
  const userDeleted = await prisma.user.delete({
    where: {
      email: TESTING_DATA.USER_EMAIL
    }
  })

  if (userDeleted) await prisma.verificationToken.delete({
    where: {
      user_id: userDeleted.id
    }
  })

  const userCreated = await prisma.user.create({ data: { ...testUser, emailVerified: moment().toISOString() } })

  if(userCreated){
    await prisma.verificationToken.create({
      data: {...testVerificationToken, user_id: userCreated.id}
    })
  }
}