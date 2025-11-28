import mongoose from "mongoose";
import { ROLE_LIST, USER_ROLES } from "../constants/role.constants.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, enum: ROLE_LIST, default: USER_ROLES.USER },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
