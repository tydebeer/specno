import { database } from '../config/firebase';
import { ref, get, set, update, remove, push } from 'firebase/database';
import { OfficeData } from '../interfaces/OfficeData';

const COLLECTION_NAME = 'offices';

export const officeService = {
  async getAllOffices(): Promise<OfficeData[]> {
    const officesRef = ref(database, COLLECTION_NAME);
    const snapshot = await get(officesRef);
    if (!snapshot.exists()) return [];
    return Object.entries(snapshot.val()).map(([id, data]) => ({
      id,
      ...(data as object)
    })) as OfficeData[];
  },

  async createOffice(officeData: Omit<OfficeData, 'id'>): Promise<OfficeData> {
    const officesRef = ref(database, COLLECTION_NAME);
    const newOfficeRef = push(officesRef);
    await set(newOfficeRef, officeData);
    return {
      id: newOfficeRef.key!,
      ...officeData
    };
  },

  async updateOffice(id: string, officeData: Partial<OfficeData>): Promise<void> {
    const officeRef = ref(database, `${COLLECTION_NAME}/${id}`);
    await update(officeRef, officeData);
  },

  async deleteOffice(id: string): Promise<void> {
    const officeRef = ref(database, `${COLLECTION_NAME}/${id}`);
    await remove(officeRef);
  }
}; 