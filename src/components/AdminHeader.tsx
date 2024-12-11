import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function AdminHeader() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </button>
    </div>
  );
}