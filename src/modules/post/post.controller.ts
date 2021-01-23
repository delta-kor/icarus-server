import Controller from '../../types/controller.class';
import AsyncHelper from '../../utils/async-helper.util';
import Authenticate from '../../utils/authenticate.util';
import DtoHelper from '../../utils/dto-helper.util';
import { TypedRequest, TypedResponse } from '../../utils/express.type';
import ValidateHelper from '../../utils/validate-helper.util';
import User from '../user/user.interface';
import WriteDto from './dto/write.dto';
import PostResponse from './post.response';
import PostService from './post.service';

export default class PostController extends Controller {
  public path: string = '/post';

  public postService: PostService = new PostService();

  protected mountRoutes() {
    this.router.post(
      '/write',
      Authenticate,
      ValidateHelper(WriteDto),
      AsyncHelper(this.write.bind(this))
    );
  }

  private async write(
    req: TypedRequest<DtoHelper<WriteDto>>,
    res: TypedResponse<PostResponse.Write>
  ): Promise<void> {
    const user = req.user as User;

    const post = await this.postService.write(
      user,
      req.body.type,
      req.body.target,
      req.body.content
    );
    res.json({ uuid: post.uuid });
  }
}
