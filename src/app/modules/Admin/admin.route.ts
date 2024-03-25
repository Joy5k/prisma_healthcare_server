import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";
const router = express.Router();

const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      return next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

router.get("/", AdminController.getAllAdminFromDB);
router.get("/:id", AdminController.getAdminByID);
router.patch("/:id", validateRequest(updateUser), AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
