import React from 'react';
import { Notification as NotificationType } from '../types';

interface Props {
  notification: NotificationType | null;
}

export const Notification: React.FC<Props> = ({ notification }) => {
  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
};