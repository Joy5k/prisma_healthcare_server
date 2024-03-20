import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  console.log({ hashedPassword });
  //separating user from user input to from client
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await prisma.user.create({
      data: userData,
    });
    const createAdmin = await prisma.admin.create({
      data: data.admin,
      //the data.admin getting from the client so don't concern
    });
    return createAdmin;
  });

  return result;
};
export const userService = {
  createAdmin,
};
