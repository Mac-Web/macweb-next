import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    display: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
