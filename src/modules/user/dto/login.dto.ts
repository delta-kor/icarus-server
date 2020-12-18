import { IsString } from 'class-validator';

export default class LoginDto {
  @IsString({ message: 'Please enter an email' })
  public email!: string;

  @IsString({ message: 'Please enter a password' })
  public password!: string;
}
