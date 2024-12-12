import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Calendar, MapPin} from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  name: string;
  description: string;
  eventDate: string;
  registrationDeadline: string;
  location: string;
  department: string;
  teamSize: number;
  eventBanner: string;
  coordinator: {
    name: string;
    email: string;
    phone: string;
  };
  prizeDetails: {
    first: string;
    second: string;
    third: string;
  };
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const { getDocuments } = useFirestore('events');

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getDocuments([]);
      setEvents(data.map(event => ({
        ...event,
        eventBanner: event.eventBanner || 'https://source.unsplash.com/random/800x400?tech,event',
        coordinator: event.coordinator || {
          name: 'Event Coordinator',
          email: 'coordinator@vishnu.edu.in',
          phone: '+91 9876543210'
        }
      })) as Event[]);
    };
    fetchEvents();
  }, []);

  const isEventUpcoming = (event: Event) => {
    return new Date(event.eventDate) > new Date();
  };

  const pastEvents = events.filter(event => !isEventUpcoming(event));


  return (
    <div className=" pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Past Events */}
        <section>
          <h2 className='font-bold text-3xl text-center py-4 font-Montserrat text-white flex justify-center items-center'>Past Events</h2>
          <div className="flex gap-6 justify-center w-full">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black/80 backdrop-blur-md rounded-lg overflow-hidden opacity-75 border border-red-600/50"
              >
                <img
                  src={event.eventBanner}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 w-full">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-5 w-5 mr-2 text-red-500" />
                      <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-5 w-5 mr-2 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}