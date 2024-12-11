import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';

interface EventFormData {
  name: string;
  description: string;
  eventDate: string;
  registrationDeadline: string;
  location: string;
  department: string;
  prizeDetails: {
    first: string;
    second: string;
    third: string;
  };
  teamSize: number;
  registrationFields: string[];
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

export default function EventForm() {
  const navigate = useNavigate();
  const { addDocument } = useFirestore('events');
  const { showNotification } = useNotifications();
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    eventDate: '',
    registrationDeadline: '',
    location: '',
    department: '',
    prizeDetails: {
      first: '',
      second: '',
      third: '',
    },
    teamSize: 1,
    registrationFields: ['name', 'email', 'phone', 'department'],
    coordinator: {
      name: '',
      email: '',
      phone: '',
      department: '',
    },
    studentCoordinator: {
      name: '',
      email: '',
      phone: '',
      department: '',
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDocument(formData);
      showNotification('Event created successfully', 'success');
      navigate('/admin/events');
    } catch (error) {
      showNotification('Failed to create event', 'error');
    }
  };

  const updateCoordinator = (type: 'coordinator' | 'studentCoordinator', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 space-y-4 shadow-lg">
          <div>
            <label className="block text-sm font-medium text-black">Event Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">Event Date</label>
              <input
                type="datetime-local"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">Registration Deadline</label>
              <input
                type="datetime-local"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Faculty Coordinator Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-black mb-4">Faculty Coordinator Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black">Name</label>
                <input
                  type="text"
                  value={formData.coordinator.name}
                  onChange={(e) => updateCoordinator('coordinator', 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Email</label>
                <input
                  type="email"
                  value={formData.coordinator.email}
                  onChange={(e) => updateCoordinator('coordinator', 'email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Phone</label>
                <input
                  type="tel"
                  value={formData.coordinator.phone}
                  onChange={(e) => updateCoordinator('coordinator', 'phone', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Department</label>
                <input
                  type="text"
                  value={formData.coordinator.department}
                  onChange={(e) => updateCoordinator('coordinator', 'department', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Student Coordinator Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-black mb-4">Student Coordinator Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black">Name</label>
                <input
                  type="text"
                  value={formData.studentCoordinator.name}
                  onChange={(e) => updateCoordinator('studentCoordinator', 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Email</label>
                <input
                  type="email"
                  value={formData.studentCoordinator.email}
                  onChange={(e) => updateCoordinator('studentCoordinator', 'email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Phone</label>
                <input
                  type="tel"
                  value={formData.studentCoordinator.phone}
                  onChange={(e) => updateCoordinator('studentCoordinator', 'phone', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Department</label>
                <input
                  type="text"
                  value={formData.studentCoordinator.department}
                  onChange={(e) => updateCoordinator('studentCoordinator', 'department', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Team Size</label>
            <input
              type="number"
              min="1"
              value={formData.teamSize}
              onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">First Prize</label>
              <input
                type="text"
                value={formData.prizeDetails.first}
                onChange={(e) => setFormData({
                  ...formData,
                  prizeDetails: { ...formData.prizeDetails, first: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">Second Prize</label>
              <input
                type="text"
                value={formData.prizeDetails.second}
                onChange={(e) => setFormData({
                  ...formData,
                  prizeDetails: { ...formData.prizeDetails, second: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">Third Prize</label>
              <input
                type="text"
                value={formData.prizeDetails.third}
                onChange={(e) => setFormData({
                  ...formData,
                  prizeDetails: { ...formData.prizeDetails, third: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}