import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "admin" | "hirer" | "seeker";
  phone?: string;
  disabledStatus?: string;
  bio?: string;
  companyName?: string;
  companyWebsite?: string;
  skills?: string[];
  resumeUrl?: string;
  portfolioUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", "hirer", "seeker"], required: true },
    phone: { type: String },
    disabledStatus: { type: String },
    bio: { type: String },

    // Hirer-specific
    companyName: { type: String },
    companyWebsite: { type: String },

    // Seeker-specific
    skills: [{ type: String }],
    resumeUrl: { type: String },
    portfolioUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
