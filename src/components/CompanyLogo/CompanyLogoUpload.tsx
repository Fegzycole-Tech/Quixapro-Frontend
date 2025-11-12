import { type RefObject, type ChangeEvent } from 'react';
import { Loader2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOptimizedImageUrl } from '@/lib/utils/avatar';

interface CompanyLogoUploadProps {
  logoPreview: string | null;
  uploading: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}

export const CompanyLogoUpload = ({
  logoPreview,
  uploading,
  fileInputRef,
  onFileSelect,
  onRemove,
}: CompanyLogoUploadProps) => {
  const handleClick = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-3">
        Upload Company Logo
      </label>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 relative">
          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : logoPreview ? (
            <img
              src={getOptimizedImageUrl(logoPreview) || logoPreview}
              alt="Company logo preview"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <Building2 className="w-8 h-8 text-primary" />
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="hidden"
        />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-2">
            Max 400x400px, PNG or JPEG
          </p>
          <div className="flex gap-2">
            {logoPreview ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  disabled={uploading}
                >
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClick}
                  disabled={uploading}
                >
                  Change Photo
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClick}
                disabled={uploading}
              >
                Upload
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
