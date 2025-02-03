import { database } from '../config/firebase';
import { ref, get, set, update, remove, push } from 'firebase/database';
import { OfficeData } from '../interfaces/OfficeData';

const COLLECTION_NAME = 'offices';

export const officeService = {
  async getAllOffices(): Promise<OfficeData[]> {
    const officesRef = ref(database, COLLECTION_NAME);
    const snapshot = await get(officesRef);
    if (!snapshot.exists()) return [];
    const offices: OfficeData[] = [];
    snapshot.forEach((childSnapshot) => {
      offices.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      } as OfficeData);
    });
    return offices;
  },

  async createOffice(officeData: Omit<OfficeData, 'id'>): Promise<string> {
    try {
      const officesRef = ref(database, COLLECTION_NAME);
      const newRef = push(officesRef);
      const newOffice = {
        ...officeData,
        id: newRef.key
      };
      await set(newRef, newOffice);
      return newRef.key!;
    } catch (error) {
      console.error('Error creating office:', error);
      throw error;
    }
  },

  async updateOffice(officeId: string, officeData: Partial<OfficeData>): Promise<void> {
    try {
      const { id, ...updateData } = officeData;
      const officeRef = ref(database, `${COLLECTION_NAME}/${officeId}`);
      await update(officeRef, {
        ...updateData,
        id: officeId
      });
    } catch (error) {
      console.error('Error updating office:', error);
      throw error;
    }
  },

  async deleteOffice(id: string): Promise<void> {
    const officeRef = ref(database, `${COLLECTION_NAME}/${id}`);
    await remove(officeRef);
  }
}; 