import database from '@react-native-firebase/database';

export interface Office {
  id?: string;
  name: string;
  address: string;
  capacity: number;
}

export const officeService = {
  async createOffice(officeData: Omit<Office, 'id'>): Promise<string> {
    try {
      const newRef = database().ref('offices').push();
      await newRef.set(officeData);
      return newRef.key!;
    } catch (error) {
      console.error('Error creating office:', error);
      throw error;
    }
  },
  
  async getOffice(officeId: string): Promise<Office | null> {
    try {
      const snapshot = await database()
        .ref(`offices/${officeId}`)
        .once('value');
      
      if (!snapshot.exists()) return null;
      
      return {
        id: snapshot.key,
        ...snapshot.val()
      } as Office;
    } catch (error) {
      console.error('Error getting office:', error);
      throw error;
    }
  },
  
  async getAllOffices(): Promise<Office[]> {
    try {
      const snapshot = await database()
        .ref('offices')
        .once('value');
      
      const offices: Office[] = [];
      snapshot.forEach((childSnapshot) => {
        offices.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as Office);
        return true;
      });
      return offices;
    } catch (error) {
      console.error('Error getting all offices:', error);
      throw error;
    }
  },
  
  async updateOffice(officeId: string, officeData: Partial<Office>): Promise<void> {
    try {
      const { id, ...updateData } = officeData;
      await database()
        .ref(`offices/${officeId}`)
        .update(updateData);
    } catch (error) {
      console.error('Error updating office:', error);
      throw error;
    }
  },
  
  async deleteOffice(officeId: string): Promise<void> {
    try {
      await database()
        .ref(`offices/${officeId}`)
        .remove();
    } catch (error) {
      console.error('Error deleting office:', error);
      throw error;
    }
  },
  
  subscribeToOffices(callback: (offices: Office[]) => void) {
    const officesRef = database().ref('offices');
    
    officesRef.on('value', (snapshot) => {
      const offices: Office[] = [];
      snapshot.forEach((childSnapshot) => {
        offices.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as Office);
        return true;
      });
      callback(offices);
    });

    return () => officesRef.off();
  },
}; 