/**
 * Get initials from a name string
 * @param name - Full name string
 * @returns Uppercase initials
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

/**
 * Get a consistent avatar color based on name
 * @param name - Name string
 * @returns Tailwind CSS class for avatar color
 */
export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

/**
 * Optimize Cloudinary image URL for display
 * @param url - Original image URL
 * @returns Optimized URL or original if not Cloudinary
 */
export const getOptimizedImageUrl = (url: string | null): string | null => {
  if (!url) return null;

  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', '/upload/w_200,h_200,c_fill,g_auto,q_auto,f_auto/');
  }

  return url;
};
