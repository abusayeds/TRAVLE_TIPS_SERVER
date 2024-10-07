import httpStatus from "http-status";

import config from "../../app/config";

import appError from "../../app/middlwares/appError";
import { UserModel } from "../User/user-model";
import { TLoginUser } from "./auth-interface";
import { createToken } from "./auth-utils";

const createAuthDB = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByEmail(payload?.email);
  //   checking the exixts user
  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "This user is not found  ! ");
  }

  // check the password
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new appError(httpStatus.FORBIDDEN, "This pasword do not match ");
  }

  const jwtPayload = {
    id: user._id,
    name: user.name,
    userEmail: user.email,
    role: user.role,
    user: user,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
    user
  };
};
export const authServise = {
  createAuthDB,
};
