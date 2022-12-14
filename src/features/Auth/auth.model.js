const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fName: { type: String },
    lName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    date: { type: String },
    month: { type: String },
    year: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Others"] },
    friends: [
      {
        fName: { type: String },
        lName: { type: String },
        user_image: { type: String },
      },
    ],
    followers: [
      {
        fName: { type: String },
        lName: { type: String },
        user_image: { type: String },
      },
    ],
    notify: [
      {
        fName: { type: String },
        lName: { type: String },
        user_image: { type: String },
        response: { type: String },
      },
    ],
    userDetails: {
      image: { type: String },
      cover_image: { type: String },
      bio: { type: String },
      city: { type: String },
      lives_in: { type: String },
      status: { type: String, enum: ["Single", "Married"] },
      works_at: { type: String },
      worked_at: { type: Array, default: [] },
      number: { type: String },
      school: { type: String },
      intersted_in: { type: String, enum: ["Men", "Women"] },
      about_you: { type: String },
      favourite_quote: { type: String },
      life_event: { type: Array, default: [] },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
