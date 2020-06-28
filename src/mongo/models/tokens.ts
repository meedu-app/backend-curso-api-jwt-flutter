import { Schema, Document, model } from 'mongoose';

export interface IToken extends Document {
  jwt: string;
  payload: any;
}

const schema = new Schema({
  jwt: { type: String, require: true, unique: true },
  payload: { type: Object }
});

const Tokes = model<IToken>('token', schema);
export default Tokes;
