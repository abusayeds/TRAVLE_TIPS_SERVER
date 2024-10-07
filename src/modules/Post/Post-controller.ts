import httpStatus from "http-status";
import sendResponse from "../../app/middlwares/responseHandle";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { postService } from "./Post-service";

const createPost = catchAsync(async (req, res) => {
  const result = await postService.createPostDB(req.body, req.user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Post created successfully ! ",
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await postService.getAllPostDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get All Post successfully ! ",
    data: result,
  });
});
export const postController = {
  createPost,
  getAllPost
};
