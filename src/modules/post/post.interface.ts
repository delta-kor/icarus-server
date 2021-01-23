import { Document } from 'mongoose';

export enum PostType {
  GROUP = 'group',
  TIMELINE = 'timeline',
}

export enum MentionType {
  USER = 'user',
  GROUP = 'group',
}

export interface PostContent {
  text: string;
  attachments: PostAttachment[];
}

export interface PostAttachment {}

export interface ImageAttachment extends PostAttachment {
  key: string;
}

export interface MentionAttachment extends PostAttachment {
  from: number;
  length: number;
  type: MentionType;
}

export default interface Post extends Document {
  uuid: string;
  author: string;
  type: PostType;
  target: string;
  content: PostContent;
}
