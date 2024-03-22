import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleField } from "./admin.constant";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any, options: any) => {
  const { page, limit } = options;
  const { searchTerm, ...FieldInput } = params;
  const andCondition: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  console.log(FieldInput);
  if (Object.keys(FieldInput).length > 0) {
    andCondition.push({
      AND: Object.keys(FieldInput).map((key) => ({
        [key]: {
          equals: FieldInput[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip: (Number(page) - 1) * limit,
    take: Number(limit),
  });
  return result;
};

export const AdminService = {
  getAllAdminFromDB,
};
