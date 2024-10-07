/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-useless-escape */
import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user-constant";
import { TUser, TUserModel } from "./user-interface";
import config from "../../app/config";

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      default: USER_ROLE.USER,
      required: true,
    },
    followersCount: {
      type: Number,
      required: true,
      default: 0,
    },

    followingCount: {
      type: Number,
      required: true,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      //validate email
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
      type: Date,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    coverPhoto: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, TUserModel>("User", userSchema);
