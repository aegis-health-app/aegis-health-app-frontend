import { client } from '../../config/axiosConfig';

export async function getElderlyCode(): Promise<string> {
  try {
    const { data } = await client.get('/link/elderlycode');
    return data.code;
  } catch (err) {
    throw Error('Cannot retrieve code');
  }
}
