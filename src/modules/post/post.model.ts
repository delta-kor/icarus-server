import { Model, model, Schema } from 'mongoose';
import uuid from '../../utils/uuid.util';
import GroupModel from '../group/group.model';
import User from '../user/user.interface';
import Post, { PostType } from './post.interface';

export interface PostModel extends Model<Post> {
  getPostByUUID(uuid: string): Promise<Post | null>;
}

const PostSchema = new Schema<Post>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(16) },
  author: { type: String, required: true },
  type: { type: String, required: true },
  target: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
});

PostSchema.method('isDeletable', async function (this: Post, user: User): Promise<boolean> {
  if (user.uuid === this.author) return true;

  if (this.type === PostType.TIMELINE) return user.uuid === this.target;

  if (this.type === PostType.GROUP) {
    const group = await GroupModel.getGroupByUUID(this.target);
    return group!.manager.includes(user.uuid) || group!.admin === user.uuid;
  }

  return false;
});

PostSchema.static(
  'getPostByUUID',
  async function (this: PostModel, uuid: string): Promise<Post | null> {
    return this.findOne({ uuid }).exec();
  }
);

const PostModel = model<Post, PostModel>('post', PostSchema);
export default PostModel;
