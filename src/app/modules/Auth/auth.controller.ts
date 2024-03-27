import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import prisma from "../../../shared/prisma";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "login successful",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "refresh token generated successfully",
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AuthService.changePassword(req.user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  }
);
const forgetPassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AuthService.forgetPassword(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Check your email",
      data: result,
    });
  }
);

const resetPassword = catchAsync(async (req: Request, res: Response) => {

  const token = req.headers.authorization || "";

  await AuthService.resetPassword(token, req.body);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password Reset!",
      data: null
  })
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword
};
