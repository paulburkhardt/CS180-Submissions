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

// Part B images
import harris_anms from '@/assets/project3/3b.1_harris_anms.png';
import features from '@/assets/project3/3b.2_features.png';
import feature_locations from '@/assets/project3/3b.2_feature_locations.png';
import correspondences from '@/assets/project3/3b.3_correspondences.png';
import ransac_example from '@/assets/project3/3b.4_RANSAC example.png';
import boats_auto_stitched from '@/assets/project3/3b.4_boats_auto_stitched.png';
import outside_auto_stitched from '@/assets/project3/3b.4_outside_auto_stitched.png';
import east_asian_auto_stitched from '@/assets/project3/3b.4_east_asian_auto_stitched.png';

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
    { id: 'partb', title: 'Part B: Feature Matching for Autostitching', icon: <Zap className="h-4 w-4" /> },
    { id: 'partb-1', title: 'B.1: Harris Corner Detection', icon: <Grid className="h-4 w-4" /> },
    { id: 'partb-2', title: 'B.2: Feature Descriptor Extraction', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'partb-3', title: 'B.3: Feature Matching', icon: <Zap className="h-4 w-4" /> },
    { id: 'partb-4', title: 'B.4: RANSAC for Robust Homography', icon: <Sparkles className="h-4 w-4" /> },
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

      {/* Part B: Feature Matching for Autostitching */}
      <section id="partb" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part B: Feature Matching for Autostitching</h2>
          
          <div className="space-y-12">
            <div>
              <p className="text-gray-700 mb-4">
                While Part A demonstrated image mosaicing using manually selected correspondence points, Part B focuses on automating this process. The goal is to detect and match feature points automatically, eliminating the need for manual point selection and making the mosaicing pipeline fully automatic.
              </p>
              
              <p className="text-gray-700 mb-4">
                The implementation follows the approach described in <a href="https://cal-cs180.github.io/fa25/hw/proj3/Papers/MOPS.pdf" target="_blank" rel="noopener noreferrer" className="text-nav-green hover:underline font-medium">"Multi-Image Matching using Multi-Scale Oriented Patches"</a> by Brown et al. (with several simplifications).
              </p>
            </div>

            <div id="partb-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">B.1: Harris Corner Detection</h3>
              
              <p className="text-gray-700 mb-4">
                The first step in automatic feature matching is identifying distinctive points in the images. Harris corner detection (Section 2 of the paper) is a widely-used algorithm that identifies corner features, regions where the image has significant intensity variation in multiple directions.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">How Harris Corner Detection Works</h4>
                  
                  <p className="text-gray-700 mb-4">
                    The implementation uses scikit-image's <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">corner_harris</code> function with the 'eps' method and sigma=1 for Gaussian smoothing. This computes a corner response map where high values indicate potential corner locations.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    The algorithm works by analyzing local image gradients to determine corner strength. At a high level:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Compute image gradients:</strong> Calculate I<sub>x</sub> and I<sub>y</sub> in the x and y directions</li>
                      <li><strong>Build the structure tensor:</strong> For each pixel, compute the matrix M from I<sub>x</sub>², I<sub>x</sub>I<sub>y</sub>, and I<sub>y</sub>²</li>
                      <li><strong>Calculate corner response:</strong> The 'eps' method uses the harmonic mean of eigenvalues to compute the response</li>
                      <li><strong>Extract local maxima:</strong> Use <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">peak_local_max</code> to find corner locations with min_distance spacing</li>
                      <li><strong>Filter edge regions:</strong> Discard corners within edge_discard pixels of image boundaries</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The corner response is high when both eigenvalues of M are large (indicating variation in multiple directions), which corresponds to corner-like structures. Edges produce only one large eigenvalue, while flat regions produce small eigenvalues in all directions.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">The Distribution Problem</h4>
                  
                  <p className="text-gray-700 mb-4">
                    Harris corner detection often produces thousands of corner points, but they are not well-distributed across the image. Points tend to cluster in high-texture regions (like building corners or text) while leaving large empty areas in uniform regions (like sky or smooth surfaces).
                  </p>
                  
                  
                  
                  <p className="text-gray-700 mb-4">
                    What we need is a smaller set of well-distributed corners that cover the entire image more uniformly while maintaining the strongest, most distinctive features.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Adaptive Non-Maximal Suppression (ANMS, Section 3)</h4>
                  
                  <p className="text-gray-700 mb-4">
                    ANMS solves the distribution problem by selecting a subset of corners that are both strong (high corner response) and spatially well-distributed. The key insight is to keep only corners that are local maxima within a certain radius.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    For each corner point, ANMS computes its <em>suppression radius</em>: the minimum distance to a significantly stronger corner. Corners with larger suppression radii are isolated strong features, while corners with small radii are near stronger corners and can be suppressed.
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <p className="text-gray-700 mb-3"><strong>ANMS Algorithm:</strong></p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                      <li>For each corner i with strength f<sub>i</sub>, compute the distance to every other corner j</li>
                      <li>Find the minimum distance to a corner j where f<sub>j</sub> &gt; c·f<sub>i</sub> (typically c = 0.9)</li>
                      <li>This minimum distance becomes the suppression radius r<sub>i</sub> for corner i</li>
                      <li>Sort corners by their suppression radius in descending order</li>
                      <li>Keep the top N corners with the largest suppression radii</li>
                    </ol>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This approach naturally distributes features across the image because corners in dense regions have small suppression radii and are filtered out, while isolated corners in sparser regions have large radii and are retained.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Implementation Details</h4>
                  
                  <p className="text-gray-700 mb-4">
                    The Harris corner detection pipeline uses the following parameters (increased from default values for better results):
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>edge_discard=50:</strong> Filters out corners within 50 pixels of image boundaries (increased from 20). Edge regions are prone to artifacts during warping and often lack sufficient context for reliable matching.</li>
                      <li><strong>min_distance=10:</strong> Enforces a minimum separation of 10 pixels between corners in <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">peak_local_max</code> (increased from 1). This provides initial spatial distribution before ANMS is applied.</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    After extracting Harris corners with these parameters, ANMS is applied to further reduce the set to 500 well-distributed points. Down here you can see the results before and after applying ANMS:
                  </p>
                  
                  <div className="mb-6">
                    <div 
                      className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                      onClick={() => setFullscreenImage(harris_anms)}
                      title="Click to view fullscreen"
                    >
                      <img 
                        src={harris_anms} 
                        alt="Harris corner detection before and after ANMS" 
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

            <div id="partb-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">B.2: Feature Descriptor Extraction</h3>
              
              <p className="text-gray-700 mb-4">
                With corner locations identified, the next step is to create distinctive feature descriptors for each point (Section 4 of the paper). The goal is to obtain stable representations that are robust to changes in illumination and minor geometric variations, enabling reliable matching between images.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Descriptor Extraction Process</h4>
                  
                  <p className="text-gray-700 mb-4">
                    For each corner point, a feature descriptor is computed from the local image region. The implementation extracts descriptors through the following pipeline:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ol className="space-y-2 text-gray-700 list-decimal list-inside ml-4">
                      <li><strong>Extract local window:</strong> For each corner point, extract a 40×40 pixel window centered at the point</li>
                      <li><strong>Boundary checking:</strong> Skip points too close to image edges where the full window doesn't fit</li>
                      <li><strong>Downsample to 8×8:</strong> Sample the 40×40 window at regular intervals to create an 8×8 descriptor grid</li>
                      <li><strong>Normalize:</strong> Subtract the mean and divide by standard deviation to achieve illumination invariance</li>
                      <li><strong>Flatten:</strong> Convert the 8×8 grid into a 64-dimensional feature vector</li>
                    </ol>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The 40×40 window provides sufficient context around each corner, while the 8×8 downsampling creates a compact descriptor that captures local structure without excessive detail. The normalization step is crucial,by standardizing each descriptor to have zero mean and unit variance, the representation becomes invariant to linear brightness and contrast changes.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <p className="text-gray-700 text-sm">
                      <strong>Why this approach works:</strong> The descriptor captures local intensity patterns in a scale-reduced form. Normalization ensures that two patches with similar structure but different lighting will produce similar descriptor vectors, making matching across images more robust.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Visualizing Feature Descriptors</h4>
                  
                  <p className="text-gray-700 mb-4">
                    Below you can see 10 example feature descriptors extracted from an image. Each descriptor is an 8×8 grid representing the local intensity pattern around a corner point:
                  </p>
                  
                  <div className="mb-6">
                    <div 
                      className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                      onClick={() => setFullscreenImage(features)}
                      title="Click to view fullscreen"
                    >
                      <img 
                        src={features} 
                        alt="Example feature descriptors" 
                        className="w-full rounded-lg shadow-md border border-gray-200"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    And here are the locations of these features in the source image:
                  </p>
                  
                  <div className="mb-6">
                    <div 
                      className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                      onClick={() => setFullscreenImage(feature_locations)}
                      title="Click to view fullscreen"
                    >
                      <img 
                        src={feature_locations} 
                        alt="Feature descriptor locations in image" 
                        className="w-full rounded-lg shadow-md border border-gray-200"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-gray-700 text-sm">
                      Each descriptor captures distinctive local patterns - edges, corners, and texture - that can be reliably matched across different images. The normalized 8×8 representation provides a good balance between discriminative power and computational efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="partb-3">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">B.3: Feature Matching</h3>
              
              <p className="text-gray-700 mb-4">
                With feature descriptors extracted from both images, the next step is to establish correspondences between them. The goal is to match features that represent the same physical location in the scene, even though they appear in different images with different perspectives.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Lowe's Ratio Test (Section 5)</h4>
                  
                  <p className="text-gray-700 mb-4">
                    A naive approach would be to match each feature in image 1 to its nearest neighbor in image 2 based on descriptor distance. However, this produces many false matches when features are ambiguous or repetitive (like uniform textures or repeating patterns).
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    Lowe's ratio test provides a robust solution by considering not just the nearest neighbor, but also the second-nearest neighbor. The implementation works as follows:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ol className="space-y-2 text-gray-700 list-decimal list-inside ml-4">
                      <li><strong>Compute pairwise distances:</strong> Calculate Euclidean distances between all descriptor pairs from both images</li>
                      <li><strong>Find two nearest neighbors:</strong> For each feature in image 1, identify its closest and second-closest matches in image 2</li>
                      <li><strong>Apply ratio test:</strong> Accept the match only if distance_1nn / distance_2nn &lt; threshold</li>
                      <li><strong>Filter ambiguous matches:</strong> Features with similar distances to multiple neighbors are rejected</li>
                    </ol>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The key insight is that good matches have a significantly closer nearest neighbor compared to the second-nearest neighbor. If both neighbors are similarly close, the match is ambiguous and likely incorrect.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Ratio Threshold Selection:</strong> The ratio threshold controls the trade-off between match quantity and quality. A lower threshold accepts fewer but more reliable matches, while a higher threshold accepts more matches but with increased false positives.
                    </p>
                    <p className="text-gray-700 text-sm">
                      For this exercise, I used a threshold of <strong>0.76</strong>, extracted from Figure 6b in the paper. This value provides a good balance between obtaining sufficient correspondences for robust homography estimation while maintaining high match accuracy.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Matching Results</h4>
                  
                  <p className="text-gray-700 mb-4">
                    Below you can see the matched keypoints between images 1 and 2 of the boat scene. Lines connect corresponding features that passed the ratio test:
                  </p>
                  
                  <div className="mb-6">
                    <div 
                      className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                      onClick={() => setFullscreenImage(correspondences)}
                      title="Click to view fullscreen"
                    >
                      <img 
                        src={correspondences} 
                        alt="Matched features between boat images" 
                        className="w-full rounded-lg shadow-md border border-gray-200"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-gray-700 text-sm">
                      The matched features demonstrate strong spatial consistency and correctly identify corresponding points between the overlapping regions. These reliable correspondences will serve as input for automatic homography estimation in the next step, replacing the manual point selection from Part A.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="partb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">B.4: RANSAC for Robust Homography Estimation</h3>
              
              <p className="text-gray-700 mb-4">
                While Lowe's ratio test filters out many ambiguous matches, some incorrect correspondences inevitably remain. Computing a homography using all matched points would be highly sensitive to these outliers, potentially resulting in poor alignment. RANSAC (RANdom SAmple Consensus) provides a robust solution for estimating the homography in the presence of outliers.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Why RANSAC?</h4>
                  
                  <p className="text-gray-700 mb-4">
                    Traditional least-squares methods assume all data points are valid measurements corrupted only by noise. However, in feature matching, we often have:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Outliers:</strong> False matches that don't correspond to the same physical point</li>
                      <li><strong>Repetitive structures:</strong> Similar-looking features that create incorrect correspondences</li>
                      <li><strong>Occlusions:</strong> Objects that appear in one image but not the other</li>
                      <li><strong>Moving objects:</strong> Elements that moved between captures</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    RANSAC is specifically designed to work with datasets containing a significant proportion of outliers. Instead of trying to fit all points, it iteratively finds the largest subset of points (inliers) that agree with a particular model.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">How RANSAC Works</h4>
                  
                  <p className="text-gray-700 mb-4">
                    The RANSAC algorithm for homography estimation follows this iterative process:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ol className="space-y-2 text-gray-700 list-decimal list-inside ml-4">
                      <li><strong>Random sampling:</strong> Randomly select 4 matched point pairs (minimum needed for homography)</li>
                      <li><strong>Model fitting:</strong> Compute a candidate homography from these 4 pairs</li>
                      <li><strong>Consensus evaluation:</strong> Transform all points using the candidate homography and measure error</li>
                      <li><strong>Inlier counting:</strong> Count points with error below threshold as inliers</li>
                      <li><strong>Best model selection:</strong> Keep the model with the most inliers</li>
                      <li><strong>Repeat:</strong> Iterate for a fixed number of iterations (e.g., 2000)</li>
                      <li><strong>Refinement:</strong> Recompute homography using all inliers from the best model</li>
                    </ol>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The key insight is that correct matches (inliers) will consistently agree with the true homography, while outliers will produce random errors. By trying many random subsets, RANSAC finds the homography that best explains the largest set of correspondences.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <p className="text-gray-700 text-sm">
                      <strong>4-Point RANSAC:</strong> This implementation uses 4-point RANSAC, meaning each iteration samples exactly 4 correspondence pairs to compute a candidate homography. Since a homography has 8 degrees of freedom and each point pair provides 2 constraints, 4 points give us the minimum required to solve for H uniquely.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Visualizing RANSAC: Inliers vs Outliers</h4>
                  
                  <p className="text-gray-700 mb-4">
                    To test RANSAC, I ran it on the boat images with 2000 iterations and a threshold of 10.0 pixels. Below you can see the distinction between inliers (green) and outliers (red), and then just the inliers that form the consensus set:
                  </p>
                  
                  <div className="mb-6">
                    <div 
                      className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                      onClick={() => setFullscreenImage(ransac_example)}
                      title="Click to view fullscreen"
                    >
                      <img 
                        src={ransac_example} 
                        alt="RANSAC inliers vs outliers visualization" 
                        className="w-full rounded-lg shadow-md border border-gray-200"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The visualization clearly shows how RANSAC filters out incorrect matches. Inliers exhibit consistent geometric relationships and form coherent correspondence patterns, while outliers show random, inconsistent alignments. The robust homography computed from inliers only produces much better alignment than using all matches.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Automatic Mosaicing Results</h4>
                  
                  <p className="text-gray-700 mb-4">
                    With RANSAC-estimated homographies, I created automatic mosaics for all three image sets. Different parameter values were used for each scene to optimize results:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <strong>Boats:</strong> ratio_threshold=0.67, num_points=500, c_robust=0.9
                      </div>
                      <div>
                        <strong>Outside & East Asian:</strong> ratio_threshold=0.8, num_points=1000, c_robust=0.8
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <p className="text-gray-700 text-sm">
                      <strong>Why different parameters?</strong> My hypothesis is that the boat scene likely had stronger, more distinctive features that allowed for a more stringent ratio threshold (0.67) with fewer points (500). In contrast, the outdoor and library scenes probably contained more uniform regions and repetitive patterns, which may have required more matches (1000 points) and a more permissive ratio threshold (0.8) to gather sufficient correspondences for reliable homography estimation.
                    </p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Below are side-by-side comparisons of manual mosaics (Part A) versus automatic mosaics (Part B):
                  </p>
                  
                  <div className="space-y-8 mb-6">
                    {/* Boats Comparison */}
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">Cal Sailing Club</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2 text-center">Manual Mosaic (Part A)</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(boats_blended)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={boats_blended} 
                              alt="Boats manual mosaic" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2 text-center">Automatic Mosaic (Part B)</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(boats_auto_stitched)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={boats_auto_stitched} 
                              alt="Boats automatic mosaic" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Outside Comparison */}
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">Berkeley Campus</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2 text-center">Manual Mosaic (Part A)</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(outside_blended)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={outside_blended} 
                              alt="Outside manual mosaic" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2 text-center">Automatic Mosaic (Part B)</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(outside_auto_stitched)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={outside_auto_stitched} 
                              alt="Outside automatic mosaic" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* East Asian Comparison */}
                    <div>
                      <h5 className="text-md font-semibold text-gray-800 mb-3">East Asian Library</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2 text-center">Manual Mosaic (Part A)</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(east_asian_warped)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={east_asian_warped} 
                              alt="East Asian manual mosaic" 
                              className="w-full rounded-lg shadow-md border border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2 text-center">Automatic Mosaic (Part B)</p>
                          <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity group relative"
                            onClick={() => setFullscreenImage(east_asian_auto_stitched)}
                            title="Click to view fullscreen"
                          >
                            <img 
                              src={east_asian_auto_stitched} 
                              alt="East Asian automatic mosaic" 
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
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-gray-700 text-sm mb-2"><strong>Automatic vs Manual Results:</strong></p>
                    <p className="text-gray-700 text-sm">
                      The automatic mosaics achieve comparable quality to the manually-aligned versions, demonstrating that the full pipeline, from corner detection through RANSAC, successfully automates the entire mosaicing process. The automatic approach eliminates tedious manual point selection while maintaining robust alignment even in the presence of outliers and challenging scene conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project 3 Takeaways</h3>
              
              <div className="max-w-3xl mx-auto">
                <div className="space-y-4 text-gray-700">
                  <p>• <strong>Projective transformations (homographies)</strong> are 3×3 matrices with 8 degrees of freedom that can warp images to account for perspective changes, essential for mosaicing when images are taken from the same center of projection but at different angles</p>
                  
                  <p>• <strong>Homography recovery</strong> requires at least 4 correspondence point pairs (8 constraints for 8 degrees of freedom), but oversampling and using least-squares provides more robust solutions that account for noise and imperfect point selections</p>
                  
                  <p>• <strong>Inverse warping</strong> is the key to image warping: for each output pixel, we compute its source location using H⁻¹, preventing holes in the output that would occur with forward warping</p>
                  
                  <p>• <strong>Bilinear interpolation</strong> produces smoother warped images than nearest neighbor by blending four neighboring pixels based on fractional coordinate distances, though it's 4-5× slower due to additional computations</p>
                  
                  <p>• <strong>Distance transform blending</strong> creates seamless mosaics by computing Euclidean distances from each pixel to the nearest boundary and using these as alpha weights, smoothly transitioning between images in overlapping regions</p>
                  
                  <p>• <strong>Harris corner detection</strong> identifies distinctive feature points by analyzing local image gradients to find regions with intensity variation in multiple directions, enabling automatic feature matching without manual point selection</p>
                  
                  <p>• <strong>Adaptive Non-Maximal Suppression (ANMS)</strong> ensures features are well-distributed across the image rather than clustered, which is crucial for robust homography estimation as clustered features provide insufficient geometric constraints</p>
                  
                  <p>• <strong>Feature descriptors</strong> (40×40 windows downsampled to 8×8 and normalized) capture local image structure in a way that's robust to lighting changes, enabling reliable matching between images with different perspectives</p>
                  
                  <p>• <strong>Lowe's ratio test</strong> filters ambiguous matches by rejecting features where the nearest and second-nearest neighbors have similar distances, trading quantity for quality by keeping only distinctive, unambiguous correspondences</p>
                  
                  <p>• <strong>RANSAC</strong> robustly estimates homographies by embracing outliers rather than trying to eliminate them beforehand, repeatedly sampling minimal sets and selecting the model with most inliers, remaining effective even when 30-40% of matches are incorrect</p>
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
