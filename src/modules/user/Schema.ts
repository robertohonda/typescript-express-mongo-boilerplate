import mongoose from "mongoose";

const userSchema = {
  // email: {
  //   required: true,
  //   trim: true,
  //   type: String,
  //   unique: true,
  // },
  firstName: {
    required: true,
    trim: true,
    type: String,
  },
  lastName: {
    required: true,
    trim: true,
    type: String,
  },
  // password: {
  //   required: true,
  //   trim: true,
  //   type: String,
  // },
};

class UserSchema {
  private userSchema: mongoose.Schema;
  constructor() {
    this.userSchema = new mongoose.Schema(userSchema, { versionKey: false });
  }

  public getUserSchema = () => {
    return this.userSchema;
  }
}

export default UserSchema;
