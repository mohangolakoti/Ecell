import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Calendar, MapPin, Users, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import RegistrationForm from '../../components/RegistrationForm';

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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
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

  const upcomingEvents = events.filter(isEventUpcoming);
  const pastEvents = events.filter(event => !isEventUpcoming(event));

  useEffect(() => {
    if (upcomingEvents.length > 0) {
      const interval = setInterval(() => {
        const nextEventDate = new Date(upcomingEvents[0].eventDate).getTime();
        const now = new Date().getTime();
        const difference = nextEventDate - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [upcomingEvents]);

  const addToCalendar = (event: Event) => {
    const startDate = new Date(event.eventDate);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}\/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Next Event Timer */}
        {upcomingEvents[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Next Event</h2>
            <div className="bg-black/80 backdrop-blur-md rounded-lg p-8 border border-red-600">
              <h3 className="text-2xl font-semibold text-white mb-4">
                {upcomingEvents[0].name}
              </h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-red-600/20 p-4 rounded-lg">
                  <span className="text-3xl font-bold text-white">
                    {timeLeft.days}
                  </span>
                  <p className="text-red-200">Days</p>
                </div>
                <div className="bg-red-600/20 p-4 rounded-lg">
                  <span className="text-3xl font-bold text-white">
                    {timeLeft.hours}
                  </span>
                  <p className="text-red-200">Hours</p>
                </div>
                <div className="bg-red-600/20 p-4 rounded-lg">
                  <span className="text-3xl font-bold text-white">
                    {timeLeft.minutes}
                  </span>
                  <p className="text-red-200">Minutes</p>
                </div>
                <div className="bg-red-600/20 p-4 rounded-lg">
                  <span className="text-3xl font-bold text-white">
                    {timeLeft.seconds}
                  </span>
                  <p className="text-red-200">Seconds</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(upcomingEvents[0])}
                className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Register Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Upcoming Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black/80 backdrop-blur-md rounded-lg overflow-hidden border border-red-600"
              >
                <img
                  src={event.eventBanner}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-5 w-5 mr-2 text-red-500" />
                      <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-5 w-5 mr-2 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="h-5 w-5 mr-2 text-red-500" />
                      <span>Team Size: {event.teamSize}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Register
                    </button>
                    <button
                      onClick={() => addToCalendar(event)}
                      className="px-4 py-2 border border-red-600 text-red-400 rounded-md hover:bg-red-600/20 transition-colors"
                    >
                      <Calendar className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="p-6">
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

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <RegistrationForm
            eventId={selectedEvent.id}
            eventName={selectedEvent.name}
            eventBanner={selectedEvent.eventBanner}
            coordinator={selectedEvent.coordinator}
            onClose={() => setSelectedEvent(null)}
          />
        </div>
      )}
    </div>
  );
}