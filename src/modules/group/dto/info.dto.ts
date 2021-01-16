import { IsString } from 'class-validator';

export default class InfoDto {
  @IsString({ message: 'Please enter group uuid' })
  public uuid!: string;
}
