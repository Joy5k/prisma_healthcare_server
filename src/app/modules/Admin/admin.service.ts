import { paginationHelper } from "./../../../helpers/paginationHelper";
import { Admin, Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleField } from "./admin.constant";
import prisma from "../../../shared/prisma";

const getAllAdminFromDB = async (params: any, options: any) => {
  const { skip, limit, sortBy, sortOrder, page } =
    paginationHelper.calculatePagination(options);
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
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.admin.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};
const updateAdminIntoDB = async (id: string,data:Partial<Admin>) => {
  const result = await prisma.admin.update({
    where: {
      id
    },
    data
  });
  return result;
};

export const AdminService = {
  getAllAdminFromDB,
  getByIdFromDB,
  updateAdminIntoDB,
};
