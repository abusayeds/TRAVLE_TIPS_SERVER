/* eslint-disable @typescript-eslint/no-explicit-any */
import queryBuilder from "../../app/builder/queryBuilder";
import { postSearchbleField } from "./Post-constant";
import { TPost } from "./Post-interface";
import { postModel } from "./Post-model";

const createPostDB = async (payload: TPost, id: string) => {
  const result = await postModel.create({
    ...payload,
    user: id,
  });
  return result;
};
const upvotePostDB = async (id: string) => {
  const post = await postModel.findById(id);
  const update: {
    $inc: {
      upvote: number;
      downvote?: number;
      totalVote: number;
    };
  } = {
    $inc: {
      upvote: 1,
      totalVote: 1,
    },
  };
  if ((post!.downvote ?? 0) > 0) {
    update.$inc.downvote = -1;
    update.$inc.totalVote = 1;
  }
  const result = await postModel.findByIdAndUpdate(id, update, { new: true });
  return result;
};

const downVotePostDB = async (id: string) => {
  const post = await postModel.findById(id);

  if ((post!.upvote ?? 0) > 0) {
    const update: {
      $inc: {
        downvote: number;
        upvote?: number;
        totalVote: number;
      };
    } = {
      $inc: {
        downvote: 1,
        totalVote: -1,
      },
    };

    if (post!.upvote! > 0) {
      update.$inc.upvote = -1;
      update.$inc.totalVote = -1;
    }

    const result = await postModel.findByIdAndUpdate(id, update, { new: true });
    return result;
  }
};
const getAllPostDB = async (query: Record<string, unknown>) => {
  const postQuery = new queryBuilder(postModel.find().populate("user"), query)
    .search(postSearchbleField)
    .fillter()
    .sort()
    .pagenate()
    .fields();

  const result = await postQuery.modelQuery;
  return result;
};
const myPostDB = async (id: string, query: Record<string, unknown>) => {
  const postQuery = new queryBuilder(
    postModel.find({ user: id }).populate("user"),
    query
  )
    .search(postSearchbleField)
    .fillter()
    .sort()
    .pagenate()
    .fields();
  const result = await postQuery.modelQuery;
  return result;
};
const getSinglePostDB = async (id: string) => {
  const result = await postModel.findById(id).populate("user");
  return result;
};

const updataPostDB = async ( id: string, payload: any) => {
  const result = await postModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deletePostDB = async ( id: string) => {
  const result = await postModel.findByIdAndDelete(id, );
  return result;
};

export const postService = {
  createPostDB,
  getAllPostDB,
  myPostDB,
  upvotePostDB,
  downVotePostDB,
  getSinglePostDB,
  updataPostDB,
  deletePostDB
};
