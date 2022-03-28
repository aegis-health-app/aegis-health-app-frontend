import { client } from '../../config/axiosConfig';
import { User } from '../../dto/modules/user.dto';

export async function getCaretakerList(): Promise<User[]> {
  try {
    const { data } = await client.get('/user/relationship/caretaker');
    return data;
  } catch (err) {
    throw Error('Cannot retrieve list of caretakers');
  }
}
