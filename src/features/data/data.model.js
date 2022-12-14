const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        user_name: { type: String },
        user_image: { type: String },
      },
    ],
    comments: [
      {
        user_name: { type: String },  
        user_image: { type: String },
        title: { type: String },
      },
    ],
    posts: { caption: { type: String }, image: { type: String } },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = Data = mongoose.model("post", dataSchema);
