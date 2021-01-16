import { IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateDto {
  @IsString({ message: 'Please enter group name' })
  @MinLength(1, { message: 'Please enter group name' })
  @MaxLength(20, { message: 'Group name must be no more than 20 characters' })
  public name!: string;
}
