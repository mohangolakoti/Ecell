import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BookOpen, 
  Settings,
  Award,
  ClipboardList,
  BarChart
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Calendar, label: 'Events', path: '/admin/events' },
  { icon: Award, label: 'Judging', path: '/admin/events/judging' },
  { icon: ClipboardList, label: 'Registrations', path: '/admin/registrations' },
  { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
  { icon: Users, label: 'Team', path: '/admin/team' },
  { icon: BookOpen, label: 'Case Studies', path: '/admin/case-studies' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 pt-16">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:bg-red-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}