import { CaretakerHomeProfile } from '../../dto/modules/caretaking.dto';
import { client } from '../../config/axiosConfig';
import { Elderly } from './../../dto/modules/user.dto';

export async function getCaretakerHomeProfile(): Promise<CaretakerHomeProfile> {
  try {
    const { data } = await client.get('home/caretakerHome');
    return data as CaretakerHomeProfile;
  } catch (err) {
    throw Error('Cannot get caretaker home profile.');
  }
}

export async function getCaretakingElderlyByEid(eid: number): Promise<Elderly> {
  if (eid < 0) {
    throw Error('eid cannot be less than 0!');
  }

  try {
    const { data } = await client.get(`home/elderlyInfo/${eid}`);
    return data as Elderly;
  } catch (err) {
    throw Error('Cannot get elderly by its id.');
  }
}
