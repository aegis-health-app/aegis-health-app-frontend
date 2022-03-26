import { client } from '../../config/axiosConfig';

export async function getElderlyCode(): Promise<any> {
  const { data } = await client.get('/link/elderlycode');
  return data;
}
