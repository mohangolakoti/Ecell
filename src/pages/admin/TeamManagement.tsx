import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Plus, Trash2, Linkedin } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  linkedinUrl: string;
  imageUrl: string;
  department: string;
}

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    position: '',
    linkedinUrl: '',
    imageUrl: '',
    department: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const { getDocuments, addDocument, deleteDocument } = useFirestore('team');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const data = await getDocuments([]);
    setMembers(data as TeamMember[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDocument(newMember);
    setNewMember({
      name: '',
      position: '',
      linkedinUrl: '',
      imageUrl: '',
      department: '',
    });
    setIsAdding(false);
    fetchMembers();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      await deleteDocument(id);
      fetchMembers();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Team Management</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Member
        </button>
      </div>

      {isAdding && (
        <div className="mb-8 bg-white/10 backdrop-blur-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Position</label>
                <input
                  type="text"
                  value={newMember.position}
                  onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">LinkedIn URL</label>
                <input
                  type="url"
                  value={newMember.linkedinUrl}
                  onChange={(e) => setNewMember({ ...newMember, linkedinUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Profile Image URL</label>
                <input
                  type="url"
                  value={newMember.imageUrl}
                  onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Department</label>
                <input
                  type="text"
                  value={newMember.department}
                  onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-indigo-300">{member.position}</p>
              <p className="text-gray-400 text-sm">{member.department}</p>
              <div className="mt-4 flex justify-between items-center">
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}