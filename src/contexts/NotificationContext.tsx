import { createContext, useContext, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { showToast } from '../utils/notifications';

interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  showNotification: (message: string, type: 'info' | 'success' | 'error') => void;
  markAsRead: (notificationId: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { getDocuments, updateDocument } = useFirestore('notifications');

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        const notifications = await getDocuments([]);
        notifications
          .filter((n: Notification) => !n.read && n.userId === user.uid)
          .forEach((n: Notification) => {
            showToast(n.message, n.type);
          });
      };
      fetchNotifications();
    }
  }, [user, getDocuments]);

  const showNotification = (message: string, type: 'info' | 'success' | 'error') => {
    showToast(message, type);
  };

  const markAsRead = async (notificationId: string) => {
    await updateDocument(notificationId, { read: true });
  };

  return (
    <NotificationContext.Provider value={{ showNotification, markAsRead }}>
      {children}
      <Toaster position="top-right" />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}