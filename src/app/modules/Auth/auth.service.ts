import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "./../../../helpers/jwtHelpers";
import { UserStatus } from "@prisma/client";
import config from "../../config";
import ApiErrors from "../../errors/ApiErrors";
import httpStatus from "http-status";

const loginUser = async (payload: { email: string; password: string }) => {
  const existsUser = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    existsUser.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: existsUser.email,
      role: existsUser.role,
    },
   config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: existsUser.email,
      role: existsUser.role,
    },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_token_expires_in as string
  );
  return {
    accessToken,
    needPasswordChange: existsUser.needPasswordChange,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(token,config.jwt.refresh_token as string);
  } catch (error) {
    throw new ApiErrors(httpStatus.UNAUTHORIZED,"Your are not authorized");
  }
  const existsUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });
  const accessToken = jwtHelpers.generateToken(
    {
      email: existsUser.email,
      role: existsUser.role,
    },
   config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: existsUser.needPasswordChange,
  };
};


const changePassword = async(user:any, payload:any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status:UserStatus.ACTIVE
    }
  })
  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);
  
  await prisma.user.update({
    where: {
      email:userData.email
    },
    data: {
      password: hashedPassword,
      needPasswordChange:false
    }
  })
return {message:"password change successfully"}
}

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword
};
