import { User } from '../../dto/modules/user.dto';
import { client } from './../../config/axiosConfig';

export async function getUser(): Promise<User> {
  try {
    const { data } = await client.get('user/profile');
    return data as User;
  } catch (err) {
    throw Error('Cannot get user!');
  }
}
