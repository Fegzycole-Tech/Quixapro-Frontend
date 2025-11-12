import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Column, RowAction } from '../types';

interface DataTableDesktopProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort: (key: string) => void;
  actions: RowAction<T>[];
  onRowClick?: (row: T) => void;
}

export function DataTableDesktop<T extends Record<string, string | number | boolean | null | undefined>>({
  data,
  columns,
  onSort,
  actions,
  onRowClick,
}: DataTableDesktopProps<T>) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-border">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                <button
                  onClick={() => column.sortable !== false && onSort(column.key)}
                  className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white disabled:cursor-default"
                  disabled={column.sortable === false}
                >
                  {column.header}
                  {column.sortable !== false && (
                    <ArrowUpDown className="w-3 h-3" />
                  )}
                </button>
              </th>
            ))}
            {actions.length > 0 && (
              <th className="w-24 px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors',
                onRowClick && 'cursor-pointer'
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(row);
                        }}
                        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        aria-label={action.label}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
