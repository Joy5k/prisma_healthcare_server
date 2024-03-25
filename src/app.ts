import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import exp from "constants";
import { userRoutes } from "./app/modules/user/user.routes";
import { AdminRoutes } from "./app/modules/Admin/admin.route";
import router from "./app/routes";
import httpStatus from "http-status";
import cookieParser from 'cookie-parser';
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Doctors_prisma_backend server...",
  });
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('in app.js');
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app;
