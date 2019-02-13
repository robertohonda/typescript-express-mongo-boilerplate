import mongoose from "mongoose";

import bcrypt from "bcrypt";
import ISchema from "../../core/schema/ISchema";
import IUser from "./Interface";

const userSchema = {
  email: {
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
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
  password: {
    required: true,
    trim: true,
    type: String,
  },
};

class UserSchema implements ISchema {
  private readonly userSchema: mongoose.Schema;
  constructor() {
    this.userSchema = new mongoose.Schema(userSchema, { versionKey: false });
    this.config();
  }

  public getSchema = (): mongoose.Schema => {
    return this.userSchema;
  }

  private config = (): void => {
    this.userSchema.pre<IUser>("save", async function(next) {
      const user = this;

      const hash = await bcrypt.hash(user.password, 10);
      this.password = hash;
      next();
    });

    this.userSchema.methods.toJSON = function() {
      const obj = this.toObject();
      delete obj.password;
      return obj;
    };

    this.userSchema.methods.isValidPassword = async function(password: string) {
      const user = this;
      const compare = await bcrypt.compare(password, user.password);
      return compare;
    };
  }
}

export default new UserSchema().getSchema();
