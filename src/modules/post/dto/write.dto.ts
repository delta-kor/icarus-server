import { IsNotEmptyObject, IsString } from 'class-validator';
import { PostContent, PostType } from '../post.interface';

export default class WriteDto {
  @IsString({ message: 'Type missing' })
  public type!: PostType;

  @IsString({ message: 'Target missing' })
  public target!: string;

  @IsNotEmptyObject({ message: 'Content missing' })
  public content!: PostContent;
}
