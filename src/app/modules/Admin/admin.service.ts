import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any) => {
  const { searchTerm, ...FieldInput } = params;
  const andCondition: Prisma.AdminWhereInput[] = [];
  const adminSearchAbleField = ["name", "email"];
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
  });
  return result;
};

export const AdminService = {
  getAllAdminFromDB,
};
