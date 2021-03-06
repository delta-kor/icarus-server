import Controller from '../../types/controller.class';
import AsyncHelper from '../../utils/async-helper.util';
import Authenticate from '../../utils/authenticate.util';
import DtoHelper from '../../utils/dto-helper.util';
import { TypedRequest, TypedResponse } from '../../utils/express.type';
import ValidateHelper from '../../utils/validate-helper.util';
import DeleteDto from './dto/delete.dto';
import EditDto from './dto/edit.dto';
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
    this.router.post(
      '/delete',
      Authenticate,
      ValidateHelper(DeleteDto),
      AsyncHelper(this.delete.bind(this))
    );
    this.router.post(
      '/edit',
      Authenticate,
      ValidateHelper(EditDto),
      AsyncHelper(this.edit.bind(this))
    );
  }

  private async write(
    req: TypedRequest<DtoHelper<WriteDto>>,
    res: TypedResponse<PostResponse.Write>
  ): Promise<void> {
    const post = await this.postService.write(
      req.user!,
      req.body.type,
      req.body.target,
      req.body.content
    );
    res.json({ uuid: post.uuid });
  }

  private async delete(
    req: TypedRequest<DtoHelper<DeleteDto>>,
    res: TypedResponse<PostResponse.Delete>
  ): Promise<void> {
    await this.postService.delete(req.body.uuid, req.user!);
    res.json({});
  }

  private async edit(
    req: TypedRequest<DtoHelper<EditDto>>,
    res: TypedResponse<PostResponse.Edit>
  ): Promise<void> {
    await this.postService.edit(req.user!, req.body.uuid, req.body.content);
    res.json({});
  }
}
