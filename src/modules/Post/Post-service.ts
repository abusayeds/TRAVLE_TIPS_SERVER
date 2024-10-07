import { TPost } from "./Post-interface";
import { postModel } from "./Post-model";

const createPostDB = async (payload: TPost, id: string) => {
  const result = await postModel.create({
    ...payload,
    user: id,
  });
  return result;
};

const getAllPostDB = async () => {
    const result = await postModel.find()
    return result
}
export const postService = {
  createPostDB,
  getAllPostDB
};
