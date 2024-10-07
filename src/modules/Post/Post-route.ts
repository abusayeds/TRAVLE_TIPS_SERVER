import { Router } from "express";
import auth from "../../app/middlwares/auth";
import { USER_ROLE } from "../User/user-constant";
import requestValidation from "../../app/middlwares/validation-request";
import { postValidation } from "./Post-validation";
import { postController } from "./Post-controller";

const router = Router();

router.post(
  "/post",
  auth(USER_ROLE.USER),
  requestValidation(postValidation.createPostValidationSchema),
  postController.createPost
);
router.get(
  "/all-post",
  auth(USER_ROLE.USER),
  postController.getAllPost
);

export const postRouts = router;
