import { IsString } from 'class-validator';

export default class LeaveDto {
  @IsString({ message: 'Please enter group uuid' })
  public uuid!: string;
}
