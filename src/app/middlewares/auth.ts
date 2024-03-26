import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../config";
import { Secret } from "jsonwebtoken";
import ApiErrors from "../errors/ApiErrors";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return async (req: Request &{user?:any}, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiErrors(httpStatus.UNAUTHORIZED, "Your are not authorized");
      }
      const verifyUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
        );
        req.user=verifyUser
      if (!roles.length && roles.includes(verifyUser.role)) {
        throw new ApiErrors(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
