import { client } from '../../config/axiosConfig';
import { User } from '../../dto/modules/user.dto';

export async function getCaretakerList(): Promise<User[]> {
  const { data } = await client.get('/user/relationship/caretaker');
  return data;
}
