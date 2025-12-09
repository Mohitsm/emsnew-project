// src/components/common/Card.jsx
import React from 'react';
import clsx from 'clsx';

const Card = ({ children, className, hover = false, padding = true, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700',
        padding && 'p-6',
        hover && 'transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={clsx('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={clsx('text-lg font-semibold text-gray-900 dark:text-white', className)} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={clsx('text-sm text-gray-600 dark:text-gray-400 mt-1', className)} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={clsx(className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={clsx('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;