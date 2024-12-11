import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface JudgingCriteria {
  id: string;
  name: string;
  maxScore: number;
  weight: number;
}

interface TeamScore {
  teamId: string;
  scores: Record<string, number>;
  totalScore: number;
  averageScore: number;
  rank?: number;
}

export function useJudging(eventId: string) {
  const [scores, setScores] = useState<TeamScore[]>([]);
  const [criteria, setCriteria] = useState<JudgingCriteria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const q = query(
      collection(db, 'events'),
      where('id', '==', eventId)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        if (!snapshot.empty) {
          const eventData = snapshot.docs[0].data();
          setCriteria(eventData.judgingCriteria || []);
          
          // Calculate ranks based on scores
          const sortedScores = [...(eventData.scores || [])].sort(
            (a, b) => b.totalScore - a.totalScore
          );
          
          sortedScores.forEach((score, index) => {
            score.rank = index + 1;
          });
          
          setScores(sortedScores);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching judging data:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [eventId]);

  return { scores, criteria, loading, error };
}