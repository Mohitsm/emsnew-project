// src/components/widgets/StatCard.jsx
import React from 'react';
import clsx from 'clsx';

const StatCard = ({ title, value, change, icon, color, className }) => {
  return (
    <div className={clsx(
      'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow card-hover',
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;