import prisma from "../../../shared/prisma";
import * as bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginUser = async (payload: { email: string; password: string }) => {
  console.log("login user", payload);
  const existsUser = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword = await bycrypt.compare(
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
        expiresIn:'15d'
    }
    );
    console.log(accessToken);

    return {
        accessToken,
        needPasswordChange:existsUser.needPasswordChange
    };
};

export const AuthService = {
  loginUser,
};
