import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Mail, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface Settings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  privacySettings: {
    showEmail: boolean;
    showProfile: boolean;
  };
}

export default function Settings() {
  const { user } = useAuth();
  const { updateDocument } = useFirestore('user-settings');
  const { showNotification } = useNotifications();
  
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: true,
    theme: 'system',
    language: 'en',
    privacySettings: {
      showEmail: false,
      showProfile: true,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateDocument(user?.uid || '', settings);
      showNotification('Settings saved successfully', 'success');
    } catch (error) {
      showNotification('Failed to save settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      title: 'Notifications',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-200">Email Notifications</label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="toggle"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-200">Push Notifications</label>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
              className="toggle"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Appearance',
      icon: Palette,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-200 mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value as 'light' | 'dark' | 'system' })}
              className="w-full p-2 bg-white/5 border border-gray-600 rounded-md text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Language',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-200 mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full p-2 bg-white/5 border border-gray-600 rounded-md text-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Privacy',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-200">Show Email</label>
            <input
              type="checkbox"
              checked={settings.privacySettings.showEmail}
              onChange={(e) => setSettings({
                ...settings,
                privacySettings: { ...settings.privacySettings, showEmail: e.target.checked }
              })}
              className="toggle"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-200">Show Profile</label>
            <input
              type="checkbox"
              checked={settings.privacySettings.showProfile}
              onChange={(e) => setSettings({
                ...settings,
                privacySettings: { ...settings.privacySettings, showProfile: e.target.checked }
              })}
              className="toggle"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <SettingsIcon className="h-6 w-6 mr-2" />
          Settings
        </h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <Save className="h-5 w-5 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <section.icon className="h-5 w-5 mr-2 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            </div>
            {section.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}