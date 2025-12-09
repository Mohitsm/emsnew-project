// src/components/common/Input.jsx
import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText, 
  startIcon, 
  endIcon,
  containerClassName,
  className,
  ...props 
}, ref) => {
  return (
    <div className={clsx('space-y-2', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{startIcon}</span>
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            'block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            'px-4 py-2.5 text-sm',
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{endIcon}</span>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={clsx(
          'text-sm',
          error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;