import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  name: string;
  eventDate: string;
  registrations?: any[];
  judgingCriteria?: any[];
}

interface JudgingEventListProps {
  onEventSelect: (eventId: string) => void;
}

export default function JudgingEventList({ onEventSelect }: JudgingEventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const { getDocuments } = useFirestore('events');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getDocuments([]);
    setEvents(data as Event[]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-dark rounded-lg p-6 cursor-pointer hover:bg-glass-dark/80 transition-all"
          onClick={() => onEventSelect(event.id)}
        >
          <h3 className="text-xl font-semibold text-white mb-4">{event.name}</h3>
          <div className="space-y-2 text-gray-300">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-red-500" />
              <span>{new Date(event.eventDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-red-500" />
              <span>{event.registrations?.length || 0} Registrations</span>
            </div>
          </div>
          <div className="mt-4">
            {event.judgingCriteria ? (
              <span className="text-green-400">Criteria Set</span>
            ) : (
              <span className="text-yellow-400">Criteria Not Set</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}