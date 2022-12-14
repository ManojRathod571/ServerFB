const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    image: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Story = mongoose.model("story", storySchema);

module.exports = Story;
