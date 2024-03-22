import { Request, Response } from "express"
import { AdminService } from "./admin.service"

const getAllAdminFromDB = async(req:Request,res:Response) => {
    try {
        const result = await AdminService.getAllAdminFromDB(req.query)
            res.status(200).json({
                success: true,
                message: "Admin Retrieved Successfully",
                data:result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error?.message ||"Something went wrong"
        })
    }
    
}
export const AdminController = {
    getAllAdminFromDB
}