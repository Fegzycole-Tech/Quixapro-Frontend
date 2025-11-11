import { type RefObject, type ChangeEvent } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompanyLogoUploadProps {
  logoPreview: string | null;
  uploading: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Optimize Cloudinary URL for thumbnail display
const getOptimizedImageUrl = (url: string | null): string | null => {
  if (!url) return null;

  // Check if it's a Cloudinary URL
  if (url.includes('cloudinary.com')) {
    // Insert transformation parameters for a 200x200 thumbnail
    return url.replace('/upload/', '/upload/w_200,h_200,c_fill,g_auto,q_auto,f_auto/');
  }

  return url;
};

export const CompanyLogoUpload = ({
  logoPreview,
  uploading,
  fileInputRef,
  onFileSelect,
}: CompanyLogoUploadProps) => {
  const handleClick = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4 cursor-pointer hover:bg-muted/80 transition-colors overflow-hidden relative"
        onClick={handleClick}
      >
        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/90">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : logoPreview ? (
          <img
            src={getOptimizedImageUrl(logoPreview) || logoPreview}
            alt="Company logo preview"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="text-4xl text-muted-foreground">🏢</div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />
      <div className="text-center">
        <p className="text-sm font-medium text-foreground mb-1">
          Upload Company Logo
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Min 400x400px, PNG or JPEG
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClick}
          disabled={uploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};
