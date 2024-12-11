import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Registration {
  id: string;
  eventId: string;
  teamName: string;
  teamSize: number;
  registrationDate: string;
  members: {
    name: string;
    email: string;
    phone: string;
    department: string;
    rollNumber: string;
  }[];
  status: 'pending' | 'approved' | 'rejected';
}

export function useRegistrations(eventId?: string) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let constraints = [orderBy('registrationDate', 'desc')];
    if (eventId) {
      constraints = [where('eventId', '==', eventId), ...constraints];
    }

    const q = query(collection(db, 'registrations'), ...constraints);

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const regs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Registration[];
        setRegistrations(regs);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching registrations:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [eventId]);

  return { registrations, loading, error };
}