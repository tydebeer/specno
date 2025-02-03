import database from '@react-native-firebase/database';

export interface Staff {
  id?: string;
  name: string;
  avatarUrl: string;
  officeId: string;
}

export const staffService = {
  async createStaff(staffData: Omit<Staff, 'id'>): Promise<string> {
    try {
      const newRef = database().ref('staff').push();
      await newRef.set(staffData);
      return newRef.key!;
    } catch (error) {
      console.error('Error creating staff:', error);
      throw error;
    }
  },
  
  async getStaff(staffId: string): Promise<Staff | null> {
    try {
      const snapshot = await database()
        .ref(`staff/${staffId}`)
        .once('value');
      
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
      const snapshot = await database()
        .ref('staff')
        .once('value');
      
      const staffMembers: Staff[] = [];
      snapshot.forEach((childSnapshot) => {
        staffMembers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as Staff);
        return true;
      });
      return staffMembers;
    } catch (error) {
      console.error('Error getting all staff:', error);
      throw error;
    }
  },
  
  async getStaffByOffice(officeId: string): Promise<Staff[]> {
    try {
      const snapshot = await database()
        .ref('staff')
        .orderByChild('officeId')
        .equalTo(officeId)
        .once('value');
      
      const staffMembers: Staff[] = [];
      snapshot.forEach((childSnapshot) => {
        staffMembers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as Staff);
        return true;
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
      await database()
        .ref(`staff/${staffId}`)
        .update(updateData);
    } catch (error) {
      console.error('Error updating staff:', error);
      throw error;
    }
  },
  
  async deleteStaff(staffId: string): Promise<void> {
    try {
      await database()
        .ref(`staff/${staffId}`)
        .remove();
    } catch (error) {
      console.error('Error deleting staff:', error);
      throw error;
    }
  },
  
  subscribeToStaff(callback: (staff: Staff[]) => void) {
    const staffRef = database().ref('staff');
    
    staffRef.on('value', (snapshot) => {
      const staffMembers: Staff[] = [];
      snapshot.forEach((childSnapshot) => {
        staffMembers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as Staff);
        return true;
      });
      callback(staffMembers);
    });

    return () => staffRef.off();
  },
}; 