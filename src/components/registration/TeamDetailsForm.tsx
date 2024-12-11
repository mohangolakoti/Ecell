import { Users, Mail, Phone, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  department: string;
  rollNumber: string;
}

const departments = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Electrical',
  'Mechanical',
  'Civil',
  'Chemical',
  'Other'
];

interface TeamDetailsFormProps {
  member: TeamMember;
  memberIndex: number;
  onUpdate: (field: keyof TeamMember, value: string) => void;
}

export default function TeamDetailsForm({ member, memberIndex, onUpdate }: TeamDetailsFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-medium text-white">
        Team Member {memberIndex + 1}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            <Users className="h-4 w-4 inline mr-2" />
            Name
          </label>
          <input
            type="text"
            value={member.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="mt-1 block w-full rounded-md bg-black/50 border border-red-600/50 text-white p-2 focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200">
            <Mail className="h-4 w-4 inline mr-2" />
            Email
          </label>
          <input
            type="email"
            value={member.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            className="mt-1 block w-full rounded-md bg-black/50 border border-red-600/50 text-white p-2 focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200">
            <Phone className="h-4 w-4 inline mr-2" />
            Phone
          </label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={member.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            className="mt-1 block w-full rounded-md bg-black/50 border border-red-600/50 text-white p-2 focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200">
            <GraduationCap className="h-4 w-4 inline mr-2" />
            Department
          </label>
          <select
            value={member.department}
            onChange={(e) => onUpdate('department', e.target.value)}
            className="mt-1 block w-full rounded-md bg-black/50 border border-red-600/50 text-white p-2 focus:border-red-500 focus:ring-red-500"
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200">Roll Number</label>
          <input
            type="text"
            value={member.rollNumber}
            onChange={(e) => onUpdate('rollNumber', e.target.value)}
            className="mt-1 block w-full rounded-md bg-black/50 border border-red-600/50 text-white p-2 focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}