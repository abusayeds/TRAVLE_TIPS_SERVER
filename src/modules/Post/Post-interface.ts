import { ObjectId } from "mongoose";
import { ITEM_STATUS } from "./Post-constant";

export type TPost = {
  user: ObjectId;
  category: string;
  title: string;
  description: string; upvoteCount?: number;
  downvoteCount?: number;
  images?: string[];
  comments?: string[];
  status: keyof typeof ITEM_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
};
