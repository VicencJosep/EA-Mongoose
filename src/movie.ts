import { Schema, model } from 'mongoose';
import { IUser, UserSchema } from './user.js';

// 1. Create an interface representing a TS object.
export interface IMovie {
    name: string;
    author: IUser;
    budget: number;
    _id?: string;
  }

// 2. Create a Schema corresponding to the document in MongoDB.
const movieSchema = new Schema<IMovie>({
  name: { type: String, required: true },
  author: { type: UserSchema, required: true },
  budget: { type: Number, required: true }
  
});

// 3. Create a Model.
export const MovieModel = model('Movie', movieSchema)