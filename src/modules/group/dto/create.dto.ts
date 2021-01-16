import { IsString } from 'class-validator';

export default class CreateDto {
  @IsString({ message: 'Please enter group name' })
  public name!: string;
}
