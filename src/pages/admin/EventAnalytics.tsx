import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { BarChart, PieChart, LineChart, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { format, subDays, eachDayOfInterval } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsData {
  totalRegistrations: number;
  registrationsByEvent: Record<string, number>;
  registrationsByDepartment: Record<string, number>;
  registrationTrend: { date: string; count: number }[];
  teamSizeDistribution: Record<number, number>;
  averageTeamSize: number;
  completionRate: number;
}

interface Event {
  id: string;
  name: string;
}

export default function EventAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalRegistrations: 0,
    registrationsByEvent: {},
    registrationsByDepartment: {},
    registrationTrend: [],
    teamSizeDistribution: {},
    averageTeamSize: 0,
    completionRate: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [dateRange, setDateRange] = useState<number>(30); // days

  const { getDocuments: getRegistrations } = useFirestore('registrations');
  const { getDocuments: getEvents } = useFirestore('events');

  useEffect(() => {
    fetchData();
  }, [selectedEvent, dateRange]);

  const fetchData = async () => {
    const [registrationsData, eventsData] = await Promise.all([
      getRegistrations(),
      getEvents(),
    ]);
    setEvents(eventsData as Event[]);
    
    const registrations = registrationsData.filter(reg => 
      selectedEvent ? reg.eventId === selectedEvent : true
    );

    // Calculate trend data
    const dates = eachDayOfInterval({
      start: subDays(new Date(), dateRange - 1),
      end: new Date(),
    });

    const trend = dates.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const count = registrations.filter(reg => 
        format(new Date(reg.registrationDate), 'yyyy-MM-dd') === dateStr
      ).length;
      return { date: dateStr, count };
    });

    // Calculate department distribution
    const deptCounts: Record<string, number> = {};
    registrations.forEach(reg => {
      reg.members.forEach(member => {
        deptCounts[member.department] = (deptCounts[member.department] || 0) + 1;
      });
    });

    // Calculate team size distribution
    const teamSizes: Record<number, number> = {};
    registrations.forEach(reg => {
      teamSizes[reg.teamSize] = (teamSizes[reg.teamSize] || 0) + 1;
    });

    // Calculate average team size
    const avgTeamSize = registrations.length > 0
      ? registrations.reduce((acc, reg) => acc + reg.teamSize, 0) / registrations.length
      : 0;

    // Calculate completion rate
    const completedCount = registrations.filter(reg => reg.status === 'completed').length;
    const completionRate = registrations.length > 0
      ? (completedCount / registrations.length) * 100
      : 0;

    setAnalyticsData({
      totalRegistrations: registrations.length,
      registrationsByEvent: {},
      registrationsByDepartment: deptCounts,
      registrationTrend: trend,
      teamSizeDistribution: teamSizes,
      averageTeamSize: avgTeamSize,
      completionRate,
    });
  };

  const trendChartData = {
    labels: analyticsData.registrationTrend.map(d => format(new Date(d.date), 'MMM d')),
    datasets: [{
      label: 'Registrations',
      data: analyticsData.registrationTrend.map(d => d.count),
      fill: true,
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
    }],
  };

  const deptChartData = {
    labels: Object.keys(analyticsData.registrationsByDepartment),
    datasets: [{
      data: Object.values(analyticsData.registrationsByDepartment),
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(167, 139, 250, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(129, 140, 248, 0.8)',
        'rgba(199, 210, 254, 0.8)',
      ],
    }],
  };

  const teamSizeChartData = {
    labels: Object.keys(analyticsData.teamSizeDistribution),
    datasets: [{
      label: 'Teams',
      data: Object.values(analyticsData.teamSizeDistribution),
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
    }],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Event Analytics</h1>
        <div className="flex space-x-4">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="p-2 bg-white/10 border border-gray-600 rounded-md text-white"
          >
            <option value="">All Events</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(parseInt(e.target.value))}
            className="p-2 bg-white/10 border border-gray-600 rounded-md text-white"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Registrations</p>
              <p className="text-3xl font-bold text-white mt-2">
                {analyticsData.totalRegistrations}
              </p>
            </div>
            <div className="bg-indigo-600 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Average Team Size</p>
              <p className="text-3xl font-bold text-white mt-2">
                {analyticsData.averageTeamSize.toFixed(1)}
              </p>
            </div>
            <div className="bg-purple-600 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Completion Rate</p>
              <p className="text-3xl font-bold text-white mt-2">
                {analyticsData.completionRate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-green-600 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Registration Trend</h2>
          <Line data={trendChartData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
            },
          }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Department Distribution</h2>
          <Pie data={deptChartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
            },
          }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Team Size Distribution</h2>
          <Bar data={teamSizeChartData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
            },
          }} />
        </motion.div>
      </div>
    </div>
  );
}