import toast from 'react-hot-toast';

type NotificationType = 'info' | 'success' | 'error';

export const showToast = (message: string, type: NotificationType) => {
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast(message, { icon });
};