import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Download, Search, Filter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { exportToExcel, formatTeamData } from '../../utils/exportUtils';
import { useNotifications } from '../../contexts/NotificationContext';

interface Registration {
  id: string;
  eventId: string;
  teamName: string;
  teamSize: number;
  registrationDate: string;
  members: TeamMember[];
  status: 'pending' | 'approved' | 'rejected';
}

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  department: string;
  rollNumber: string;
}

interface Event {
  id: string;
  name: string;
}

export default function RegistrationManagement() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  const { getDocuments, updateDocument } = useFirestore('registrations');
  const { getDocuments: getEvents } = useFirestore('events');
  const { showNotification } = useNotifications();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [registrationsData, eventsData] = await Promise.all([
        getDocuments([]),
        getEvents(),
      ]);
      setRegistrations(registrationsData as Registration[]);
      setEvents(eventsData as Event[]);
    } catch (error) {
      showNotification('Error fetching data', 'error');
    }
  };

  const handleStatusChange = async (registrationId: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      await updateDocument(registrationId, { status: newStatus });
      setRegistrations(prevRegistrations =>
        prevRegistrations.map(reg =>
          reg.id === registrationId ? { ...reg, status: newStatus } : reg
        )
      );
      showNotification(`Registration ${newStatus} successfully`, 'success');
    } catch (error) {
      showNotification('Error updating status', 'error');
    }
  };

  const exportRegistrations = () => {
    const filteredRegistrations = getFilteredRegistrations();
    const formattedData = formatTeamData(filteredRegistrations);
    exportToExcel(formattedData, `registrations_${selectedEvent || 'all'}`);
    showNotification('Registrations exported successfully', 'success');
  };

  const getFilteredRegistrations = () => {
    return registrations.filter(reg => {
      const matchesEvent = selectedEvent ? reg.eventId === selectedEvent : true;
      const matchesSearch = reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.members.some(m => 
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus = statusFilter === 'all' ? true : reg.status === statusFilter;
      return matchesEvent && matchesSearch && matchesStatus;
    });
  };

  const toggleDetails = (registrationId: string) => {
    setShowDetails(prev => ({
      ...prev,
      [registrationId]: !prev[registrationId]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Registration Management</h1>
        <button
          onClick={exportRegistrations}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Download className="h-5 w-5 mr-2" />
          Export to Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search teams or members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-600 rounded-md text-white"
          />
        </div>

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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 bg-white/10 border border-gray-600 rounded-md text-white"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Team Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {getFilteredRegistrations().map((registration) => (
                <>
                  <motion.tr
                    key={registration.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="cursor-pointer hover:bg-white/5"
                    onClick={() => toggleDetails(registration.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm text-white font-medium">{registration.teamName}</div>
                      <div className="text-sm text-gray-400">
                        {registration.members.length} members
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {events.find(e => e.id === registration.eventId)?.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(registration.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(registration.status)} text-white`}>
                        {registration.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(registration.id, 'approved');
                        }}
                        className="text-green-400 hover:text-green-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(registration.id, 'rejected');
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        Reject
                      </button>
                    </td>
                  </motion.tr>
                  {showDetails[registration.id] && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-800/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {registration.members.map((member, index) => (
                            <div key={index} className="bg-white/5 p-4 rounded-lg">
                              <h4 className="font-medium text-white">{member.name}</h4>
                              <p className="text-sm text-gray-300">{member.email}</p>
                              <p className="text-sm text-gray-300">{member.phone}</p>
                              <p className="text-sm text-gray-300">{member.department}</p>
                              <p className="text-sm text-gray-300">Roll: {member.rollNumber}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}