import { 
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
  QueryConstraint,
  onSnapshot,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { showToast } from '../utils/notifications';

export function useFirestore(collectionName: string) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      try {
        await enableNetwork(db);
        showToast('Back online! Syncing data...', 'success');
      } catch (error) {
        console.error('Error enabling network:', error);
      }
    };

    const handleOffline = async () => {
      setIsOnline(false);
      try {
        await disableNetwork(db);
        showToast('You are offline. Working with cached data.', 'info');
      } catch (error) {
        console.error('Error disabling network:', error);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getDocuments = async (constraints: QueryConstraint[] = []) => {
    setIsLoading(true);
    setError(null);
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      setIsLoading(false);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Error fetching data');
      showToast('Error fetching data', 'error');
      setIsLoading(false);
      return [];
    }
  };

  const subscribeToCollection = (
    constraints: QueryConstraint[] = [],
    callback: (data: any[]) => void
  ) => {
    const q = query(collection(db, collectionName), ...constraints);
    return onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(data);
      },
      (error) => {
        console.error('Firestore subscription error:', error);
        showToast('Error syncing data', 'error');
      }
    );
  };

  const addDocument = async (data: DocumentData) => {
    setIsLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString()
      });
      setIsLoading(false);
      showToast('Document added successfully', 'success');
      return docRef;
    } catch (error) {
      console.error('Error adding document:', error);
      setError('Error adding document');
      showToast('Error adding document', 'error');
      setIsLoading(false);
      throw error;
    }
  };

  const updateDocument = async (id: string, data: DocumentData) => {
    setIsLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      setIsLoading(false);
      showToast('Document updated successfully', 'success');
    } catch (error) {
      console.error('Error updating document:', error);
      setError('Error updating document');
      showToast('Error updating document', 'error');
      setIsLoading(false);
      throw error;
    }
  };

  const deleteDocument = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      setIsLoading(false);
      showToast('Document deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting document:', error);
      setError('Error deleting document');
      showToast('Error deleting document', 'error');
      setIsLoading(false);
      throw error;
    }
  };

  return {
    getDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    subscribeToCollection,
    where,
    orderBy,
    isOnline,
    isLoading,
    error
  };
}