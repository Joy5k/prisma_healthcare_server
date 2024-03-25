import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./Admin.validation";
const router = express.Router();





router.get("/", AdminController.getAllAdminFromDB);
router.get("/:id", AdminController.getAdminByID);
router.patch("/:id", validateRequest(adminValidationSchemas.update), AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
