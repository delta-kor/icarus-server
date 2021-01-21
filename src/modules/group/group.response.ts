import { Deserialize } from '../../types/deserialize.type';
import User from '../user/user.interface';

namespace GroupResponse {
  export interface Info {
    name: string;
    admin: Deserialize<User>;
    manager: Deserialize<User>[];
    member: Deserialize<User>[];
  }

  export interface Create {
    uuid: string;
  }

  export interface Join {}

  export interface Leave {}
}

export default GroupResponse;
