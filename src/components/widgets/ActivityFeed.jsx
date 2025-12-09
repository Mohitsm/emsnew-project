// src/components/widgets/ActivityFeed.jsx
import React from 'react';

const ActivityFeed = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id} 
          className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-800 rounded-lg">
            {activity.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.text}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;