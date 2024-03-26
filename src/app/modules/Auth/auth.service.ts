import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelpers } from "./../../../helpers/jwtHelpers";
import { UserStatus } from "@prisma/client";

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
    "abc6789",
    "5m"
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: existsUser.email,
      role: existsUser.role,
    },
    "ab65d",
    "30d"
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
    decodedData = jwtHelpers.verifyToken(token, "ab65d");
  } catch (error) {
    throw new Error("Your are not authorized");
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
    "abc6789",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: existsUser.needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
