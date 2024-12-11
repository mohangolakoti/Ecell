import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  eventDate: string;
  registrationDeadline: string;
  location: string;
  registrations?: any[];
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const { getDocuments, deleteDocument } = useFirestore('events');

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getDocuments([]);
      setEvents(data as Event[]);
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteDocument(id);
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Events</h1>
        <Link
          to="/admin/events/new"
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Event
        </Link>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Event Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Registrations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {event.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(event.eventDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {event.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {event.registrations?.length || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/events/${event.id}/edit`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}