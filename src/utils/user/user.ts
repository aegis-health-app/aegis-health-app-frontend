import { client } from './../../config/axiosConfig';

export async function getUser() {
  const { data } = await client.get('user');
  return data;
}
