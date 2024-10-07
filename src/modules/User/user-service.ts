import { TUser } from "./user-interface";
import { UserModel } from "./user-model";

const createUerDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};
const getSingleUserDB = async (userId: string) => {
  const result = await UserModel.findById(userId);

  return result;
};
const updateUserDB = async (userId: string, payload: TUser) => {
  const result = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUerDB,
  getSingleUserDB,
  updateUserDB,
};
