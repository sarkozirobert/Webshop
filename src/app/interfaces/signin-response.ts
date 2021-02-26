import {LoginedUser} from './logined-user';

export interface SigninResponse {
  success: boolean;
  list: LoginedUser[];
}
