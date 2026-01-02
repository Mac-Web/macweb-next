import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
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
});

export const User = models.User || model("User", UserSchema);
