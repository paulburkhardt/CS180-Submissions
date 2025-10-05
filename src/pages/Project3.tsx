import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SocialLinks } from '@/components/SocialLinks';
import { 
  Image as ImageIcon, 
  ArrowRight, 
  Home, 
  Grid,
  Eye,
  Zap,
  X,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import mountainHero from '@/assets/mountain-hero.jpg';
import bearIcon from '@/assets/bear-icon.png';

const Project3 = () => {
  const [activeSection, setActiveSection] = useState('');
  const [activeSubsection, setActiveSubsection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Helper function to scroll to section with offset
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 80px offset for header
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const subsections = document.querySelectorAll('div[id^="part"]');
      const scrollPosition = window.scrollY + 200;
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Track main sections
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });

      // Track subsections with more granular detection
      let currentSubsection = '';
      subsections.forEach((subsection) => {
        const subsectionTop = (subsection as HTMLElement).offsetTop;
        const subsectionHeight = (subsection as HTMLElement).offsetHeight;
        const subsectionId = subsection.getAttribute('id') || '';

        if (scrollPosition >= subsectionTop && scrollPosition < subsectionTop + subsectionHeight) {
          currentSubsection = subsectionId;
        }
      });
      
      if (currentSubsection !== activeSubsection) {
        setActiveSubsection(currentSubsection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSubsection]);

  // Handle Escape key to close fullscreen modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null);
        }
      }
    };

    // Add event listener when fullscreen is open
    if (fullscreenImage) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [fullscreenImage]);

  const navigationItems = [
    { id: 'overview', title: 'Overview', icon: <Eye className="h-4 w-4" /> },
    { id: 'parta', title: 'Part A: Image Warping and Mosaicing', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'parta-1', title: 'A.1: Shoot the Pictures', icon: <Grid className="h-4 w-4" /> },
    { id: 'parta-2', title: 'A.2: Recover Homographies', icon: <Zap className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-nav-green hover:opacity-80 transition-colors">
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {activeSubsection && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-nav-green rounded-full animate-pulse"></div>
                  <span>Currently: <span className="text-nav-green font-medium">{activeSubsection}</span></span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <img src={bearIcon} alt="Bear" className="h-8 w-8" />
                <span className="text-lg font-bold text-nav-green">Project 3</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
          <div 
            className="h-full transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%`, background: 'linear-gradient(to right, hsl(120, 40%, 25%), hsl(120, 40%, 25%, 0.6))' }}
          />
        </div>
      </nav>

      {/* Mobile Navigation Indicator */}
      <div className="fixed bottom-6 right-6 z-40 xl:hidden">
        {activeSubsection && (
          <div className="px-3 py-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-full">
            <div className="text-xs text-muted-foreground">
              {activeSubsection}
            </div>
          </div>
        )}
      </div>

      {/* Side Navigation */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
        <div className="w-56 space-y-1">
          {navigationItems.map((item) => {
            const isMainSection = ['overview', 'parta'].includes(item.id);
            const isActiveSection = activeSection === item.id;
            const isActiveSubsection = activeSubsection === item.id;
            const isInActiveSection = !isMainSection && activeSection && item.id.startsWith(activeSection);
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 ${
                  isActiveSection || isActiveSubsection
                    ? 'text-nav-green font-medium'
                    : isInActiveSection
                    ? 'text-muted-foreground/80 pl-6 border-l border-nav-green'
                    : isMainSection
                    ? 'text-muted-foreground hover:text-nav-green'
                    : 'text-muted-foreground/60 hover:text-muted-foreground pl-6'
                }`}
              >
                <span className={`${isActiveSubsection ? 'relative' : ''}`}>
                  {item.title}
                  {isActiveSubsection && (
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-nav-green rounded-full" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="h-8 w-8" />
          </button>
          <img 
            src={fullscreenImage} 
            alt="Fullscreen view" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-25">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
            {/* Placeholder for future mosaic images */}
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              [Auto]Stitching Photo Mosaics
            </h1>
            
            
          </ScrollReveal>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Image Warping and Mosaicing Project</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              This project is all about stitching together many photographs to create larger composite images.
            </p>
          </div>
        </div>
      </section>

      {/* Part A: Image Warping and Mosaicing */}
      <section id="parta" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part A: Image Warping and Mosaicing</h2>
          
          <div className="space-y-12">
            <div>
              <p className="text-gray-700 mb-4">
                The first part focuses on getting my hands dirty with different aspects of image warping through the application of image mosaicing. I took two or more photographs and created image mosaics by registering, projective warping, resampling, and compositing them. Along the way, I learned how to compute homographies and how to use them to warp images.
              </p>
            </div>

            <div id="parta-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">A.1: Shoot the Pictures</h3>
              
              <p className="text-gray-700 mb-4">
                In this project, the focus lies on <strong>projective transformations.</strong>
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Understanding Projective Transformations</h4>
                  
                  <p className="text-gray-700 mb-4">
                    Projective transformations (also called homographies) are more general than other types of geometric transformations. Here's how they compare:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Translation:</strong> Only moves an image in x and y directions (2 degrees of freedom)</li>
                      <li><strong>Euclidean/Rigid:</strong> Translation + rotation, preserves distances and angles (3 degrees of freedom)</li>
                      <li><strong>Similarity:</strong> Euclidean + uniform scaling, preserves angles and ratios (4 degrees of freedom)</li>
                      <li><strong>Affine:</strong> Similarity + non-uniform scaling and shearing, preserves parallel lines (6 degrees of freedom)</li>
                      <li><strong>Projective:</strong> The most general linear transformation in 2D, does not preserve parallelism but does preserve straight lines (8 degrees of freedom)</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Projective transformations are essential for image mosaicing because they can account for perspective changes that occur when images are taken from the same center of projection (COP) but at different angles. This is exactly what happens when I rotate a camera around its optical center.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    For this project, I needed to acquire images that were taken from the same center of projection but with different perspectives. This way the images capture more of the scene but can't be stitched together directly because they have different perspectives.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    Down here you can see the example pictures I acquired for the project:
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <p className="text-gray-600 text-center italic">
                      INSERT IMAGES HERE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="parta-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">A.2: Recover Homographies</h3>
              
              <p className="text-gray-700 mb-4">
                To actually warp the images together, I needed to recover the parameters of the homography. This is a 3×3 matrix with 8 degrees of freedom (since the bottom-right element is normalized to 1).
              </p>
              
              <p className="text-gray-700 mb-4">
                To recover this homography, I manually selected pairs of corresponding points in the two images that represent the same point in the real world. To recover the 8 degrees of freedom, I would theoretically need a minimum of 4 point pairs, as each pair gives us 2 constraints. However, since the acquisition of the images is not perfect, using only the minimum number of points might not result in a good projection. This is why I sampled more points than necessary.
              </p>
              
              <p className="text-gray-700 mb-4">
                By oversampling correspondence points, I could solve the overdetermined system using least-squares linear regression, which provides a more robust solution that accounts for noise and imperfect point selections.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Mathematical Formulation</h4>
                  
                  <p className="text-gray-700 mb-4">
                    For each point pair (p, p'), where p = (x, y) in the source image and p' = (x', y') in the destination image, the following equations are added to the linear system:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-base space-y-2">
                      <div>x' = (h₁₁x + h₁₂y + h₁₃) / (h₃₁x + h₃₂y + 1)</div>
                      <div>y' = (h₂₁x + h₂₂y + h₂₃) / (h₃₁x + h₃₂y + 1)</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    These can be rearranged into a linear form and stacked to produce the overall system Ah = b, where h is the vector of homography parameters.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    For the following images, I selected the following corresponding points:
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <p className="text-gray-600 text-center italic">
                      [Image with points placeholder]
                    </p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    That resulted in this system of equations:
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <p className="text-gray-600 text-center italic">
                      [System of equations placeholder]
                    </p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    And finally, this recovered homography matrix:
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <p className="text-gray-600 text-center italic">
                      [Homography matrix placeholder]
                    </p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    After solving with least squares, the resulting h vector is reshaped into a 3×3 matrix, giving me the homography that describes the projective transformation between the two images.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={bearIcon} alt="Bear" className="h-8 w-8 opacity-80" />
            <h3 className="text-xl font-semibold">CS180 Project 3</h3>
          </div>
          <p className="text-primary-foreground/80 mb-6">
            Image Warping and Mosaicing
          </p>
          <SocialLinks className="justify-center" iconSize={24} />
        </div>
      </footer>
    </div>
  );
};

export default Project3;
