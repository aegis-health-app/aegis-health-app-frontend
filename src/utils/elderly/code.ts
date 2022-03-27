import { client } from '../../config/axiosConfig';
import { ElderlyLinkCode } from '../../dto/modules/code.dto';

export async function getElderlyCode(): Promise<any> {
  const { data } = await client.get('/link/elderlycode');
  return data as ElderlyLinkCode;
}
