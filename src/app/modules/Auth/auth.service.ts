import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const loginUser = async (payload: { email: string; password: string }) => {
  const existsUser = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    existsUser.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid password")
  }
  const accessToken = jwt.sign(
    {
      email: existsUser.email,
      role: existsUser.role,
    },
    "abcdefghijklmnop12365423456789",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );  const refreshToken = jwt.sign(
    {
      email: existsUser.email,
      role: existsUser.role,
    },
    "abcdefghijklmnop12365423456789sdfasdfesfdfdsfewwwff8r5eR8f4w687ds4f65d",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );
  return {
    accessToken,
    needPasswordChange: existsUser.needPasswordChange,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
