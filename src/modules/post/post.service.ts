import GroupNotFoundException from '../group/exception/group-not-found.exception';
import GroupModel from '../group/group.model';
import User from '../user/user.interface';
import InvalidPostContentException from './exception/invalid-post-content.exception';
import UnsupportedPostTypeException from './exception/unsupported-post-type.exception';
import Post, { PostContent, PostType } from './post.interface';
import PostModel from './post.model';

export default class PostService {
  public async write(
    author: User,
    type: PostType,
    target: string,
    content: PostContent
  ): Promise<Post> {
    if (!content.text) throw new InvalidPostContentException();

    if (type === PostType.GROUP) {
      const group = await GroupModel.getGroupByUUID(target);
      if (!group) throw new GroupNotFoundException();

      const post = new PostModel({ author: author.uuid, type, target, content });
      return await post.save();
    } else {
      throw new UnsupportedPostTypeException();
    }
  }
}
