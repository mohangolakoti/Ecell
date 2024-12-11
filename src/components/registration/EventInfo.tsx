interface EventInfoProps {
  eventName: string;
  eventBanner: string;
  coordinator: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function EventInfo({ eventName, eventBanner, coordinator }: EventInfoProps) {
  return (
    <div className="mb-6">
      <img
        src={eventBanner}
        alt={eventName}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold text-white mb-2">{eventName}</h2>
      <div className="bg-black/50 rounded-lg p-4 border border-red-600/50">
        <h3 className="text-lg font-semibold text-white mb-2">Event Coordinator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <span className="block text-sm text-red-400">Name</span>
            {coordinator.name}
          </div>
          <div>
            <span className="block text-sm text-red-400">Email</span>
            {coordinator.email}
          </div>
          <div>
            <span className="block text-sm text-red-400">Phone</span>
            {coordinator.phone}
          </div>
        </div>
      </div>
    </div>
  );
}