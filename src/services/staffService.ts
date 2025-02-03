import { getDatabase, ref, push, set, get, query, orderByChild, equalTo, update, remove, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

export interface Staff {
  id?: string;
  name: string;
  avatarUrl: string;
  officeId: string;
}

export const staffService = {
  async createStaff(staffData: Omit<Staff, 'id'>): Promise<string> {
    try {
      const staffRef = ref(database, 'staff');
      const newRef = push(staffRef);
      await set(newRef, staffData);
      return newRef.key!;
    } catch (error) {
      console.error('Error creating staff:', error);
      throw error;
    }
  },
  
  async getStaff(staffId: string): Promise<Staff | null> {
    try {
      const staffRef = ref(database, `staff/${staffId}`);
      const snapshot = await get(staffRef);
      
      if (!snapshot.exists()) return null;
      
      return {
        id: snapshot.key,
        ...snapshot.val()
      } as Staff;
    } catch (error) {
      console.error('Error getting staff:', error);
      throw error;
    }
  },
  
  async getAllStaff(): Promise<Staff[]> {
    try {
      const staffRef = ref(database, 'staff');
      const snapshot = await get(staffRef);
      
      const staffMembers: Staff[] = [];
      snapshot.forEach((childSnapshot) => {
        staffMembers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as Staff);
      });
      return staffMembers;
    } catch (error) {
      console.error('Error getting all staff:', error);
      throw error;
    }
  },
  
  async getStaffByOffice(officeId: string): Promise<Staff[]> {
    try {
      const staffRef = ref(database, 'staff');
      const staffQuery = query(staffRef, orderByChild('officeId'), equalTo(officeId));
      const snapshot = await get(staffQuery);
      
      const staffMembers: Staff[] = [];
      snapshot.forEach((childSnapshot) => {
        staffMembers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as Staff);
      });
      return staffMembers;
    } catch (error) {
      console.error('Error getting staff by office:', error);
      throw error;
    }
  },
  
  async updateStaff(staffId: string, staffData: Partial<Staff>): Promise<void> {
    try {
      const { id, ...updateData } = staffData;
      const staffRef = ref(database, `staff/${staffId}`);
      await update(staffRef, updateData);
    } catch (error) {
      console.error('Error updating staff:', error);
      throw error;
    }
  },
  
  async deleteStaff(staffId: string): Promise<void> {
    try {
      const staffRef = ref(database, `staff/${staffId}`);
      await remove(staffRef);
    } catch (error) {
      console.error('Error deleting staff:', error);
      throw error;
    }
  },
  
  subscribeToStaff(callback: (staff: Staff[]) => void) {
    const staffRef = ref(database, 'staff');
    
    onValue(staffRef, (snapshot) => {
      const staffMembers: Staff[] = [];
      snapshot.forEach((childSnapshot) => {
        staffMembers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as Staff);
      });
      callback(staffMembers);
    });

    return () => off(staffRef);
  },
}; 