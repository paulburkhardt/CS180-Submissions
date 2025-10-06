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

// Boats images
import a1_boats1 from '@/assets/project3/boats/a1_boats1.jpeg';
import a1_boats2 from '@/assets/project3/boats/a1_boats2.jpeg';
import a1_boats3 from '@/assets/project3/boats/a1_boats3.jpeg';
import a1_boats4 from '@/assets/project3/boats/a1_boats4.jpeg';
import correspondences_1_2 from '@/assets/project3/boats/correspondences_1_2.png';
import correspondences_2_3 from '@/assets/project3/boats/correspondences_2_3.png';
import correspondences_3_4 from '@/assets/project3/boats/correspondences_3_4.png';

// East Asian Library images
import a1_east_asian_1 from '@/assets/project3/east_asian/a1_east_asian_1.jpeg';
import a1_east_asian_2 from '@/assets/project3/east_asian/a1_east_asian_2.jpeg';

// Outside images
import a1_outside1 from '@/assets/project3/outside/a1_outside1.jpeg';
import a1_outside2 from '@/assets/project3/outside/a1_outside2.jpeg';
import a1_outside3 from '@/assets/project3/outside/a1_outside3.jpeg';

// Rectification images
import a3_macbook_comparison from '@/assets/project3/rectification/a3_macbook_comparison.png';
import a3_macbook_zoom from '@/assets/project3/rectification/a3_macbook_zoom.png';
import a3_sign_comparison_with_zoom from '@/assets/project3/rectification/a3_sign_comparison_with_zoom.png';
import a3_sign_zoomed from '@/assets/project3/rectification/a3_sign_zoomed.png';

