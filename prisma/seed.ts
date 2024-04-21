import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";

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
        const superAdminData = await prisma.user.create({
            data: {
                email: "superadmin@gmail.com",
                password: "superadmin",
                role: UserRole.SUPER_ADMIN,
                admin: {
                    create: {
                        name: "superadmin",
                        contactNumber:"01601588531"
                    }
                }
            }
        })
    
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await prisma.$disconnect()
    }
}
seedSuperAdmin()