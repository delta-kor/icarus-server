import { IsString } from 'class-validator';

export default class DeleteDto {
  @IsString({ message: 'Please enter group uuid' })
  public uuid!: string;
}
