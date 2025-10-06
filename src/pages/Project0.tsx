import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AssignmentSection } from '@/components/AssignmentSectionNew';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SocialLinks } from '@/components/SocialLinks';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Camera, Users, Building, Clapperboard, Home, Eye } from 'lucide-react';
import mountainHero from '@/assets/mountain-hero.jpg';
import bearIcon from '@/assets/bear-icon.png';
//import images 
import distorted from '@/assets/distorted.jpeg';
import zoomed from '@/assets/zoomed.jpeg';
import ex2_1_no_zoom from '@/assets/ex2_1_no_zoom.jpeg';
import ex2_1_zoom from '@/assets/ex2_1_zoom.jpeg';
import ex2_2_no_zoom from '@/assets/ex2_2_no_zoom.jpeg';
import ex2_2_zoom from '@/assets/ex2_2_zoom.jpeg';
import ex3 from '@/assets/ex3.gif';
import ex3_2 from '@/assets/ex3_2.gif';

const Project0 = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navigationItems = [
    { id: 'overview', title: 'Overview', icon: <Eye className="h-4 w-4" /> },
    { id: 'part1', title: 'Part 1: Selfie', icon: <Users className="h-4 w-4" /> },
    { id: 'part2', title: 'Part 2: Architecture', icon: <Building className="h-4 w-4" /> },
    { id: 'part3', title: 'Part 3: Dolly Zoom', icon: <Clapperboard className="h-4 w-4" /> },
  ];

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              {activeSection && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-nav-green rounded-full animate-pulse"></div>
                  <span>Currently: <span className="text-nav-green font-medium">{activeSection}</span></span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <img src={bearIcon} alt="Bear" className="h-8 w-8" />
                <span className="text-lg font-bold text-nav-green">Project 0</span>
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
        {activeSection && (
          <div className="px-3 py-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-full">
            <div className="text-xs text-muted-foreground">
              {activeSection}
            </div>
          </div>
        )}
      </div>

      {/* Side Navigation */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
        <div className="w-56 space-y-1">
          {navigationItems.map((item) => {
            const isMainSection = ['overview', 'part1', 'part2', 'part3'].includes(item.id);
            const isActiveSection = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 ${
                  isActiveSection
                    ? 'text-nav-green font-medium'
                    : 'text-muted-foreground hover:text-nav-green'
                }`}
              >
                <span className={`${isActiveSection ? 'relative' : ''}`}>
                  {item.title}
                  {isActiveSection && (
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-nav-green rounded-full" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 opacity-25">
          <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="relative">
              <img src={distorted} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={zoomed} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden md:block">
              <img src={ex2_1_zoom} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Becoming Friends with Your Camera
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              A Photography Journey Through Kings Canyon National Park
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Assignment Overview */}
      <section id="overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Assignment Overview</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              In this class, we want you to become friends with every pixel. The first step toward this goal 
              is to become friends with your camera—e.g., the one in your smartphone. The goal of this project 
              is to get you some intuitive understanding of the somewhat subtle relationship between perspective, 
              focal length/zoom, and the center of projection.
            </p>
          </div>
        </div>
      </section>

      {/* Part 1: Selfie */}
      <section id="part1" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-8 w-8 text-nav-green" />
              <h2 className="text-3xl font-bold text-gray-900">Part 1</h2>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Selfie: The Wrong Way vs. The Right Way</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              The close-up selfie appears distorted because of perspective distortion, when the camera is too close, facial features nearest to the lens (like the nose) appear disproportionately large compared to features further away (like the ears). This creates an unflattering, warped appearance. The zoomed portrait looks much better because stepping back and using zoom maintains proper facial proportions. The longer focal length compresses the depth, making all facial features appear more naturally sized relative to each other.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <img 
                src={distorted} 
                alt="Close-up Portrait (No Zoom)" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-600">Close-up Portrait (No Zoom)</p>
            </div>
            <div className="space-y-2">
              <img 
                src={zoomed} 
                alt="Zoomed Portrait (With Zoom)" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-600">Zoomed Portrait (With Zoom)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Architectural Perspective */}
      <section id="part2" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Building className="h-8 w-8 text-nav-green" />
              <h2 className="text-3xl font-bold text-gray-900">Part 2</h2>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Architectural Perspective Compression</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              The zoomed photo appears flattened or compressed because longer focal lengths compress the perception of depth. When you zoom in from a distance, the telephoto effect makes objects at different distances appear closer together. This compression effect minimizes the apparent size differences between foreground and background elements, creating a 'stacked' appearance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <img 
                src={ex2_1_no_zoom} 
                alt="No Zoom" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-600">No Zoom</p>
            </div>
            <div className="space-y-2">
              <img 
                src={ex2_1_zoom} 
                alt="Zoomed (Compressed)" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-600">Zoomed (Compressed)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <img 
                src={ex2_2_no_zoom} 
                alt="No Zoom" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-600">No Zoom</p>
            </div>
            <div className="space-y-2">
              <img 
                src={ex2_2_zoom} 
                alt="Zoomed (Compressed)" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-600">Zoomed (Compressed)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Dolly Zoom */}
      <section id="part3" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Clapperboard className="h-8 w-8 text-nav-green" />
              <h2 className="text-3xl font-bold text-gray-900">Part 3</h2>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">The Dolly Zoom (Vertigo Effect)</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              The dolly zoom creates a disorienting 'vertigo' effect by simultaneously moving the camera backward while zooming in (or forward while zooming out). This technique keeps the main subject the same size in frame while dramatically changing the background perspective. As this gives a nice visual effect that is unusual to the human eye, it is used in many movies e.g. to create a sense of disorientation and confusion.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <img 
                src={ex3} 
                alt="Dolly Zoom Effect (Vertigo Effect) - Example 1" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-600">Dolly Zoom Effect - Example 1</p>
            </div>
            <div className="space-y-2">
              <img 
                src={ex3_2} 
                alt="Dolly Zoom Effect (Vertigo Effect) - Example 2" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-600">Dolly Zoom Effect - Example 2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={bearIcon} alt="Bear" className="h-8 w-8 opacity-80" />
            <h3 className="text-xl font-semibold">CS180 Assignment 0</h3>
          </div>
          <p className="text-primary-foreground/80 mb-6">
            Capturing the beauty of perspective and focal length in nature's grandest classroom
          </p>
          <SocialLinks className="justify-center" iconSize={24} />
        </div>
      </footer>
    </div>
  );
};

export default Project0;
