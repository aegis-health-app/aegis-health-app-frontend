import { client } from '../../config/axiosConfig';
import { HistoryDetailsCard } from '../../screens/ViewHistoryDetailsScreen';
import { HistoryCard } from '../../screens/ViewHistoryScreen';

export async function getHistory(eid: number): Promise<HistoryCard> {
  try {
    const { data } = await client.get(`/memoryPractice/history/${eid}`);
    return data;
  } catch (err) {
    throw Error('Cannot retrieve history');
  }
}

export async function getHistoryDetails(eid: number, timestamp: string): Promise<HistoryDetailsCard> {
    try {
      const { data } = await client.get(`/memoryPractice/history/timestamp/${eid}?timestamp=${timestamp}`);
      return data;
    } catch (err) {
      throw Error('Cannot retrieve history');
    }
  }
