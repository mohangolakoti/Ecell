import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Calendar, Users, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  name: string;
  eventDate: string;
  registrations?: any[];
  judgingCriteria?: any[];
  coordinator: {
    name: string;
    email: string;
    phone: string;
    department: string;
  };
  studentCoordinator: {
    name: string;
    email: string;
    phone: string;
    department: string;
  };
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
          className="bg-white/80 backdrop-blur-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all border border-gray-200"
          onClick={() => onEventSelect(event.id)}
        >
          <h3 className="text-xl font-semibold text-black mb-4">{event.name}</h3>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-red-500" />
              <span>{new Date(event.eventDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-red-500" />
              <span>{event.registrations?.length || 0} Registrations</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-black mb-2">Faculty Coordinator</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{event.coordinator.name}</p>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-red-500" />
                <a href={`mailto:${event.coordinator.email}`} className="hover:text-red-600">
                  {event.coordinator.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-red-500" />
                <a href={`tel:${event.coordinator.phone}`} className="hover:text-red-600">
                  {event.coordinator.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-black mb-2">Student Coordinator</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{event.studentCoordinator.name}</p>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-red-500" />
                <a href={`mailto:${event.studentCoordinator.email}`} className="hover:text-red-600">
                  {event.studentCoordinator.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-red-500" />
                <a href={`tel:${event.studentCoordinator.phone}`} className="hover:text-red-600">
                  {event.studentCoordinator.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Judging Criteria: {event.judgingCriteria ? 'Set' : 'Not Set'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEventSelect(event.id);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Start Judging
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}