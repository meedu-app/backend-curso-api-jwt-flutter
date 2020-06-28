import { Schema, Document, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);
schema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });
const Users = model<IUser>('user', schema);
export default Users;
