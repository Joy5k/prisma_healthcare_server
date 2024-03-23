import { paginationHelper } from "./../../../helpers/paginationHelper";
import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
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
  if (Object.keys(FieldInput).length > 0) {
    andCondition.push({
      AND: Object.keys(FieldInput).map((key) => ({
        [key]: {
          equals: FieldInput[key],
        },
      })),
    });
  }
  andCondition.push({
  isDeleted:false
})
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

const getByIdFromDB = async (id: string) :Promise<Admin|null>=> {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
      isDeleted:false
    },
  });
  return result;
};
const updateAdminIntoDB = async (id: string, data: Partial<Admin>) :Promise<Admin|null> => {
  //checking the id is valid or not
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false
    }
  })

  const result = await prisma.admin.update({
    where: {
      id,
      isDeleted:false
    },
    data,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) :Promise<Admin|null> => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id
    }
  })

  const result = await prisma.$transaction(async(transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
       id
     }
    })
    await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email
      }
    })
    return adminDeletedData
  })
  return result
}
const softDeleteAdminFromDB = async (id: string) => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted:false
    }
  })

  const result = await prisma.$transaction(async(transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: {
       id
      },
      data: {
        isDeleted:true
      }
    })
     await transactionClient.user.update({
      where: {
        email:adminDeletedData.email
      },
      data: {
        status:UserStatus.DELETED
     }
     })
    return adminDeletedData
   
  })
  return result
}
export const AdminService = {
  getAllAdminFromDB,
  getByIdFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  softDeleteAdminFromDB
};
