import { model, models, Schema, Types } from "mongoose";

export interface ICollection {
  question: Types.ObjectId;
  author: Types.ObjectId;
}

const CollectionSchema = new Schema<ICollection>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Collection =
  models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;
