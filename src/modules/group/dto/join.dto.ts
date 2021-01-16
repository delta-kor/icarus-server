import { IsString } from 'class-validator';

export default class JoinDto {
  @IsString({ message: 'Please enter group uuid' })
  public uuid!: string;
}
