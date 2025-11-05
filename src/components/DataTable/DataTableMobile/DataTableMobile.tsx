import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Column, RowAction } from '../types';

interface DataTableMobileProps<T> {
  data: T[];
  columns: Column<T>[];
  actions: RowAction<T>[];
  onRowClick?: (row: T) => void;
}

export function DataTableMobile<T extends Record<string, string | number | boolean | null | undefined>>({
  data,
  columns,
  actions,
  onRowClick,
}: DataTableMobileProps<T>) {
  return (
    <div className="md:hidden divide-y divide-border">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          onClick={() => onRowClick?.(row)}
          className={cn(
            'p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors',
            onRowClick && 'cursor-pointer'
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {columns
                .filter((col) => !col.hideOnMobile)
                .map((column) => (
                  <div key={column.key} className="mb-2 last:mb-0">
                    {column.mobileRender
                      ? column.mobileRender(row)
                      : column.render
                      ? column.render(row)
                      : row[column.key]}
                  </div>
                ))}
            </div>

            {actions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(row);
                      }}
                    >
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
