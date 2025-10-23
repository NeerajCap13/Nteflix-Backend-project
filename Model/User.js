import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address",
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 character long"],
    },
  },
  { timestamps: true }
);
//middleware used to save  hashed password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//method to check if password is correct
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
//middleware to generateAccesstoken
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn : process.env.JWT_EXPIRES
    }
  );
};
//Register the user
UserSchema.statics.register = async function ({ email, password }) {
  const existingUser = await this.findOne({ email });

  if (existingUser) {
    console.log("User is already Registered");
  }
  const user = await this.create({ email, password });
  return user;
};

export const User = mongoose.model("NetflixUser", UserSchema);
