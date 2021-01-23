import { Document } from 'mongoose';

export enum PostType {
  GROUP = 'group',
  TIMELINE = 'timeline',
}

export default interface Post extends Document {
  uuid: string;
  author: string;
  type: PostType;
  target: string;
  content: any;
}
