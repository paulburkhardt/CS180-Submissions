import React from 'react';
import { Card } from '@/components/ui/card';
import { Camera, Image } from 'lucide-react';

interface ImagePlaceholderProps {
  label: string;
  className?: string;
  isVideo?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  label, 
  className = '', 
  isVideo = false 
}) => {
  return (
    <div className={`bg-muted/50 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center p-8 min-h-[200px] ${className}`}>
      {isVideo ? (
        <Camera className="h-12 w-12 text-muted-foreground mb-2" />
      ) : (
        <Image className="h-12 w-12 text-muted-foreground mb-2" />
      )}
      <p className="text-sm font-medium text-muted-foreground text-center">{label}</p>
    </div>
  );
};