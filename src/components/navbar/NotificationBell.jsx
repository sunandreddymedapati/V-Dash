import React from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  return (
    <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
      <Bell className="w-5 h-5 text-gray-600" />
      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
      </span>
    </button>
  );
};

export default NotificationBell;
