import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  className = '', 
  iconSize = 20 
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="hover:bg-primary-foreground/10 transition-colors duration-200"
      >
        <a
          href="https://www.linkedin.com/in/pauldburkhardt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={iconSize} />
        </a>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="hover:bg-primary-foreground/10 transition-colors duration-200"
      >
        <a
          href="https://github.com/paulburkhardt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <Github size={iconSize} />
        </a>
      </Button>
    </div>
  );
};
