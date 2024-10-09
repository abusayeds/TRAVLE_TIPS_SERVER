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
router.put(
  "/upvote/:id",

  postController.upvotePost
);
router.put(
  "/downvote/:id",

  postController.downVotePost
);
router.get(
  "/single-post/:id",
  auth(USER_ROLE.USER),
  postController.getSinglePost
);
router.put(
  "/updata-post/:id",
  auth(USER_ROLE.USER),
  postController.updataPost
);
router.delete(
  "/delete-post/:id",
  auth(USER_ROLE.USER),
  postController.deletePost
);
router.get("/all-post", auth(USER_ROLE.USER), postController.getAllPost);
router.get("/my-post", auth(USER_ROLE.USER), postController.myPost);

export const postRouts = router;
