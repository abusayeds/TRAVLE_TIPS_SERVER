import httpStatus from "http-status";
import config from "../../app/config";
import sendResponse from "../../app/middlwares/responseHandle";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { authServise } from "./auth-service";

const createAuth = catchAsync(async (req, res) => {
  const result = await authServise.createAuthDB(req.body);
  const { accessToken } = result;

  res.cookie("accessToken", accessToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully",
    token: accessToken,
    data: result.user
  });
});
export const authController = {
  createAuth,
};
