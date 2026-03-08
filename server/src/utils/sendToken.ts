import { Response } from "express";
import { HTTP_STATUS } from "../constant/httpStatus";

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const sendAccessToken = (res: Response, accessToken: string) => {
  return res.status(HTTP_STATUS.OK).json({
    accessToken,
  });
};
