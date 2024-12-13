import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminHeader from '../../components/AdminHeader';

export default function AdminLayout() {
  return (
    <ProtectedRoute adminOnly>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 mt-20">
          <div className="p-6 text-gray-600">
            <Outlet />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}