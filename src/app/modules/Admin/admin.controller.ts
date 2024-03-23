import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";



const getAllAdminFromDB = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await AdminService.getAllAdminFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Retrieved Successfully",
      meta: result.meta,
      data: result.data
    })
  } catch (error) {
   next(error);
  }
};

const getAdminByID = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id;
    const result = await AdminService.getByIdFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully retrieved",
      data:result
    })
  } catch (error) {
  next(error)
  }
};
const updateIntoDB = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await AdminService.updateAdminIntoDB(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully updated",
      data: result
    })
  } catch (error) {
    next(error)
  }
};

const deleteAdmin = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id;
    const result = await AdminService.deleteAdminFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted",
      data: result
    })
  } catch (error) {
   next(error)
  }
};
const softDeleteAdmin = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id;
    const result = await AdminService.softDeleteAdminFromDB(id);
 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted",
     data: result
  
    })
  } catch (error) {
  next(error)
  }
};

export const AdminController = {
  getAllAdminFromDB,
  getAdminByID,
  updateIntoDB,
  deleteAdmin, 
  softDeleteAdmin
};
