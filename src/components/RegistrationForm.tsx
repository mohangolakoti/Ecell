import { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useNotifications } from '../contexts/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import TeamSizeInput from './TeamSizeInput';
import TeamDetailsForm from './registration/TeamDetailsForm';
import EventInfo from './registration/EventInfo';
import ProgressBar from './registration/ProgressBar';

interface RegistrationFormProps {
  eventId: string;
  eventName: string;
  eventBanner: string;
  coordinator: {
    name: string;
    email: string;
    phone: string;
  };
  onClose: () => void;
}

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  department: string;
  rollNumber: string;
}

const initialMemberState: TeamMember = {
  name: '',
  email: '',
  phone: '',
  department: '',
  rollNumber: '',
};

export default function RegistrationForm({ 
  eventId, 
  eventName, 
  eventBanner, 
  coordinator, 
  onClose 
}: RegistrationFormProps) {
  const [teamSize, setTeamSize] = useState<number | null>(null);
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const { addDocument } = useFirestore('registrations');
  const { showNotification } = useNotifications();

  const handleTeamSizeSubmit = (size: number) => {
    setTeamSize(size);
    setMembers(Array(size).fill(null).map(() => ({ ...initialMemberState })));
    setCurrentStep(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamSize) return;

    const isValid = members.every(member => 
      member.name && 
      member.email && 
      member.phone && 
      member.department && 
      member.rollNumber
    );

    if (!isValid) {
      showNotification('Please fill in all fields for each team member', 'error');
      return;
    }

    try {
      await addDocument({
        eventId,
        teamName,
        members,
        teamSize,
        registrationDate: new Date().toISOString(),
        status: 'pending',
      });
      
      showNotification('Registration submitted successfully!', 'success');
      onClose();
    } catch (error) {
      showNotification('Failed to submit registration', 'error');
    }
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    setMembers(prevMembers => 
      prevMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    );
  };

  if (!teamSize) {
    return <TeamSizeInput onSubmit={handleTeamSizeSubmit} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-black/80 backdrop-blur-md rounded-lg p-6 max-w-4xl w-full border border-red-600 max-h-[90vh] overflow-y-auto"
      >
        <EventInfo
          eventName={eventName}
          eventBanner={eventBanner}
          coordinator={coordinator}
        />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProgressBar
            totalSteps={teamSize + 1}
            currentStep={currentStep}
          />

          <AnimatePresence mode="wait">
            {currentStep === 0 ? (
              <motion.div
                key="team-name"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-200">Team Name</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-black/50 border border-red-600/50 text-white p-2 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </motion.div>
            ) : (
              <TeamDetailsForm
                key={`member-${currentStep}`}
                member={members[currentStep - 1]}
                memberIndex={currentStep - 1}
                onUpdate={(field, value) => updateMember(currentStep - 1, field, value)}
              />
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={currentStep === 0 ? onClose : () => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 border border-red-600 text-red-400 rounded-md hover:bg-red-600/20 transition-colors"
            >
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </button>
            
            {currentStep === teamSize ? (
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Submit Registration
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}