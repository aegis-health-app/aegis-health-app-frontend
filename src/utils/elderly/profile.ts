import { client } from '../../config/axiosConfig';
import { ElderlyHomeProfile } from '../../dto/modules/modules.dto';

export async function getElderlyProfile(): Promise<ElderlyHomeProfile> {
  try {
    const { data } = await client.get('/home/elderlyHome');
    return data as ElderlyHomeProfile;
  } catch (err) {
    throw Error('Cannot get elderly profile!');
  }
}
