import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFirestore } from '../../hooks/useFirestore';
import JudgingPanel from '../../components/judging/JudgingPanel';
import { Event } from '../../types/event';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EventJudging() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { getDocuments } = useFirestore('events');
  const { getDocuments: getRegistrations } = useFirestore('registrations');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getDocuments([]);
      setEvents(data as Event[]);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-800 mb-6"
      >
        Event Judging
      </motion.h1>

      <div className="mb-6">
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">Select Event for Judging</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {selectedEventId && (
        <JudgingPanel
          eventId={selectedEventId}
          teams={events.find(e => e.id === selectedEventId)?.registrations || []}
          criteria={events.find(e => e.id === selectedEventId)?.judgingCriteria}
        />
      )}
    </div>
  );
}