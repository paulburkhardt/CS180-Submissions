import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Card } from '@/components/ui/card';

interface AssignmentSectionProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AssignmentSection: React.FC<AssignmentSectionProps> = ({
  title,
  subtitle,
  description,
  className = '',
  icon,
  children
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
          
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};