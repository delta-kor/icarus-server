import { IsNotEmptyObject, IsString } from 'class-validator';
import { PostContent } from '../post.interface';

export default class EditDto {
  @IsString({ message: 'Please enter uuid' })
  public uuid!: string;

  @IsNotEmptyObject({ message: 'Content missing' })
  public content!: PostContent;
}
