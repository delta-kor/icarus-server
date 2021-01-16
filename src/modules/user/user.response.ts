namespace UserResponse {
  export interface Signup {
    uuid: string;
  }

  export interface Login {
    uuid: string;
    nickname: string;
    email: string;
  }

  export interface Logout {
    logined: boolean;
  }
}

export default UserResponse;
