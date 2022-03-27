import { client } from '../../config/axiosConfig';

export async function getElderlyCode(): Promise<string> {
  const { data } = await client.get('/link/elderlycode');
  console.log(data.code);
  return data.code;
}
