import { client } from '../../config/axiosConfig';

export async function getCaretakerList(): Promise<any> {
  const { data } = await client.get('/user/relationship/caretaker');
  return data;
}
