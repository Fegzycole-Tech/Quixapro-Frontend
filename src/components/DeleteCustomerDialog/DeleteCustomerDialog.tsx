import { useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteCustomer } from '@/hooks';
import type { Customer } from '@/lib/api/customers';

interface DeleteCustomerDialogProps {
  customer: Customer | null;
  onClose: () => void;
}

export const DeleteCustomerDialog = ({
  customer,
  onClose,
}: DeleteCustomerDialogProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: deleteCustomer, isPending } = useDeleteCustomer();

  if (!customer) return null;

  const handleDelete = () => {
    deleteCustomer(customer.id, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
        }, 2000);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          disabled={isPending}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {showSuccess ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Customer Deleted Successfully
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The customer has been deleted
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Are you sure you want to delete this customer's info?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  By clicking on "Yes, Delete", you acknowledge that you want to delete this
                  customer permanently. If you are not sure, please cancel.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isPending}
                  className="flex-1"
                >
                  No, Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleDelete}
                  disabled={isPending}
                  loading={isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Yes, Delete
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
