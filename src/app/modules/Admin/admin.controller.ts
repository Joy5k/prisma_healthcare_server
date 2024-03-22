import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
      const filters = pick(req.query, adminFilterableField);
      const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
      console.log(options);
    const result = await AdminService.getAllAdminFromDB(filters,options);
    res.status(200).json({
      success: true,
      message: "Admin Retrieved Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error?.message || "Something went wrong",
    });
  }
};

const getAdminByID = async (req:Request, res:Response) => { 
 try {
  const id = req.params.id;
  const result = await AdminService.getByIdFromDB(id)
  res.status(200).json({
    success: true,
    message: "Successfully retrieved",
    data:result
  })
 } catch (error) {
   res.status(500).json({
     success: false,
     message: error.message || "Something went wrong",
     error
  })
 }
}

export const AdminController = {
  getAllAdminFromDB,
  getAdminByID
};
