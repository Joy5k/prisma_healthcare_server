import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";
import * as bcrypt from 'bcrypt'

const seedSuperAdmin = async () => {
    try {
        const isExistSuperAdmin = await prisma.user.findFirst({
            where: {
                role:UserRole.SUPER_ADMIN
            }
        })
        if (isExistSuperAdmin) {
            console.log("super admin already exists"); 
            return;
        }
        const hashedpassword =await bcrypt.hash("superadmin",12)
        const superAdminData = await prisma.user.create({
            data: {
                email: "superadmin@gmail.com",
                password: hashedpassword,
                role: UserRole.SUPER_ADMIN,
                admin: {
                    create: {
                        name: "superadmin",
                        contactNumber:"01601588531"
                    }
                }
            }
        })
    return superAdminData
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await prisma.$disconnect()
    }
}

seedSuperAdmin()