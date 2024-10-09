import { ObjectId } from "mongoose";
import { ITEM_STATUS } from "./Post-constant";

export type TPost = {
  user: ObjectId;
  category: string;
  title: string;
  description: string; 
  upvote?: number;
  downvote?: number;
  totalVote? : number;
  images?: string[];
  comments?: string[];
  status: keyof typeof ITEM_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
};
