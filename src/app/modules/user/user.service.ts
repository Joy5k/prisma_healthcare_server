import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";

const createAdmin = async (req: any) => {
  console.log(req.body);

  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
    console.log(uploadToCloudinary, "in service");
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  console.log({ hashedPassword });
  //separating user from user input to from client
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await prisma.user.create({
      data: userData,
    });
    const createAdmin = await prisma.admin.create({
      data: req.body.admin,
    });
    return createAdmin;
  });

  return result;
};
export const userService = {
  createAdmin,
};
