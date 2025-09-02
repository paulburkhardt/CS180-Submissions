import React from 'react';
import { UploadZone } from './UploadZone';
import { ScrollReveal } from './ScrollReveal';
import { Card } from '@/components/ui/card';

interface AssignmentSectionProps {
  title: string;
  subtitle: string;
  description: string;
  uploadTitle: string;
  uploadDescription: string;
  onFileUpload: (files: File[]) => void;
  uploadedFiles: File[];
  className?: string;
  icon?: React.ReactNode;
}

export const AssignmentSection: React.FC<AssignmentSectionProps> = ({
  title,
  subtitle,
  description,
  uploadTitle,
  uploadDescription,
  onFileUpload,
  uploadedFiles,
  className = '',
  icon
}) => {
  return (
    <ScrollReveal className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {icon && <div className="text-accent">{icon}</div>}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
                <h3 className="text-xl text-accent font-medium">{subtitle}</h3>
              </div>
            </div>
            
            <Card className="p-6 nature-pattern">
              <p className="text-foreground leading-relaxed">{description}</p>
            </Card>
          </div>
          
          <div>
            <UploadZone
              title={uploadTitle}
              description={uploadDescription}
              onFileUpload={onFileUpload}
              uploadedFiles={uploadedFiles}
              maxFiles={2}
            />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};