import { Building2, Loader2 } from 'lucide-react';
import { type ChangeEvent, type RefObject } from 'react';
import { Button } from '@/components/ui/button';

interface CompanyLogoDisplayProps {
  photoUrl: string | null;
  isEditMode: boolean;
  uploading: boolean;
  logoPreview: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveLogo: () => void;
}

export const CompanyLogoDisplay = ({
  photoUrl,
  isEditMode,
  uploading,
  logoPreview,
  fileInputRef,
  onFileSelect,
  onRemoveLogo,
}: CompanyLogoDisplayProps) => {
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const displayUrl = logoPreview || photoUrl;

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-3">
        Upload Company Logo
      </label>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
          {uploading ? (
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          ) : displayUrl ? (
            <img
              src={displayUrl}
              alt="Company logo"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <Building2 className="w-8 h-8 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-2">
            Max 400x400px, PNG or JPEG
          </p>
          <div className="flex gap-2">
            {displayUrl ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onRemoveLogo}
                  disabled={!isEditMode || uploading}
                >
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClick}
                  disabled={!isEditMode || uploading}
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
                disabled={!isEditMode || uploading}
              >
                Upload
              </Button>
            )}
          </div>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />
    </div>
  );
};
