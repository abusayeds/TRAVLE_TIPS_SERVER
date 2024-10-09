import { TUser } from "./user-interface";
import { UserModel } from "./user-model";

const getSingleUserDB = async (userId: string) => {
  const result = await UserModel.findById(userId)
    .populate("follower", "name email status profilePhoto mobileNumber ")
    .populate("following", "name email status profilePhoto mobileNumber");

  return result;
};
const createUerDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
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
