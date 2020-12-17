import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../../utils/match.decorator';

export default class SignupDto {
  @IsString({ message: 'Please enter an email' })
  @IsEmail({}, { message: 'Please enter valid email' })
  @MaxLength(256, { message: 'Please enter valid email' })
  public email!: string;

  @IsString({ message: 'Please enter a password' })
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  @MaxLength(20, { message: 'Password must be no more than 20 characters long' })
  public password!: string;

  @IsString({ message: 'Please confirm a password' })
  @Match('password', { message: 'Password does not match' })
  public confirm!: string;
}
