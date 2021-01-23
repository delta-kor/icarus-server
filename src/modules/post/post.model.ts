import { Model, model, Schema } from 'mongoose';
import uuid from '../../utils/uuid.util';
import Post from './post.interface';

export interface PostModel extends Model<Post> {}

const PostSchema = new Schema<Post>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(16) },
  author: { type: String, required: true },
  type: { type: String, required: true },
  target: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
});

const PostModel = model<Post, PostModel>('post', PostSchema);
export default PostModel;
