import { CaretakerHomeProfile } from '../../dto/modules/caretaking.dto';
import { client } from '../../config/axiosConfig';
import { Elderly } from './../../dto/modules/user.dto';

export async function getCaretakerHomeProfile(): Promise<CaretakerHomeProfile> {
  const { data } = await client.get('home/caretakerHome');
  return data as CaretakerHomeProfile;
}

export async function getCatakingElderlyByEid(eid: number): Promise<Elderly> {
  if (eid < 0) {
    throw Error('eid cannot be less than 0!');
  }
  const { data } = await client.get(`home/elderlyInfo/${eid}`);
  return data as Elderly;
}
