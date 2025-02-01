import { db } from '../config/firebase';

// Types
interface User {
  id?: string;
  name: string;
  avatarUrl: string;
  // add other fields as needed
}

export const firebaseService = {
  // Create
  async createUser(userData: Omit<User, 'id'>): Promise<string> {
    try {
      const docRef = await db.collection('users').add(userData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Read
  async getUser(userId: string): Promise<User | null> {
    try {
      const doc = await db.collection('users').doc(userId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() } as User;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Read All
  async getAllUsers(): Promise<User[]> {
    try {
      const snapshot = await db.collection('users').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Update
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    try {
      await db.collection('users').doc(userId).update(userData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete
  async deleteUser(userId: string): Promise<void> {
    try {
      await db.collection('users').doc(userId).delete();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Real-time updates
  subscribeToUsers(callback: (users: User[]) => void) {
    return db.collection('users').onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      callback(users);
    });
  }
}; 