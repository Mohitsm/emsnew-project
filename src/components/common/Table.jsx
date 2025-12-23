// src/components/common/Table.jsx
import React from 'react';
import { Edit, Trash2, Eye, MoreVertical } from 'lucide-react';

const Table = ({ 
  columns, 
  data, 
  className = '', 
  loading = false,
  emptyMessage = 'No data found',
  onRowClick,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  ...props 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12 bg-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 bg-white">
        <div className="text-gray-300 text-6xl mb-4">📊</div>
        <p className="text-gray-500 text-lg font-medium">{emptyMessage}</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or add new data</p>
      </div>
    );
  }

  // Determine if we need actions column
  const hasActions = showActions && (onEdit || onDelete || onView);

  return (
    <div className="overflow-x-auto bg-white">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`} {...props}>
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                scope="col"
                className={`px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.title}
              </th>
            ))}
            {hasActions && (
              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr 
              key={row.id || rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`transition-all duration-150 hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`px-6 py-4 text-sm text-gray-900 ${column.cellClassName || ''}`}
                >
                  {column.render 
                    ? column.render(row[column.key], row, rowIndex) 
                    : row[column.key]}
                </td>
              ))}
              {hasActions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {onView && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onView(row);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-md"
                        title="View details"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row);
                        }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:shadow-md"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(row);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-md"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;