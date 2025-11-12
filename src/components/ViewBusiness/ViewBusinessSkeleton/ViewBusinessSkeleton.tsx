import { Skeleton } from '@/components/ui/skeleton';

export const ViewBusinessSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-28" />
        </div>

        <Skeleton className="h-8 w-40 mb-6" />

        <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6">
          <div className="mb-6">
            <Skeleton className="h-5 w-36 mb-1" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="mb-6">
            <Skeleton className="h-4 w-40 mb-3" />
            <div className="flex items-start gap-4">
              <Skeleton className="w-16 h-16 rounded-full shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-3 w-48 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="mb-4">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="mb-4">
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="mb-6">
            <Skeleton className="h-4 w-36 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
