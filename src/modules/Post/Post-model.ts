import { model, Schema } from "mongoose";
import { TPost } from "./Post-interface";
import { ITEM_STATUS } from "./Post-constant";

const postSchema = new Schema<TPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    upvoteCount: {
      type: Number,
      required: true,
      default: 0,
    },
    downvoteCount: {
      type: Number,
      required: true,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },

    comments: {
      type: [String],
      default: [],
    },
    status: {
      type: String,

      default: ITEM_STATUS.AVAILABLE,
      required: true,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);
export const postModel = model<TPost>("Post", postSchema);
