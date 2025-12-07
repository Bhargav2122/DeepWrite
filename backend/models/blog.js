import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["web", "ai", "nature", "other"],
      default: "other",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

blogSchema.index({ category: 1});
blogSchema.index({ title: "text", content: "text"})

export default mongoose.model("Blog", blogSchema);