import {UserProfile} from './userProfile';

export interface UsersResponse {
  success: boolean;
  user: UserProfile[];
}
