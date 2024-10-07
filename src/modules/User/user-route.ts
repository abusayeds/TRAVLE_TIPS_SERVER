import express from "express";
import requestValidation from "../../app/middlwares/validation-request";
import { UserValidation } from "./user-validation";
import { userController } from "./user-controller";
import { AuthValidation } from "../Auth/auth-validation";
import { authController } from "../Auth/auth-controller";
import { USER_ROLE } from "./user-constant";
import auth from "../../app/middlwares/auth";

const router = express.Router();
router.post(
  "/auth/signup",
  requestValidation(UserValidation.createUserValidationSchema),
  userController.createUser
);
router.post(
  "/auth/login",
  requestValidation(AuthValidation.loginValidationSchema),
  authController.createAuth
);
router.put(
  "/update-user/:userId",
  auth(USER_ROLE.USER),
  requestValidation(UserValidation.updateUserValidationSchema),
  userController.updateUser
);
router.get(
  "/single-user/:userId",
  auth(USER_ROLE.USER),
  userController.getSingleUser
);

export const userRoutes = router;