// Blended images
import boats_warped from '@/assets/project3/blended/boats_warped.png';
import boats_binary_alpha_vs_blending from '@/assets/project3/blended/boats_binary_alpha_vs_blending.png';
import boats_weight_acc from '@/assets/project3/blended/boats_weight_acc.png';
import boats_blended from '@/assets/project3/blended/boats_blended.png';
import outside_blended from '@/assets/project3/blended/outside_blended.png';
import east_asian_warped from '@/assets/project3/blended/east_asian_warped.png';

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
    { id: 'parta-3', title: 'A.3: Warp the Images', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'parta-4', title: 'A.4: Blend the Images into a Mosaic', icon: <ImageIcon className="h-4 w-4" /> },
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
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-screen">
            {/* Close button */}
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all"
              title="Close (Esc)"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Escape key hint */}
            <div className="absolute top-4 right-16 z-10 bg-black bg-opacity-50 rounded-lg px-3 py-1 text-white text-sm">
              Press <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Esc</kbd> to close
            </div>

            {/* Image container */}
            <div className="flex items-center justify-center h-full w-full">
              <img 
                src={fullscreenImage} 
                alt="Fullscreen view" 
                className="max-w-full max-h-full object-contain cursor-pointer"
                onClick={() => setFullscreenImage(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background pattern with mosaic images */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-2 md:grid-cols-3 h-full gap-2 p-4">
            
            <div className="relative overflow-hidden rounded-lg md:block hidden">
              <img 
                src={boats_blended} 
                alt="Warped images" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg md:block hidden">
              <img 
                src={a3_sign_comparison_with_zoom} 
                alt="Rectification" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg md:block hidden">
              <img 
                src={east_asian_warped} 
                alt="Weight accumulator" 
                className="w-full h-full object-cover"
              />
            </div>
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
                  
                  <div className="space-y-8 mb-6">
                    {/* Cal Sailing Club */}
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">Cal Sailing Club</h5>
                      <div className="overflow-x-auto">
                        <div className="flex gap-4 pb-4">
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_boats1)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_boats1} 
                              alt="Cal Sailing 1" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_boats2)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_boats2} 
                              alt="Cal Sailing 2" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_boats3)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_boats3} 
                              alt="Cal Sailing 3" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_boats4)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_boats4} 
                              alt="Cal Sailing 4" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* East Asian Library */}
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">East Asian Library</h5>
                      <div className="overflow-x-auto">
                        <div className="flex gap-4 pb-4">
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_east_asian_1)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_east_asian_1} 
                              alt="East Asian Library 1" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_east_asian_2)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_east_asian_2} 
                              alt="East Asian Library 2" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Berkeley Campus */}
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">Berkeley Campus</h5>
                      <div className="overflow-x-auto">
                        <div className="flex gap-4 pb-4">
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_outside1)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_outside1} 
                              alt="Berkeley Campus 1" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_outside2)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_outside2} 
                              alt="Berkeley Campus 2" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                            onClick={() => setFullscreenImage(a1_outside3)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={a1_outside3} 
                              alt="Berkeley Campus 3" 
                              className="h-64 w-auto rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                  
                  <div className="bg-white p-6 rounded-lg border mb-6 overflow-x-auto flex justify-center">
                    <img 
                      src="https://latex.codecogs.com/svg.image?\begin{bmatrix}x&y&1&0&0&0&-x'x&-x'y&-x'\\0&0&0&x&y&1&-y'x&-y'y&-y'\end{bmatrix}\begin{bmatrix}h_{11}\\h_{12}\\h_{13}\\h_{21}\\h_{22}\\h_{23}\\h_{31}\\h_{32}\\h_{33}\end{bmatrix}=0"
                      alt="Homography matrix equation" 
                      className="max-w-full h-auto"
                    />
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    These can be rearranged into a linear form and stacked to produce the overall system Ah = b, where h is the vector of homography parameters.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    For the images I took at the Cal Sailing Club, I selected the following corresponding points:
                  </p>
                  
                  <div className="space-y-6 mb-6">
                    {/* Correspondences between images 1 and 2 */}
                    <div>
                      <div 
                        className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                        onClick={() => setFullscreenImage(correspondences_1_2)}
                        title="Click to view fullscreen"
                      >
                        <img 
                          src={correspondences_1_2} 
                          alt="Correspondences between images 1 and 2" 
                          className="w-full rounded-lg shadow-md border border-gray-200"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Correspondences between images 2 and 3 */}
                    <div>
                      <div 
                        className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                        onClick={() => setFullscreenImage(correspondences_2_3)}
                        title="Click to view fullscreen"
                      >
                        <img 
                          src={correspondences_2_3} 
                          alt="Correspondences between images 2 and 3" 
                          className="w-full rounded-lg shadow-md border border-gray-200"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Correspondences between images 3 and 4 */}
                    <div>
                      <div 
                        className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                        onClick={() => setFullscreenImage(correspondences_3_4)}
                        title="Click to view fullscreen"
                      >
                        <img 
                          src={correspondences_3_4} 
                          alt="Correspondences between images 3 and 4" 
                          className="w-full rounded-lg shadow-md border border-gray-200"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    For image 1 and image 2, this resulted in this system of equations:
                  </p>
                  
                  <div className="mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 overflow-x-auto">
                      <div className="text-sm font-mono">
                        <div className="mb-3 text-gray-700 font-semibold text-center">System of equations (A | b):</div>
                        <div className="overflow-x-auto flex justify-center">
                          <table className="text-xs">
                              <thead>
                                <tr className="text-gray-600">
                                  <th className="px-2 py-1 text-right">h₁</th>
                                  <th className="px-2 py-1 text-right">h₂</th>
                                  <th className="px-2 py-1 text-right">h₃</th>
                                  <th className="px-2 py-1 text-right">h₄</th>
                                  <th className="px-2 py-1 text-right">h₅</th>
                                  <th className="px-2 py-1 text-right">h₆</th>
                                  <th className="px-2 py-1 text-right">h₇</th>
                                  <th className="px-2 py-1 text-right">h₈</th>
                                  <th className="px-2 py-1 text-center">|</th>
                                  <th className="px-2 py-1 text-right">b</th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-700">
                                <tr><td className="px-2 py-0.5 text-right">628.0</td><td className="px-2 py-0.5 text-right">575.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-506796.0</td><td className="px-2 py-0.5 text-right">-464025.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">807.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">628.0</td><td className="px-2 py-0.5 text-right">575.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-349168.0</td><td className="px-2 py-0.5 text-right">-319700.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">556.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">684.0</td><td className="px-2 py-0.5 text-right">430.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-593712.0</td><td className="px-2 py-0.5 text-right">-373240.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">868.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">684.0</td><td className="px-2 py-0.5 text-right">430.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-276336.0</td><td className="px-2 py-0.5 text-right">-173720.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">404.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">299.0</td><td className="px-2 py-0.5 text-right">609.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-138736.0</td><td className="px-2 py-0.5 text-right">-282576.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">464.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">299.0</td><td className="px-2 py-0.5 text-right">609.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-179101.0</td><td className="px-2 py-0.5 text-right">-364791.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">599.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">314.0</td><td className="px-2 py-0.5 text-right">808.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-150092.0</td><td className="px-2 py-0.5 text-right">-386224.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">478.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">314.0</td><td className="px-2 py-0.5 text-right">808.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-249002.0</td><td className="px-2 py-0.5 text-right">-640744.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">793.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">145.0</td><td className="px-2 py-0.5 text-right">782.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-46690.0</td><td className="px-2 py-0.5 text-right">-251804.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">322.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">145.0</td><td className="px-2 py-0.5 text-right">782.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-110780.0</td><td className="px-2 py-0.5 text-right">-597448.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">764.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">309.0</td><td className="px-2 py-0.5 text-right">583.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-146157.0</td><td className="px-2 py-0.5 text-right">-275759.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">473.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">309.0</td><td className="px-2 py-0.5 text-right">583.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-177057.0</td><td className="px-2 py-0.5 text-right">-334059.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">573.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">15.0</td><td className="px-2 py-0.5 text-right">706.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-3075.0</td><td className="px-2 py-0.5 text-right">-144730.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">205.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">15.0</td><td className="px-2 py-0.5 text-right">706.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-10395.0</td><td className="px-2 py-0.5 text-right">-489258.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">693.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">120.0</td><td className="px-2 py-0.5 text-right">838.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-35880.0</td><td className="px-2 py-0.5 text-right">-250562.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">299.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">120.0</td><td className="px-2 py-0.5 text-right">838.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-97920.0</td><td className="px-2 py-0.5 text-right">-683808.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">816.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">199.0</td><td className="px-2 py-0.5 text-right">290.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">-73232.0</td><td className="px-2 py-0.5 text-right">-106720.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">368.0</td></tr>
                                <tr><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">0.0</td><td className="px-2 py-0.5 text-right">199.0</td><td className="px-2 py-0.5 text-right">290.0</td><td className="px-2 py-0.5 text-right">1.0</td><td className="px-2 py-0.5 text-right">-57312.0</td><td className="px-2 py-0.5 text-right">-83520.0</td><td className="px-2 py-0.5 text-center border-l border-gray-300">|</td><td className="px-2 py-0.5 text-right">288.0</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    And finally, this recovered homography matrix:
                  </p>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <div className="mb-2 text-sm font-semibold text-gray-700">Computed Homography Matrix H:</div>
                      <div className="inline-block text-left font-mono text-sm bg-gray-50 p-4 rounded border border-gray-300">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">[</span>
                          <div className="flex flex-col">
                            <div className="flex gap-4">
                              <span className="text-right min-w-[120px]">0.8511</span>
                              <span className="text-right min-w-[120px]">0.0195</span>
                              <span className="text-right min-w-[120px]">183.1163</span>
                            </div>
                            <div className="flex gap-4">
                              <span className="text-right min-w-[120px]">-0.1231</span>
                              <span className="text-right min-w-[120px]">0.9721</span>
                              <span className="text-right min-w-[120px]">24.0005</span>
                            </div>
                            <div className="flex gap-4">
                              <span className="text-right min-w-[120px]">-0.0002</span>
                              <span className="text-right min-w-[120px]">0.0000</span>
                              <span className="text-right min-w-[120px]">1.0000</span>
                            </div>
                          </div>
                          <span className="text-2xl ml-2">]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    After solving with least squares, the resulting h vector is reshaped into a 3×3 matrix, giving me the homography that describes the projective transformation between the two images.
                  </p>
                </div>
              </div>
            </div>

            <div id="parta-3">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">A.3: Warp the Images</h3>
              
              <p className="text-gray-700 mb-4">
                With the homographies computed, the next step was to implement image warping to transform one image to match the perspective of another.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Implementation Approach</h4>
                  
                  <p className="text-gray-700 mb-3">
                    Two warping functions were implemented: nearest neighbor and bilinear interpolation. Both use <strong>inverse warping</strong>, for each output pixel, the algorithm calculates its source location in the original image using H⁻¹.
                  </p>
                  
                  <p className="text-gray-700 mb-2"><strong>Core algorithm steps:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4 ml-4">
                    <li>Transform source corners through H to determine output canvas size</li>
                    <li>Create coordinate grid for output image</li>
                    <li>Apply inverse homography (H⁻¹) to map output pixels to source locations</li>
                    <li>Sample colors using the specified interpolation method</li>
                    <li>Use alpha mask for pixels outside source bounds</li>
                  </ul>
                  
                  <h5 className="text-md font-semibold text-gray-800 mb-2">Interpolation Methods</h5>
                  
                  <div className="bg-white p-4 rounded-lg border mb-3">
                    <p className="text-gray-700 text-sm">
                      <strong>Nearest Neighbor:</strong> Rounds coordinates to the closest integer pixel and copies its value directly. This is computationally efficient but can produce blocky artifacts.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border mb-4">
                    <p className="text-gray-700 text-sm">
                      <strong>Bilinear:</strong> Samples the four surrounding pixels and computes a weighted average based on fractional coordinates. This produces smoother results at the cost of additional computation.
                    </p>
                  </div>
                  
                  <h5 className="text-md font-semibold text-gray-800 mb-2">Rectification Test</h5>
                  
                  <p className="text-gray-700 mb-3">
                    To verify the warping implementation, rectification was tested on tilted rectangular objects (MacBook, university sign). The process involved:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4 ml-4">
                    <li>Selecting four corners of the tilted object in the source image</li>
                    <li>Defining target points as a perfect rectangle with desired dimensions</li>
                    <li>Computing the homography between source and target points</li>
                    <li>Applying the homography to warp the image</li>
                  </ul>
                  
                  <div className="space-y-4 mb-4">
                    <div>
                      <h6 className="text-sm font-semibold text-gray-800 mb-2">MacBook Rectification</h6>
                      <div className="space-y-2">
                        <div 
                          className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                          onClick={() => setFullscreenImage(a3_macbook_comparison)}
                          title="Click to view fullscreen"
                        >
                          <img 
                            src={a3_macbook_comparison} 
                            alt="MacBook rectification comparison" 
                            className="w-full rounded-lg shadow-md border border-gray-200"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                          </div>
                        </div>
                        <div 
                          className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                          onClick={() => setFullscreenImage(a3_macbook_zoom)}
                          title="Click to view fullscreen"
                        >
                          <img 
                            src={a3_macbook_zoom} 
                            alt="MacBook rectification zoom" 
                            className="w-full rounded-lg shadow-md border border-gray-200"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="text-sm font-semibold text-gray-800 mb-2">University Sign Rectification</h6>
                      <div 
                        className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                        onClick={() => setFullscreenImage(a3_sign_comparison_with_zoom)}
                        title="Click to view fullscreen"
                      >
                        <img 
                          src={a3_sign_comparison_with_zoom} 
                          alt="University sign rectification comparison" 
                          className="w-full rounded-lg shadow-md border border-gray-200"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h5 className="text-md font-semibold text-gray-800 mb-2">Performance & Quality Analysis</h5>
                  
                  <div className="bg-white p-4 rounded-lg border mb-3">
                    <p className="text-gray-700 text-sm mb-2"><strong>Timing Comparison:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                      <li>Nearest Neighbor: 0.0481s</li>
                      <li>Bilinear: 0.0697s (45% slower)</li>
                    </ul>
                    <p className="text-gray-700 text-sm mt-3">
                      The performance difference stems from computational complexity. Nearest neighbor performs a single memory read per output pixel, it rounds the source coordinates and retrieves one pixel value. Bilinear interpolation, however, requires four memory reads (the 2×2 neighborhood of surrounding pixels), followed by arithmetic operations to compute weighted averages in both x and y directions. Additionally, the fractional coordinate calculations and floating-point multiplication operations add overhead. This results in approximately 4× more memory access and significantly more arithmetic operations per pixel, explaining the 45% performance difference.
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-sm font-semibold text-gray-800 mb-2">Quality Comparison</h6>
                    <div 
                      className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                      onClick={() => setFullscreenImage(a3_sign_zoomed)}
                      title="Click to view fullscreen"
                    >
                      <img 
                        src={a3_sign_zoomed} 
                        alt="Quality comparison between nearest neighbor and bilinear interpolation" 
                        className="w-full rounded-lg shadow-md border border-gray-200"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3">
                    <strong>Visual quality differences:</strong> Nearest neighbor interpolation exhibits blockiness and jagged edges due to multiple output pixels rounding to the same source pixel. Bilinear interpolation produces smoother results by blending neighboring pixel values based on fractional coordinate distances.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-gray-700 text-sm">
                      <strong>Method selection:</strong> Despite the 45% performance overhead, bilinear interpolation was selected for all subsequent operations due to its superior visual quality in the final mosaics. To be honest, both are still super fast :D.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="parta-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">A.4: Blend the Images into a Mosaic</h3>
              
              <p className="text-gray-700 mb-4">
                With the ability to warp images established, the next challenge was to combine multiple warped images into a seamless panorama. This required careful handling of overlapping regions to avoid visible seams.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Canvas Size Computation</h4>
                  
                  <p className="text-gray-700 mb-3">
                    The first step was determining the appropriate output canvas size. When images are warped with homographies, their corners can map to negative coordinates or extend beyond the original bounds. The approach taken was:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4 ml-4">
                    <li>Transform all corners of all images through their respective homographies</li>
                    <li>Compute the min/max x and y coordinates to establish the bounding box</li>
                    <li>Create a translation matrix to shift all coordinates to positive values starting at (0, 0)</li>
                    <li>Compose this translation with each homography to get the final transformations</li>
                  </ul>
                  
                  <p className="text-gray-700 mb-4">
                    This ensures the output canvas accommodates all warped images without clipping.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Blending Strategy</h4>
                  
                  <p className="text-gray-700 mb-3">
                    In overlapping regions, multiple images contribute pixel values to the same output location. A naive approach of selecting one image or simple averaging produces visible seams due to alignment errors and color mismatches.
                  </p>
                  
                  <p className="text-gray-700 mb-3">
                    Two blending approaches were implemented and compared:
                  </p>
                  
                  <div className="space-y-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-gray-700 mb-2"><strong>Binary Alpha Blending:</strong></p>
                      <p className="text-gray-700 text-sm">
                        Each pixel has a binary alpha value: α = 1 if within the image bounds, α = 0 otherwise. The final pixel value is computed as a weighted average based on these alpha values. This approach is simple but creates visible seams due to abrupt transitions between images.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-gray-700 mb-2"><strong>Distance Transform Blending:</strong></p>
                      <p className="text-gray-700 text-sm">
                        Instead of binary alpha values, the distance transform is applied to each image's mask to create smooth alpha gradients. Pixels near the image center receive higher weights, while edge pixels receive lower weights. This creates a feathering effect that produces smooth transitions in overlapping regions.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The distance transform computes the Euclidean distance from each pixel to the nearest boundary, then normalizes these values to create smooth alpha gradients that fade from 1.0 at the center to 0.0 at the edges.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Results and Analysis</h4>
                  
                  <div className="space-y-6">
                    {/* Cal Sailing Club Results */}
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">Cal Sailing Club Panorama</h5>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Warped images before blending:</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(boats_warped)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={boats_warped} 
                              alt="Cal Sailing Club warped images" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Weight accumulator visualization:</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(boats_weight_acc)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={boats_weight_acc} 
                              alt="Weight accumulator visualization" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Alpha mask comparison - binary vs smooth:</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(boats_binary_alpha_vs_blending)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={boats_binary_alpha_vs_blending} 
                              alt="Binary alpha vs distance transform blending comparison" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Final blended panorama:</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(boats_blended)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={boats_blended} 
                              alt="Cal Sailing Club final blended panorama" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                        <p className="text-gray-700 text-sm">
                          The comparison demonstrates a significant quality difference. Binary alpha blending exhibits clear seam lines with visible color shifts and alignment errors at image boundaries. Distance transform blending effectively eliminates these artifacts, producing smooth transitions that are imperceptible in the final result.
                        </p>
                      </div>
                    </div>
                    
                    {/* Other Image Results */}
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">Berkeley Campus Panorama</h5>
                      
                      <div className="space-y-3">
                        <div className="overflow-x-auto">
                          <p className="text-sm text-gray-600 mb-2">Original images:</p>
                          <div className="flex gap-4 pb-4">
                            <div 
                              className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                              onClick={() => setFullscreenImage(a1_outside1)}
                              title="Click to view fullscreen"
                            >
                              <img 
                                src={a1_outside1} 
                                alt="Berkeley Campus 1" 
                                className="h-48 w-auto rounded-lg shadow-md"
                              />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                              </div>
                            </div>
                            <div 
                              className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                              onClick={() => setFullscreenImage(a1_outside2)}
                              title="Click to view fullscreen"
                            >
                              <img 
                                src={a1_outside2} 
                                alt="Berkeley Campus 2" 
                                className="h-48 w-auto rounded-lg shadow-md"
                              />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                              </div>
                            </div>
                            <div 
                              className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                              onClick={() => setFullscreenImage(a1_outside3)}
                              title="Click to view fullscreen"
                            >
                              <img 
                                src={a1_outside3} 
                                alt="Berkeley Campus 3" 
                                className="h-48 w-auto rounded-lg shadow-md"
                              />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Final blended panorama:</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(outside_blended)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={outside_blended} 
                              alt="Berkeley Campus final blended panorama" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4">
                        Note: Some artifacts are visible in the panorama because people in the background were moving between shots (for example, the kid with the scooter appears multiple times).
                    </p>
                    
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">East Asian Library Panorama</h5>
                      
                      <div className="space-y-3">
                        <div className="overflow-x-auto">
                          <p className="text-sm text-gray-600 mb-2">Original images:</p>
                          <div className="flex gap-4 pb-4">
                            <div 
                              className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                              onClick={() => setFullscreenImage(a1_east_asian_1)}
                              title="Click to view fullscreen"
                            >
                              <img 
                                src={a1_east_asian_1} 
                                alt="East Asian Library 1" 
                                className="h-48 w-auto rounded-lg shadow-md"
                              />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                              </div>
                            </div>
                            <div 
                              className="cursor-pointer hover:opacity-80 transition-opacity group flex-shrink-0 relative"
                              onClick={() => setFullscreenImage(a1_east_asian_2)}
                              title="Click to view fullscreen"
                            >
                              <img 
                                src={a1_east_asian_2} 
                                alt="East Asian Library 2" 
                                className="h-48 w-auto rounded-lg shadow-md"
                              />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Warped and blended result:</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(east_asian_warped)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={east_asian_warped} 
                              alt="East Asian Library final panorama" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                    <p className="text-gray-700 text-sm mb-2"><strong>Effectiveness of Distance Transform Blending:</strong></p>
                    <p className="text-gray-700 text-sm">
                      Alignment errors and color mismatches are most pronounced at image boundaries. The distance transform approach naturally downweights these problematic edge regions while emphasizing the more reliable center portions of each image. This produces final mosaics that maintain visual continuity and appear as unified photographs rather than composite images.
                    </p>
                  </div>
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
