import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import AdminHeader from '../../components/AdminHeader';
import JudgingPanel from '../../components/JudgingPanel';
import { BarChart, Users, Calendar, CheckSquare, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalEvents: number;
  activeEvents: number;
  totalRegistrations: number;
  completedEvents: number;
  totalParticipants: number;
  averageTeamSize: number;
}

interface Event {
  id: string;
  name: string;
  eventDate: string;
}

interface Registration {
  id: string;
  teamName: string;
  members: any[];
  eventId: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    activeEvents: 0,
    totalRegistrations: 0,
    completedEvents: 0,
    totalParticipants: 0,
    averageTeamSize: 0,
  });
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const { getDocuments: getEvents } = useFirestore('events');
  const { getDocuments: getRegistrations } = useFirestore('registrations');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [eventsData, registrationsData] = await Promise.all([
        getEvents(),
        getRegistrations(),
      ]);

      setEvents(eventsData);
      setRegistrations(registrationsData);

      const now = new Date();
      const activeEvents = eventsData.filter(e => new Date(e.eventDate) > now);
      const completedEvents = eventsData.filter(e => new Date(e.eventDate) < now);
      const totalTeamSize = registrationsData.reduce((acc, reg) => acc + reg.members.length, 0);

      setStats({
        totalEvents: eventsData.length,
        activeEvents: activeEvents.length,
        totalRegistrations: registrationsData.length,
        completedEvents: completedEvents.length,
        totalParticipants: totalTeamSize,
        averageTeamSize: totalTeamSize / (registrationsData.length || 1),
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getTeamsForEvent = (eventId: string) => {
    return registrations.filter(reg => reg.eventId === eventId);
  };

  const statCards = [
    { title: 'Total Events', value: stats.totalEvents, icon: Calendar, color: 'bg-blue-500' },
    { title: 'Active Events', value: stats.activeEvents, icon: BarChart, color: 'bg-green-500' },
    { title: 'Total Registrations', value: stats.totalRegistrations, icon: Users, color: 'bg-purple-500' },
    { title: 'Completed Events', value: stats.completedEvents, icon: CheckSquare, color: 'bg-orange-500' },
    { title: 'Total Participants', value: stats.totalParticipants, icon: TrendingUp, color: 'bg-pink-500' },
    { title: 'Avg Team Size', value: stats.averageTeamSize.toFixed(1), icon: Award, color: 'bg-indigo-500' },
  ];

  return (
    <div className="p-6">
      <AdminHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mb-6">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full p-2 bg-white/10 border border-gray-600 rounded-md text-white"
        >
          <option value="">Select Event for Judging</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <JudgingPanel
          eventId={selectedEvent}
          teams={getTeamsForEvent(selectedEvent)}
        />
      )}
    </div>
  );
}