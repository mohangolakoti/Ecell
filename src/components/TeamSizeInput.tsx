import { useState } from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamSizeInputProps {
  onSubmit: (size: number) => void;
  onClose: () => void;
}

export default function TeamSizeInput({ onSubmit, onClose }: TeamSizeInputProps) {
  const [teamSize, setTeamSize] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamSize < 1 || teamSize > 10) {
      return;
    }
    onSubmit(teamSize);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-black/80 backdrop-blur-md rounded-lg p-6 max-w-md w-full border border-red-600"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Users className="h-6 w-6 mr-2" />
        Team Size
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Number of Team Members (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-black/50 border border-red-600/50 rounded-md text-white focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-red-600 text-red-400 rounded-md hover:bg-red-600/20 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
}