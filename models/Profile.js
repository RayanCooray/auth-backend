import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 2 },
  lastName: { type: String, required: true, minLength: 2 },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, minLength: 10 },
  addressLine1: { type: String, required: true, minLength: 5 },
  apartment: { type: String, optional: true },
  province: { type: String, required: true, minLength: 2 },
  country: { type: String, required: true, minLength: 2 },
  postalCode: { type: String, required: true, minLength: 4 },
  profileImage: { type: String, optional: true },
}, { timestamps: true });

export const Profile = mongoose.model("Profile", ProfileSchema);
