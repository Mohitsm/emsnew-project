// src/components/common/Table.jsx
import React from 'react';
import clsx from 'clsx';

const Table = ({ 
  columns, 
  data, 
  className, 
  loading = false,
  emptyMessage = 'No data found',
  onRowClick,
  ...props 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-4xl mb-4">📊</div>
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className={clsx('min-w-full divide-y divide-gray-200 dark:divide-gray-700', className)} {...props}>
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                scope="col"
                className={clsx(
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                  column.className
                )}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr 
              key={row.id || rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={clsx(
                'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
                onRowClick && 'cursor-pointer'
              )}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={clsx(
                    'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300',
                    column.cellClassName
                  )}
                >
                  {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;