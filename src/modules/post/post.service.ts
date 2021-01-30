import GroupNotFoundException from '../group/exception/group-not-found.exception';
import GroupModel from '../group/group.model';
import UserNotFoundException from '../user/exception/user-not-found.exception';
import User from '../user/user.interface';
import UserModel from '../user/user.model';
import InvalidPostContentException from './exception/invalid-post-content.exception';
import UnsupportedPostTypeException from './exception/unsupported-post-type.exception';
import Post, {
  ImageAttachment,
  MentionAttachment,
  PostAttachmentType,
  PostContent,
  PostType,
} from './post.interface';
import PostModel from './post.model';

export default class PostService {
  private validatePostContent(content: Partial<PostContent>): void {
    if (typeof content.text !== 'string') throw new InvalidPostContentException();

    content.attachments?.forEach(attachment => {
      if (attachment.type === PostAttachmentType.IMAGE) {
        const imageAttachment = attachment as Partial<ImageAttachment>;

        if (typeof imageAttachment.key !== 'string') throw new InvalidPostContentException();
      } else if (attachment.type === PostAttachmentType.MENTION) {
        const mentionAttachment = attachment as Partial<MentionAttachment>;

        if (typeof mentionAttachment.from !== 'number') throw new InvalidPostContentException();
        if (typeof mentionAttachment.length !== 'number') throw new InvalidPostContentException();
        if (typeof mentionAttachment.to !== 'string') throw new InvalidPostContentException();
        if (typeof mentionAttachment.target !== 'string') throw new InvalidPostContentException();
      } else {
        throw new InvalidPostContentException();
      }
    });

    if (!content.attachments) content.attachments = [];
  }

  public async write(
    author: User,
    type: PostType,
    target: string,
    content: PostContent
  ): Promise<Post> {
    this.validatePostContent(content);

    if (type === PostType.GROUP) {
      const group = await GroupModel.getGroupByUUID(target);
      if (!group) throw new GroupNotFoundException();

      const post = new PostModel({ author: author.uuid, type, target, content });
      return await post.save();
    } else if (type === PostType.TIMELINE) {
      const user = await UserModel.getUserByUUID(target);
      if (!user) throw new UserNotFoundException();

      const post = new PostModel({ author: author.uuid, type, target, content });
      return await post.save();
    } else {
      throw new UnsupportedPostTypeException();
    }
  }
}
