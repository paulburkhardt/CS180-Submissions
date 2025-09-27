import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SocialLinks } from '@/components/SocialLinks';
import { AssignmentSection } from '@/components/AssignmentSectionNew';
import { 
  Filter, 
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
import cameraman12 from '@/assets/project2/1.2_cameraman.png';
import convolutions11 from '@/assets/project2/1.1_convolutions.png';
import boxFilterApplied11 from '@/assets/project2/1.1_box_filter_applied.png';
import boxFilter9x9 from '@/assets/project2/1.1_9x9_box_filter.png';
import gaussianFilter13 from '@/assets/project2/1.3_gaussian_filter.jpg';
import blurredBinGradMag13 from '@/assets/project2/1.3_blurred_bin_grad_mag.png';
import dogFilter13 from '@/assets/project2/1.3_DoG_filter.png';
import dogComparison13 from '@/assets/project2/1.3_DoG_comaprison.png';
import unsharpFilters21 from '@/assets/project2/2.1_unsharp_and_other_filters.png';
import tajUnsharp21 from '@/assets/project2/2.1_taj_unsharp.png';
import treesUnsharp21 from '@/assets/project2/2.1_trees_unsharp.png';
import blurSharpen21 from '@/assets/project2/2.1_blur_and_sharpen.png';
import oldYoungComp22 from '@/assets/project2/2.2_old_young_comp.png';
import fourierYoungOld22 from '@/assets/project2/2.2_fourrier_young_old.png';
import oldYoung22 from '@/assets/project2/2.2_old_young.png';
import derekCat22 from '@/assets/project2/2.2_derek_cat.png';
import dogDude22 from '@/assets/project2/2.2_dog_dude.png';
import twoLions22 from '@/assets/project2/2.2_two_lions.png';
import stacks23 from '@/assets/project2/2.3_stacks.png';
import myOrapple24 from '@/assets/project2/2.4_my_orapple.png';
import verticalSurfboard24 from '@/assets/project2/2.4_vertical_surfboard.png';
import horizontalSurfboard24 from '@/assets/project2/2.4_horizontal_surfboard.png';
import watermelonMouth24 from '@/assets/project2/2.4_watermelonwithmouth.png';

const Project2 = () => {
  const [activeSection, setActiveSection] = useState('');
  const [activeSubsection, setActiveSubsection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [showGaussianWidget, setShowGaussianWidget] = useState(true);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

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

  // Gaussian widget functionality
  useEffect(() => {
    if (!showGaussianWidget) return;

    const updateGaussianVisualization = () => {
      const sigmaSlider = document.getElementById('gaussianSigmaSlider') as HTMLInputElement;
      const kSlider = document.getElementById('gaussianKSlider') as HTMLInputElement;
      if (!sigmaSlider || !kSlider) return;

      const sigma = parseFloat(sigmaSlider.value);
      let kernelSize = parseInt(kSlider.value);
      
      // Ensure kernel size is always odd
      if (kernelSize % 2 === 0) {
        kernelSize += 1;
        kSlider.value = kernelSize.toString();
      }
      
      // Calculate actual sigma coverage based on kernel size
      const sigmaCoverage = (kernelSize - 1) / 2 / sigma;
      
      // Calculate percentage coverage using error function approximation
      const calculateCoverage = (sigmas: number) => {
        // Using approximation: erf(x) ≈ 1 - exp(-1.26 * x^1.4) for coverage calculation
        // Coverage = erf(sigmas/√2) * 100
        const erfApprox = 1 - Math.exp(-1.26 * Math.pow(sigmas / Math.sqrt(2), 1.4));
        return Math.min(99.9, Math.max(0, erfApprox * 100));
      };
      
      const percentageCoverage = calculateCoverage(sigmaCoverage);
      
      // Update formula display
      const formulaDisplayEl = document.getElementById('gaussianFormulaDisplay');
      const formulaExplanationEl = document.getElementById('gaussianFormulaExplanation');
      
      if (Math.abs(kernelSize - (6 * sigma + 1)) < 0.1) {
        if (formulaDisplayEl) formulaDisplayEl.textContent = 'k = 6σ + 1';
        if (formulaExplanationEl) formulaExplanationEl.textContent = 'Standard formula (3σ coverage)';
      } else {
        if (formulaDisplayEl) formulaDisplayEl.textContent = `k = ${kernelSize}`;
        if (formulaExplanationEl) formulaExplanationEl.textContent = `Custom kernel size (${sigmaCoverage.toFixed(1)}σ coverage)`;
      }
      
      // Update display values
      const sigmaValueEl = document.getElementById('gaussianSigmaValue');
      const kValueEl = document.getElementById('gaussianKValue');
      const currentSigmaEl = document.getElementById('gaussianCurrentSigma');
      const kernelSizeEl = document.getElementById('gaussianKernelSize');
      const sigmaCoverageEl = document.getElementById('gaussianSigmaCoverage');
      const coverageEl = document.getElementById('gaussianCoverage');
      
      if (sigmaValueEl) sigmaValueEl.textContent = `σ = ${sigma.toFixed(1)}`;
      if (kValueEl) kValueEl.textContent = `k = ${kernelSize}`;
      if (currentSigmaEl) currentSigmaEl.textContent = sigma.toFixed(1);
      if (kernelSizeEl) kernelSizeEl.textContent = kernelSize.toString();
      if (sigmaCoverageEl) sigmaCoverageEl.textContent = sigmaCoverage.toFixed(1);
      if (coverageEl) coverageEl.textContent = `${percentageCoverage.toFixed(1)}%`;
      
      // Update canvas
      const canvas = document.getElementById('gaussianCanvas') as HTMLCanvasElement;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const gaussian = (x: number, sigma: number) => {
        return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * (x / sigma) ** 2);
      };
      
      // Clear and redraw canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw axes
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 1;
      
      // X-axis
      ctx.beginPath();
      ctx.moveTo(50, 250);
      ctx.lineTo(600, 250);
      ctx.stroke();
      
      // Y-axis
      ctx.beginPath();
      ctx.moveTo(325, 50);
      ctx.lineTo(325, 280);
      ctx.stroke();
      
      // Draw Gaussian curve
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const centerX = 325;
      const scaleX = 60; // pixels per sigma
      const maxY = gaussian(0, sigma);
      const scaleY = 150 / maxY;
      
      for (let x = -5; x <= 5; x += 0.1) {
        const canvasX = centerX + x * scaleX;
        const y = gaussian(x, sigma);
        const canvasY = 250 - y * scaleY;
        
        if (x === -5) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
      ctx.stroke();
      
      // Draw kernel boundaries based on actual kernel size
      const kernelRadius = (kernelSize - 1) / 2;
      const minusBoundary = centerX - kernelRadius * scaleX;
      const plusBoundary = centerX + kernelRadius * scaleX;
      
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      // Left boundary line
      ctx.beginPath();
      ctx.moveTo(minusBoundary, 50);
      ctx.lineTo(minusBoundary, 250);
      ctx.stroke();
      
      // Right boundary line
      ctx.beginPath();
      ctx.moveTo(plusBoundary, 50);
      ctx.lineTo(plusBoundary, 250);
      ctx.stroke();
      
      ctx.setLineDash([]);
      
      // Labels
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      
      const sigmaCoverageValue = sigmaCoverage.toFixed(1);
      ctx.fillText(`-${sigmaCoverageValue}σ`, minusBoundary, 270);
      ctx.fillText('0', centerX, 270);
      ctx.fillText(`+${sigmaCoverageValue}σ`, plusBoundary, 270);
      ctx.fillText(`Kernel size: ${kernelSize}×${kernelSize}`, centerX, 30);
      
      // Shade the kernel coverage region
      ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
      ctx.beginPath();
      ctx.moveTo(minusBoundary, 250);
      
      const minX = -kernelRadius;
      const maxX = kernelRadius;
      for (let x = minX; x <= maxX; x += 0.1) {
        const canvasX = centerX + x * scaleX;
        const y = gaussian(x, sigma);
        const canvasY = 250 - y * scaleY;
        ctx.lineTo(canvasX, canvasY);
      }
      
      ctx.lineTo(plusBoundary, 250);
      ctx.closePath();
      ctx.fill();
      
      // Update kernel grid
      updateKernelGrid(kernelSize, sigma);
    };

    const updateKernelGrid = (kernelSize: number, sigma: number) => {
      const grid = document.getElementById('gaussianKernelGrid');
      if (!grid) return;
      
      grid.innerHTML = '';
      
      const gaussian = (x: number, sigma: number) => {
        return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * (x / sigma) ** 2);
      };
      
      // Calculate appropriate cell size based on kernel size to prevent overflow
      const maxKernelWidth = 600;
      let cellSize = Math.min(35, Math.floor(maxKernelWidth / kernelSize));
      cellSize = Math.max(20, cellSize);
      
      const fontSize = Math.max(8, Math.floor(cellSize / 4));
      const center = Math.floor(kernelSize / 2);
      
      // Create grid container
      const gridContainer = document.createElement('div');
      gridContainer.style.display = 'grid';
      gridContainer.style.gridTemplateColumns = `repeat(${kernelSize}, ${cellSize}px)`;
      gridContainer.style.gridTemplateRows = `repeat(${kernelSize}, ${cellSize}px)`;
      gridContainer.style.gap = '1px';
      gridContainer.style.justifyContent = 'center';
      
      for (let i = 0; i < kernelSize; i++) {
        for (let j = 0; j < kernelSize; j++) {
          const cell = document.createElement('div');
          cell.style.width = `${cellSize}px`;
          cell.style.height = `${cellSize}px`;
          cell.style.fontSize = `${fontSize}px`;
          cell.style.margin = '1px';
          cell.style.display = 'flex';
          cell.style.alignItems = 'center';
          cell.style.justifyContent = 'center';
          cell.style.fontWeight = 'bold';
          cell.style.borderRadius = '3px';
          cell.style.color = '#333';
          cell.style.border = '1px solid #999';
          
          // Calculate distance from center
          const dx = j - center;
          const dy = i - center;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Calculate Gaussian value
          const value = gaussian(distance, sigma);
          const normalizedValue = value / gaussian(0, sigma);
          
          // Color based on value
          const intensity = Math.floor(255 - normalizedValue * 200);
          cell.style.backgroundColor = `rgb(${intensity}, ${intensity}, ${intensity})`;
          
          // Show value
          if (normalizedValue > 0.01) {
            if (cellSize > 25) {
              cell.textContent = normalizedValue.toFixed(2);
            } else {
              cell.textContent = (Math.round(normalizedValue * 10) / 10).toString();
            }
          } else {
            cell.textContent = '0';
            cell.style.color = '#999';
          }
          
          // Highlight center
          if (i === center && j === center) {
            cell.style.border = '2px solid #666';
          }
          
          gridContainer.appendChild(cell);
        }
      }
      
      grid.appendChild(gridContainer);
    };

    // Reset to formula function
    const resetToFormula = () => {
      const sigmaSlider = document.getElementById('gaussianSigmaSlider') as HTMLInputElement;
      const kSlider = document.getElementById('gaussianKSlider') as HTMLInputElement;
      
      if (sigmaSlider && kSlider) {
        const sigma = parseFloat(sigmaSlider.value);
        let formulaK = Math.round(6 * sigma + 1);
        
        // Ensure kernel size is always odd
        if (formulaK % 2 === 0) {
          formulaK += 1;
        }
        
        // Clamp to slider range
        formulaK = Math.max(3, Math.min(15, formulaK));
        
        kSlider.value = formulaK.toString();
        updateGaussianVisualization();
      }
    };

    // Set up event listeners
    const sigmaSlider = document.getElementById('gaussianSigmaSlider') as HTMLInputElement;
    const kSlider = document.getElementById('gaussianKSlider') as HTMLInputElement;
    const resetBtn = document.getElementById('resetToFormulaBtn') as HTMLButtonElement;
    
    if (sigmaSlider && kSlider && resetBtn) {
      sigmaSlider.addEventListener('input', updateGaussianVisualization);
      kSlider.addEventListener('input', updateGaussianVisualization);
      resetBtn.addEventListener('click', resetToFormula);
      // Initial visualization
      setTimeout(updateGaussianVisualization, 100);
    }

    // Cleanup function
    return () => {
      if (sigmaSlider) {
        sigmaSlider.removeEventListener('input', updateGaussianVisualization);
      }
      if (kSlider) {
        kSlider.removeEventListener('input', updateGaussianVisualization);
      }
      if (resetBtn) {
        resetBtn.removeEventListener('click', resetToFormula);
      }
    };
  }, [showGaussianWidget]);

  // Auto-scroll carousel effect
  useEffect(() => {
    if (isCarouselHovered) return;

    const carousel = document.getElementById('blending-carousel');
    if (!carousel) return;

    const scrollStep = 1;
    const scrollDelay = 30;
    let scrollDirection = 1;

    const autoScroll = () => {
      if (isCarouselHovered) return;

      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      
      if (carousel.scrollLeft >= maxScroll) {
        scrollDirection = -1;
      } else if (carousel.scrollLeft <= 0) {
        scrollDirection = 1;
      }

      carousel.scrollLeft += scrollStep * scrollDirection;
    };

    const interval = setInterval(autoScroll, scrollDelay);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  const navigationItems = [
    { id: 'overview', title: 'Overview', icon: <Eye className="h-4 w-4" /> },
    { id: 'part1', title: 'Part 1: Filters', icon: <Filter className="h-4 w-4" /> },
    { id: 'part1-1', title: '1.1: Convolutions', icon: <Grid className="h-4 w-4" /> },
    { id: 'part1-2', title: '1.2: Finite Difference', icon: <Zap className="h-4 w-4" /> },
    { id: 'part1-3', title: '1.3: DoG Filter', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'part2', title: 'Part 2: Frequencies', icon: <Filter className="h-4 w-4" /> },
    { id: 'part2-1', title: '2.1: Image Sharpening', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'part2-2', title: '2.2: Hybrid Images', icon: <Eye className="h-4 w-4" /> },
    { id: 'part2-3', title: '2.3: Gaussian & Laplacian Stacks', icon: <Grid className="h-4 w-4" /> },
    { id: 'part2-4', title: '2.4: Multiresolution Blending', icon: <Filter className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Custom scrollbar styles */}
      <style>{`
        .carousel-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
        
        .carousel-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        
        .carousel-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .carousel-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        
        .carousel-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
      
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {activeSubsection && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Currently: <span className="text-primary font-medium">{activeSubsection}</span></span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <img src={bearIcon} alt="Bear" className="h-8 w-8" />
                <span className="text-lg font-bold text-primary">Project 2</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
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
            const isMainSection = ['overview', 'part1', 'part2'].includes(item.id);
            const isActiveSection = activeSection === item.id;
            const isActiveSubsection = activeSubsection === item.id;
            const isInActiveSection = !isMainSection && activeSection && item.id.startsWith(activeSection);
            
            return (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 ${
                  isActiveSection || isActiveSubsection
                    ? 'text-foreground font-medium'
                    : isInActiveSection
                    ? 'text-muted-foreground/80 pl-6 border-l border-border'
                    : isMainSection
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-muted-foreground/60 hover:text-muted-foreground pl-6'
                }`}
              >
                <span className={`${isActiveSubsection ? 'relative' : ''}`}>
                  {item.title}
                  {isActiveSubsection && (
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-foreground rounded-full" />
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
            <div className="relative">
              <img src={myOrapple24} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={watermelonMouth24} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={verticalSurfboard24} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden md:block">
              <img src={horizontalSurfboard24} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden lg:block">
              <img src={myOrapple24} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden lg:block">
              <img src={watermelonMouth24} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Fun with Filters and Frequencies!
            </h1>
            
            <p className="text-xl mb-8 text-gray-200">
              CS180 Programming Project #2 (proj2)
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Project Overview</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              This project explores fundamental concepts in image processing through hands-on implementation of filters, frequency analysis, and multi-resolution blending techniques. 
              We'll build intuitions about 2D convolutions and filtering, starting with finite difference operators and progressing to advanced frequency domain techniques 
              for image enhancement and creative visual effects.
            </p>
          </div>
        </div>
      </section>

      {/* Part 1: Fun with Filters */}
      <section id="part1" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part 1: Fun with Filters</h2>
          
          <div className="space-y-12">
            <div>
              <p className="text-gray-700 mb-4">
                In this first part I explored the basics and intuitions of <strong>2D convolutions and filtering</strong>.
              </p>
              
              <p className="text-gray-700 mb-4">
                To start, I worked with the <strong>finite difference filters</strong> D<sub>x</sub> and D<sub>y</sub>. These filters approximate the partial derivatives of the image in the horizontal and vertical directions, respectively, and therefore highlight edges in the corresponding orientation.
              </p>
            </div>

            <div id="part1-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 1.1: Convolutions from Scratch!</h3>
              <p className="text-gray-700 mb-4">
                Before implementing convolutions, I first needed to deal with <strong>padding</strong>. Without padding, convolutions "shrink" the image because the kernel cannot be applied at the border pixels. To keep the output image the same size as the input, we pad the image with zeros.
              </p>
              
              <p className="text-gray-700 mb-4">
                The padding for a kernel of size k×k is calculated as:
              </p>
              
              <div className="bg-white p-6 rounded-lg border mb-6">
                <div className="text-center font-mono text-lg">
                  padding = ⌊(k - 1)/2⌋
                </div>
              </div>
              
                  <p className="text-gray-700 mb-4">
                    This ensures the kernel can be centered on every pixel of the image. For example, a 3×3 kernel needs a padding of 1 on all sides.
                  </p>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Boundary Handling: Manual vs. Library Implementation</h5>
                  
                  <p className="text-gray-700 mb-4">
                    My implementation uses <strong>zero-padding</strong>, where border pixels are filled with zeros. This creates artificial dark boundaries that can affect edge pixels in the output.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    SciPy's <code className="bg-gray-200 px-2 py-1 rounded">convolve2d</code> offers several boundary handling modes:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><code className="bg-gray-200 px-2 py-1 rounded">'fill'</code> (default): Similar to zero-padding</li>
                      <li><code className="bg-gray-200 px-2 py-1 rounded">'wrap'</code>: Treats the image as periodic (opposite edges connect)</li>
                      <li><code className="bg-gray-200 px-2 py-1 rounded">'symm'</code>: Reflects pixels across boundaries</li>
                      <li><code className="bg-gray-200 px-2 py-1 rounded">'constant'</code>: Uses a specified constant value</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The choice of boundary handling can significantly affect results near image edges, though the central regions remain identical across methods.
                  </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Step 1: The 4-Loop Convolution</h4>
                  <p className="text-gray-700 mb-4">
                    My first implementation used the most direct approach: <strong>four nested for-loops</strong>.
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Two loops iterate over the x and y coordinates of the image.</li>
                    <li>Two additional loops iterate over the x and y coordinates of the kernel.</li>
                    <li>For each position, I compute the sum of pixel values multiplied with the kernel weights.</li>
                  </ul>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`def convolve_4loops(image, kernel):
    # Flip kernel for convolution
    kernel = np.flipud(np.fliplr(kernel))

    # Get dimensions
    img_h, img_w = image.shape
    kernel_h, kernel_w = kernel.shape

    # Calculate padding
    pad_h = (kernel_h - 1) // 2
    pad_w = (kernel_w - 1) // 2

    # Zero pad the input image
    padded_img = np.pad(image, ((pad_h, pad_h), (pad_w, pad_w)),
                        mode='constant', constant_values=0)

    # Output array
    output = np.zeros((img_h, img_w))

    # Perform convolution with 4 loops
    for i in range(img_h):
        for j in range(img_w):
            for ki in range(kernel_h):
                for kj in range(kernel_w):
                    output[i, j] += padded_img[i + ki, j + kj] * kernel[ki, kj]

    return output`}</code></pre>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This is the "brute force" method, but it makes the mechanics of convolution very clear.
                  </p>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Why Kernel Flipping is Essential</h5>
                  
                  <p className="text-gray-700 mb-4">
                    The line <code className="bg-gray-200 px-2 py-1 rounded">kernel = np.flipud(np.fliplr(kernel))</code> performs a crucial step that distinguishes <strong>convolution</strong> from <strong>correlation</strong>.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    Mathematically, convolution is defined as:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      (f ∗ g)(x,y) = ∑∑ f(i,j) · g(x-i, y-j)
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The negative indices (x-i, y-j) mean we're accessing the kernel in reverse order. Without flipping the kernel first, we'd be computing:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      (f ⋆ g)(x,y) = ∑∑ f(i,j) · g(x+i, y+j)
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This is <strong>correlation</strong>, not convolution. For symmetric kernels like Gaussians, this doesn't matter, but for directional filters like derivatives, the difference is crucial - D<sub>x</sub> would become -D<sub>x</sub> without proper flipping.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Step 2: The 2-Loop Convolution</h4>
                  <p className="text-gray-700 mb-4">
                    To improve efficiency, I reduced the number of loops. Here, I only loop over the image coordinates (i,j) and use NumPy's vectorized operations to compute the local sum directly.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`def convolve_2loops(image, kernel):
    # !!!kernel flipping, padding and output array preparation as above!!!

    # Perform convolution with 2 loops and vectorized operations
    for i in range(img_h):
        for j in range(img_w):
            output[i, j] = np.sum(padded_img[i:i+kernel_h, j:j+kernel_w] * kernel)

    return output`}</code></pre>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This already shows how NumPy can replace many explicit loops with array operations.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Step 3: Using SciPy</h4>
                  <p className="text-gray-700 mb-4">
                    For comparison, I also tried the built-in function <code className="bg-gray-200 px-2 py-1 rounded">scipy.signal.convolve2d</code>, which is highly optimized in C under the hood.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`img_conv_scipy_box = scipy.signal.convolve2d(img, box_filter, mode='same')`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Experiment 1: Finite Difference Filters</h4>
                  <p className="text-gray-700 mb-4">
                    I tested all three implementations on a grayscale portrait of myself with the derivative filters D<sub>x</sub> and D<sub>y</sub>. These highlight vertical and horizontal edges, respectively.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    All three methods produced <strong>pixel-perfect identical results</strong>. However, their timings were quite different:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>4-loop implementation:</strong> 1.3327 seconds</li>
                      <li><strong>2-loop implementation:</strong> 2.2700 seconds</li>
                      <li><strong>SciPy implementation:</strong> 0.0283 seconds</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Interestingly, my <strong>2-loop implementation was slower than the 4-loop version</strong>. At first this seems odd, since vectorization is usually faster. The explanation is that the slicing operation
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`padded_img[i:i+kernel_h, j:j+kernel_w]`}</code></pre>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    creates many temporary arrays for each pixel, which is computationally expensive. The 4-loop method, while less elegant, avoids this overhead.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(convolutions11)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={convolutions11}
                          alt="Comparison of convolution implementations showing original image, 4-loop Dx, 2-loop Dx, SciPy Dx, and derivatives in y direction, plus difference image"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Convolution implementation comparison: Original image and finite difference results using 4-loop, 2-loop, and SciPy methods
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Experiment 2: Box Filter</h4>
                  <p className="text-gray-700 mb-4">
                    As a second test, I implemented a 9×9 <strong>box filter</strong>, essentially a kernel filled with equal weights. This acts as a strong blur by averaging pixel neighborhoods.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-md cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(boxFilter9x9)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={boxFilter9x9}
                          alt="9x9 box filter kernel showing uniform weights of 0.0123 for all 81 elements"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        9×9 box filter kernel with uniform weights (1/81 = 0.0123 for each element)
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    When applied to my portrait, it produced the expected smoothing effect.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(boxFilterApplied11)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={boxFilterApplied11}
                          alt="Box filter application results showing original image, blurred result, and derivatives"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Box filter application: Original image, 9×9 box filter result, and derivative analysis
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This time, the results were still numerically almost identical across implementations:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Max difference (2-loop vs SciPy):</strong> 1.66×10<sup>-15</sup></li>
                      <li><strong>Max difference (4-loop vs SciPy):</strong> 5.55×10<sup>-16</sup></li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    These tiny differences are due to floating-point precision and are negligible.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    The timing, however, showed a much larger gap:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>4-loop implementation:</strong> 11.2619 seconds</li>
                      <li><strong>2-loop implementation:</strong> 1.3283 seconds</li>
                      <li><strong>SciPy implementation:</strong> 0.0422 seconds</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Here, the situation reversed: the 4-loop approach became drastically slower because of the large kernel, while the 2-loop method benefited from vectorized summations. SciPy remained the clear winner by orders of magnitude.
                  </p>
                </div>
              </div>
            </div>

            <div id="part1-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 1.2: Finite Difference Operator</h3>
              <p className="text-gray-700 mb-4">
                In this subpart, I applied the <strong>finite difference operators</strong> D<sub>x</sub> and D<sub>y</sub> to the classic <em>cameraman</em> image.
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Convolving the image with <strong>D<sub>x</sub></strong> extracts the <strong>horizontal derivative</strong>, highlighting <strong>vertical edges</strong>.</li>
                <li>Convolving with <strong>D<sub>y</sub></strong> extracts the <strong>vertical derivative</strong>, highlighting <strong>horizontal edges</strong>.</li>
              </ul>
              
              <p className="text-gray-700 mb-4">
                Together, they form the building blocks for edge detection.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Gradient Magnitude Image</h4>
                  <p className="text-gray-700 mb-4">
                    To combine the information from both derivatives, I computed the <strong>gradient magnitude image</strong> using the formula:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      grad_mag(i,j) = √((I<sub>x</sub>(i,j))<sup>2</sup> + (I<sub>y</sub>(i,j))<sup>2</sup>)
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This formula comes directly from vector calculus: the gradient of an image at each pixel is the vector
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      ∇I = (I<sub>x</sub>, I<sub>y</sub>)
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    and its length (magnitude) tells us how strong the change in intensity is, regardless of direction. Intuitively:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Large values</strong> = sharp edges</li>
                      <li><strong>Small values</strong> = flat or smooth regions</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Binarization with Thresholding</h4>
                  <p className="text-gray-700 mb-4">
                    After computing the gradient magnitude, I wanted to create a <strong>binary edge map</strong>: an image that keeps only the "significant" edges.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    This was done by thresholding:
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`img_grad_mag_bin = (img_grad_mag > threshold)`}</code></pre>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Pixels where the gradient magnitude is larger than the threshold are set to <strong>True (edge)</strong>, otherwise <strong>False (non-edge)</strong>.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    I experimented with thresholds in the range:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      [0.15, 0.20, 0.25, 0.30, 0.35, 0.40]
                    </div>
                  </div>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(cameraman12)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={cameraman12}
                          alt="Cameraman finite difference analysis showing original image, gradient magnitude, and binarized results with different thresholds"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Finite difference analysis on the cameraman image: original, gradient magnitude, and binarized edge maps with thresholds from 0.15 to 0.4
                      </p>
                    </div>
                  </div>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Threshold Selection Analysis</h5>
                  
                  <p className="text-gray-700 mb-4">
                    After systematic testing across the range [0.15, 0.20, 0.25, 0.30, 0.35, 0.40], I selected <strong>0.25</strong> based on specific visual criteria:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Thresholds 0.15-0.2:</strong> Include excessive background texture noise, particularly in the grass and foliage areas, making it difficult to distinguish meaningful edges from surface patterns</li>
                      <li>• <strong>Threshold 0.25:</strong> <strong>Good balance</strong> - preserves the photographer's silhouette, camera body details, and tripod structure while substantially reducing texture artifacts in the background</li>
                      <li>• <strong>Thresholds 0.3-0.4:</strong> Begin to over-suppress edges, losing some important structural details like finer camera housing edges and the man's coat</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The 0.25 threshold successfully separates <strong>structural edges</strong> (object boundaries, geometric features) from <strong>texture edges</strong> (surface patterns, noise) while maintaining more detail than higher thresholds, which aligns with the goal of comprehensive yet robust edge detection.
                  </p>
                </div>
              </div>
            </div>

            <div id="part1-3">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 1.3: Derivative of Gaussian (DoG) Filter</h3>
              <p className="text-gray-700 mb-4">
                In the previous subpart, the finite difference operators produced good edge maps but also introduced a lot of <strong>noise</strong>, especially in textured or low-contrast regions. A natural way to address this is to apply a <strong>Gaussian filter</strong> to smooth the image before computing derivatives.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Gaussian Smoothing</h4>
                  <p className="text-gray-700 mb-4">
                    The Gaussian filter acts as a <strong>low-pass filter</strong>, blurring small intensity fluctuations (noise) while preserving larger structures. Its shape is defined by the Gaussian function:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      G(x,y) = (1/2πσ²) · e<sup>-(x²+y²)/2σ²</sup>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    where σ controls the degree of smoothing.
                  </p>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Choosing σ = 1: Balancing Smoothing and Detail</h5>
                  
                  <p className="text-gray-700 mb-4">
                    The standard deviation σ controls the <strong>spatial extent</strong> of smoothing:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>σ = 0.5:</strong> Minimal smoothing, preserves fine details but limited noise suppression</li>
                      <li><strong>σ = 1.0:</strong> <strong>Moderate smoothing</strong> - chosen for this analysis as it provides substantial noise reduction while maintaining important edge structures</li>
                      <li><strong>σ = 2.0:</strong> Strong smoothing, excellent noise suppression but may blur away subtle but meaningful edges</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    I selected σ = 1 because it represents a practical compromise: strong enough to suppress the texture noise visible in the raw finite difference results, yet conservative enough to preserve the photographer's facial features and camera details that are important for edge detection evaluation.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    I generated a 2D Gaussian filter by first creating a <strong>1D Gaussian kernel</strong> and then taking its <strong>outer product</strong> with its transpose:
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`gaussian_1d = cv2.getGaussianKernel(k, sigma)
gaussian_2d = gaussian_1d * gaussian_1d.T`}</code></pre>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The kernel size formula k = 6σ + 1 ensures adequate coverage of the Gaussian distribution. This formula provides 3σ coverage on each side of the center (6σ total) plus the center pixel. For σ = 1, this gives a 7×7 kernel that captures approximately 99.7% of the Gaussian's mass, ensuring effective smoothing while keeping the kernel computationally manageable.
                  </p>
                  
                  
                  
                  <div className="mb-6">
                    <div className="bg-white p-6 rounded-lg border">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold text-gray-900">Interactive Gaussian Kernel Visualization</h5>
                        <button
                          onClick={() => setShowGaussianWidget(!showGaussianWidget)}
                          className="px-4 py-2 text-white rounded-lg transition-colors text-sm"
                          style={{backgroundColor: '#265927'}}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00583C'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#265927'}
                        >
                          {showGaussianWidget ? 'Hide Widget' : 'Show Interactive Widget'}
                        </button>
                      </div>
                      
                      {showGaussianWidget && (
                        <div className="gaussian-widget-container">
                          <div className="rounded-lg p-6 border" style={{backgroundColor: '#fefcf8', borderColor: '#e8e6e0'}}>
                            <h1 className="text-center mb-2 text-xl font-semibold" style={{color: '#555'}}>Gaussian Kernel Size Formula</h1>
                            
                            <div className="p-5 rounded-lg text-center my-5 border-2" style={{backgroundColor: '#f0eee8', borderColor: '#d5d2ca'}}>
                              <div className="text-3xl font-bold mb-2" style={{fontFamily: '"Times New Roman", serif', color: '#444'}}>
                                <span id="gaussianFormulaDisplay">k = 6σ + 1</span>
                              </div>
                              <div className="text-sm italic" style={{color: '#666'}}>
                                <span id="gaussianFormulaExplanation">Kernel size = 6 × sigma + 1 (center pixel)</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 my-5">
                              <div className="p-4 rounded-lg text-center" style={{backgroundColor: '#ebe9e3'}}>
                                <label htmlFor="gaussianSigmaSlider" className="block mb-2" style={{color: '#666'}}>Adjust σ (sigma): </label>
                                <input 
                                  type="range" 
                                  id="gaussianSigmaSlider" 
                                  className="w-full mx-2" 
                                  min="0.5" 
                                  max="3" 
                                  step="0.1" 
                                  defaultValue="1"
                                  style={{
                                    accentColor: '#265927',
                                    background: `linear-gradient(to right, #265927 0%, #265927 var(--value, 0%), #ddd var(--value, 0%), #ddd 100%)`
                                  }}
                                />
                                <div id="gaussianSigmaValue" className="mt-2" style={{color: '#444'}}>σ = 1.0</div>
                              </div>
                              
                              <div className="p-4 rounded-lg text-center" style={{backgroundColor: '#ebe9e3'}}>
                                <label htmlFor="gaussianKSlider" className="block mb-2" style={{color: '#666'}}>Adjust k (kernel size): </label>
                                <input 
                                  type="range" 
                                  id="gaussianKSlider" 
                                  className="w-full mx-2" 
                                  min="3" 
                                  max="15" 
                                  step="2" 
                                  defaultValue="7"
                                  style={{
                                    accentColor: '#265927',
                                    background: `linear-gradient(to right, #265927 0%, #265927 var(--value, 0%), #ddd var(--value, 0%), #ddd 100%)`
                                  }}
                                />
                                <div id="gaussianKValue" className="mt-2" style={{color: '#444'}}>k = 7</div>
                              </div>
                            </div>
                            
                            <div className="flex justify-center mb-5">
                              <button
                                id="resetToFormulaBtn"
                                className="px-4 py-2 text-white rounded-lg transition-colors text-sm"
                                style={{backgroundColor: '#265927'}}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00583C'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#265927'}
                              >
                                Reset to Formula (k = 6σ + 1)
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-3 my-5">
                              <div className="p-3 rounded-lg text-center border" style={{backgroundColor: '#e8e6e0', borderColor: '#d0cdc6'}}>
                                <div className="text-xs mb-1" style={{color: '#666'}}>σ (Sigma)</div>
                                <div id="gaussianCurrentSigma" className="text-xl font-bold" style={{color: '#333'}}>1.0</div>
                              </div>
                              <div className="p-3 rounded-lg text-center border" style={{backgroundColor: '#e8e6e0', borderColor: '#d0cdc6'}}>
                                <div className="text-xs mb-1" style={{color: '#666'}}>k (Size)</div>
                                <div id="gaussianKernelSize" className="text-xl font-bold" style={{color: '#333'}}>7</div>
                              </div>
                              <div className="p-3 rounded-lg text-center border" style={{backgroundColor: '#e8e6e0', borderColor: '#d0cdc6'}}>
                                <div className="text-xs mb-1" style={{color: '#666'}}>Coverage σ</div>
                                <div id="gaussianSigmaCoverage" className="text-xl font-bold" style={{color: '#333'}}>3.0</div>
                              </div>
                              <div className="p-3 rounded-lg text-center border" style={{backgroundColor: '#e8e6e0', borderColor: '#d0cdc6'}}>
                                <div className="text-xs mb-1" style={{color: '#666'}}>% Coverage</div>
                                <div id="gaussianCoverage" className="text-xl font-bold" style={{color: '#333'}}>99.7%</div>
                              </div>
                            </div>
                            
                            <div className="p-3 rounded-lg my-5 border" style={{backgroundColor: 'white', borderColor: '#d0cdc6'}}>
                              <canvas id="gaussianCanvas" width="650" height="300" className="w-full max-w-full"></canvas>
                            </div>
                            
                            <div id="gaussianKernelGrid" className="flex justify-center my-5 overflow-x-auto">
                              {/* Kernel visualization will be generated here */}
                            </div>
                            
                            <div className="p-4 rounded-lg my-5 border-l-4" style={{backgroundColor: '#f5f3ed', borderLeftColor: '#d0cdc6'}}>
                              <h3 className="font-semibold mb-3" style={{color: '#555'}}>Understanding Kernel Size vs Coverage</h3>
                              <ul className="list-none p-0 space-y-2">
                                <li className="text-sm" style={{color: '#444'}}>• <span className="px-2 py-1 rounded" style={{backgroundColor: '#d0cdc6'}}>Standard k = 6σ + 1</span>: Provides exactly ±3σ coverage (99.7% of distribution)</li>
                                <li className="text-sm" style={{color: '#444'}}>• <span className="px-2 py-1 rounded" style={{backgroundColor: '#d0cdc6'}}>Smaller kernels</span>: Faster computation but may miss important Gaussian tails</li>
                                <li className="text-sm" style={{color: '#444'}}>• <span className="px-2 py-1 rounded" style={{backgroundColor: '#d0cdc6'}}>Larger kernels</span>: Better coverage but increased computational cost</li>
                                <li className="text-sm" style={{color: '#444'}}>• <span className="px-2 py-1 rounded" style={{backgroundColor: '#d0cdc6'}}>Odd sizes only</span>: Ensures symmetric kernel with clear center pixel</li>
                                <li className="text-sm" style={{color: '#444'}}>• <span className="px-2 py-1 rounded" style={{backgroundColor: '#d0cdc6'}}>Coverage σ</span>: Shows how many standard deviations the kernel spans</li>
                              </ul>
                            </div>
                            
                            <div className="p-3 rounded-lg mt-5 border" style={{backgroundColor: '#f5f3ed', borderColor: '#e8e6e0'}}>
                              <p className="text-xs text-center" style={{color: '#777'}}>
                                Interactive widget created with assistance from <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="underline" style={{color: '#265927'}} onMouseEnter={(e) => e.currentTarget.style.color = '#00583C'} onMouseLeave={(e) => e.currentTarget.style.color = '#265927'}>Anthropic's Claude Chat</a>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {!showGaussianWidget && (
                        <div className="text-center py-8 text-gray-500">
                          <p>Click "Show Interactive Widget" to explore the Gaussian kernel size formula k = 6σ + 1</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    I then applied this Gaussian kernel to the <em>cameraman</em> image before repeating the <strong>gradient magnitude and binarization</strong> step from Part 1.2.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    The result was much smoother: the noisy regions (e.g., in the bottom right of the original gradient magnitude image) were largely suppressed.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(blurredBinGradMag13)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={blurredBinGradMag13}
                          alt="Comparison of gradient magnitude with and without Gaussian smoothing, showing noise reduction"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Gaussian smoothing effect: Comparison of gradient magnitude and binarized edge maps with and without pre-smoothing
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Does This Work?</h4>
                  <p className="text-gray-700 mb-4">
                    Noise in images often appears as <strong>high-frequency variations</strong> (rapid intensity changes).
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>• The Gaussian filter smooths these fluctuations, reducing the response of the derivative operators to irrelevant details.</li>
                      <li>• As a result, only <strong>significant structural edges</strong> remain strong in the gradient magnitude.</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This explains the clear improvement in edge maps after Gaussian smoothing.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Derivative of Gaussian (DoG) Filters</h4>
                  <p className="text-gray-700 mb-4">
                    Instead of performing two steps (Gaussian smoothing → derivative), we can <strong>combine them into a single operation</strong>.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    The idea is to first convolve the Gaussian with the derivative operators D<sub>x</sub> and D<sub>y</sub>. This produces the <strong>Derivative of Gaussian (DoG) filters</strong>:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700 font-mono">
                      <li>• G<sub>x</sub> = G * D<sub>x</sub></li>
                      <li>• G<sub>y</sub> = G * D<sub>y</sub></li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    These filters look like smoothed edge detectors, they resemble <strong>blurred versions of the original finite difference filters</strong>, but with a Gaussian "bell curve" weighting.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    When applied directly to the image, the DoG filters simultaneously smooth and differentiate, making the process more efficient and theoretically cleaner.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(dogFilter13)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={dogFilter13}
                          alt="Derivative of Gaussian filters showing the combined Gaussian-derivative kernels"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Derivative of Gaussian (DoG) filters: Combined Gaussian smoothing and differentiation kernels
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Step 3: Comparing the Two Approaches</h4>
                  <p className="text-gray-700 mb-4">
                    I compared the outputs of:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li><strong>Two-step method:</strong> Gaussian smoothing → derivative → gradient magnitude.</li>
                      <li><strong>One-step method:</strong> Apply DoG filters → gradient magnitude.</li>
                    </ol>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    At first glance, the results looked nearly identical. However, when I plotted their <strong>pixel-wise difference</strong>, some small discrepancies became visible.
                  </p>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Mathematical Equivalence: Associativity of Convolution</h5>
                  
                  <p className="text-gray-700 mb-4">
                    The two approaches should theoretically yield identical results due to the <strong>associative property of convolution</strong>:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      (I ∗ G) ∗ D = I ∗ (G ∗ D)
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Where:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Left side (two-step):</strong> First smooth the image with Gaussian G, then apply derivative D</li>
                      <li><strong>Right side (one-step):</strong> First create DoG filter (G ∗ D), then apply to image I</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This mathematical equivalence means both methods compute exactly the same linear transformation of the input image. The associative property is fundamental to convolution algebra and allows us to reorder operations for computational efficiency or theoretical clarity.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    However, discrete implementations can introduce small numerical differences due to floating-point precision and boundary handling, which explains the subtle discrepancies visible in the difference image.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(dogComparison13)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={dogComparison13}
                          alt="Comparison between two-step and one-step DoG approaches showing minimal differences"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        DoG comparison: Two-step vs one-step approach showing the subtle pixel-wise differences
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Might There Be Differences?</h4>
                  <p className="text-gray-700 mb-4">
                    In theory, both approaches should yield the same result (since convolution is associative). However, in practice small differences can arise. Possible causes include:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Floating-point precision effects:</strong> performing multiple convolutions separately vs. in one step can accumulate rounding differences.</li>
                      <li>• <strong>Discrete implementation details:</strong> while convolution is associative in continuous math, the discretization of kernels and images can make results diverge slightly.</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    These differences are typically very small and do not affect the qualitative interpretation of the edge maps.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Part 1 Takeaways</h3>
              
              <div className="max-w-3xl mx-auto">
                <div className="space-y-4 text-gray-700">
                  <p>• A <strong>box filter</strong> averages pixel neighborhoods with equal weights, creating a smoothing/blurring effect that reduces fine details and noise</p>
                  
                  <p>• <strong>Convolution libraries</strong> like scipy are faster because they use optimized C code and efficient memory access patterns, while nested Python loops have significant overhead</p>
                  
                  <p>• <strong>Finite difference operators</strong> D<sub>x</sub> and D<sub>y</sub> detect intensity changes by computing horizontal and vertical derivatives, highlighting edges in their respective directions</p>
                  
                  <p>• <strong>Gradient magnitude</strong> combines both derivatives to create an edge strength map that shows how rapidly intensity changes regardless of direction</p>
                  
                  <p>• <strong>Thresholding</strong> converts gradient magnitude to binary edge maps, where the threshold value controls the trade-off between capturing weak edges and suppressing noise</p>
                  
                  <p>• <strong>Gaussian filters</strong> smooth images by weighting nearby pixels with a bell curve, effectively removing high-frequency noise while preserving major structures</p>
                  
                  <p>• <strong>Derivative of Gaussian (DoG) filters</strong> combine smoothing and edge detection in one step by convolving a Gaussian with derivative operators, reducing noise in the final edge maps</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Part 2: Fun with Frequencies */}
      <section id="part2" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part 2: Fun with Frequencies!</h2>
          
          <div className="space-y-12">
            <div>
              <p className="text-gray-700 mb-4">
                In this second part, I explore how to enhance images using <strong>frequency-based filtering techniques</strong>. 
                Moving beyond basic edge detection, we'll see how separating images into low-frequency (smooth) and 
                high-frequency (detailed) components enables sophisticated image processing operations.
              </p>
            </div>

            <div id="part2-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.1: Image "Sharpening"</h3>
              
              <p className="text-gray-700 mb-4">
                In this exercise, I explored how to sharpen images using frequency-based filtering. The idea is to separate an image into its <strong>low-frequency</strong> (smooth, slowly varying content) and <strong>high-frequency</strong> (edges and fine details) components.
              </p>
              
              <p className="text-gray-700 mb-4">
                The Gaussian filter serves as a low-pass filter: it blurs the image by suppressing high-frequency details. If we subtract this blurred version from the original image, we are left with the high-frequency component. Adding this high-frequency component back to the original enhances edges and makes the image appear "sharper."
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Unsharp Masking: Two-Step vs. Single Convolution</h4>
                  
                  <p className="text-gray-700 mb-4">
                    The sharpening process can be described in two steps:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Blur the image with a Gaussian filter G<sub>σ</sub>.</li>
                      <li>Subtract the blurred image from the original to extract high frequencies, then add them back with some scaling factor α.</li>
                    </ol>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Formally, this is:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      I<sub>sharp</sub> = I + α · (I - (I ∗ G<sub>σ</sub>))
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    where:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>I</strong> is the original image</li>
                      <li>• <strong>G<sub>σ</sub></strong> is the Gaussian filter with standard deviation σ</li>
                      <li>• <strong>α</strong> controls the <strong>amount</strong> of sharpening</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This formula can also be expressed as a <strong>single convolution</strong>. If we rewrite it:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      I<sub>sharp</sub> = I ∗ [(1 + α)δ - αG<sub>σ</sub>]
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Here, δ is the <strong>identity filter</strong> (all zeros except a 1 in the center). The resulting kernel
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      F<sub>unsharp</sub> = (1 + α)δ - αG<sub>σ</sub>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    is called the <strong>unsharp mask filter</strong>. This single filter directly produces the sharpened image in one convolution step.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(unsharpFilters21)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={unsharpFilters21}
                          alt="Gaussian, identity, and unsharp filter kernels for sigma=1.0 and amount=1.0"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Comparison of Gaussian, identity, and unsharp filter kernels for σ=1.0 and α=1.0
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Sharpening Results with Different Parameters</h4>
                  
                  <p className="text-gray-700 mb-4">
                    I tested the unsharp masking technique on two different images with varying values of α (amount) to demonstrate the effect of the sharpening parameter.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div 
                      className="bg-white p-4 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(tajUnsharp21)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={tajUnsharp21}
                          alt="Taj Mahal unsharp masking results with different alpha values"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Taj Mahal sharpening results with different α values
                      </p>
                    </div>
                    
                    <div 
                      className="bg-white p-4 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(treesUnsharp21)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={treesUnsharp21}
                          alt="Trees unsharp masking results with different alpha values"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Trees sharpening results with different α values
                      </p>
                    </div>
                  </div>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Effect of Alpha Parameter</h5>
                  
                  <p className="text-gray-700 mb-4">
                    The results clearly show how different values of α affect the sharpening intensity:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>α = 0.5:</strong> Subtle sharpening that enhances edges without creating artifacts</li>
                      <li>• <strong>α = 1.0:</strong> Moderate sharpening with noticeable edge enhancement</li>
                      <li>• <strong>α = 2.0:</strong> Strong sharpening that may introduce halos around high-contrast edges</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The results clearly show how sharpening reintroduces high frequencies that were suppressed by the Gaussian blur. In practice, the unsharp mask is widely used in photography and image processing because it is simple, effective, and computationally efficient.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Blur and Resharpening Experiment</h4>
                  
                  <p className="text-gray-700 mb-4">
                    As a second experiment, I took a sharp image, blurred it, and then used the unsharp mask filter to attempt restoration (values: α=1, σ=1).
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(blurSharpen21)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={blurSharpen21}
                          alt="Comparison of original, blurred, and resharpened images showing information loss"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Blur and resharpening experiment: original → blurred → resharpened
                      </p>
                    </div>
                  </div>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Information Loss in Blur-Sharpen Pipeline</h5>
                  
                  <p className="text-gray-700 mb-4">
                    As you can see, the resharpened image lost some details because the blurring process loses information that the unsharp mask cannot restore. This demonstrates an important principle:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Blurring is irreversible:</strong> Once high-frequency information is removed by Gaussian smoothing, it cannot be perfectly recovered</li>
                      <li>• <strong>Unsharp masking enhances existing edges:</strong> It amplifies whatever edge information remains after blurring, but cannot recreate lost details</li>
                    </ul>
                  </div>
                  
                  
                </div>
              </div>
            </div>

            <div id="part2-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.2: Hybrid Images</h3>
              
              <p className="text-gray-700 mb-4">
                In this part I create <a href="https://en.wikipedia.org/wiki/Hybrid_image" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">hybrid images</a> using the approach described in the SIGGRAPH 2006 <a href="https://web.archive.org/web/20070315210101/http://cvcl.mit.edu/hybrid/OlivaTorralb_Hybrid_Siggraph06.pdf" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">paper</a> by Oliva, Torralba, and Schyns. 
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Hybrid images</strong> are static images that change in interpretation as a function of the viewing distance. The basic idea is that <strong>high frequency tends to dominate perception</strong> when it is available, but, at a distance, only the <strong>low frequency (smooth) part of the signal can be seen</strong>. By blending the high frequency portion of one image with the low-frequency portion of another, you get a hybrid image that leads to different interpretations at different distances.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">The Hybrid Image Creation Process</h4>
                  
                  <p className="text-gray-700 mb-4">
                    Creating effective hybrid images involves several key steps:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ol className="list-decimal list-inside space-y-3 text-gray-700">
                      <li><strong>Image Alignment:</strong> As a first step I aligned the images to ensure key features (eyes, mouth, etc.) correspond spatially between the two source images.</li>
                      <li><strong>Frequency Filtering:</strong> I used a low pass filter on one image and a high pass filter on the other. I experimented with different sigma values for both filters to control their intensity.</li>
                      <li><strong>Image Merging:</strong> I merged the images by adding them together and clipping the result to the range [0,1] to ensure valid pixel values.</li>
                      <li><strong>Parameter Optimization:</strong> Tadaaa! The final hybrid image uses the best sigma values, chosen qualitatively by visual inspection of the results.</li>
                    </ol>
                  </div>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Technical Implementation</h5>
                  
                  <p className="text-gray-700 mb-4">
                    The mathematical foundation involves frequency domain separation:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700 font-mono">
                      <li>• <strong>Low-pass component:</strong> I<sub>low</sub> = I<sub>1</sub> ∗ G<sub>σ_low</sub></li>
                      <li>• <strong>High-pass component:</strong> I<sub>high</sub> = I<sub>2</sub> - (I<sub>2</sub> ∗ G<sub>σ_high</sub>)</li>
                      <li>• <strong>Hybrid result:</strong> I<sub>hybrid</sub> = I<sub>low</sub> + I<sub>high</sub></li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Where G<sub>σ</sub> represents Gaussian filters with different standard deviations controlling the frequency cutoffs.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Main Result: Young and Old Me</h4>
                  
                  <p className="text-gray-700 mb-4">
                    This hybrid image merges a picture of me as a kid with a picture of me now. Through experimentation, I found that <strong>σ<sub>low</sub> = 5</strong> and <strong>σ<sub>high</sub> = 5</strong> produced the best combination for this particular image pair.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(oldYoungComp22)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={oldYoungComp22}
                          alt="Sigma comparison analysis for young and old hybrid image showing different parameter combinations"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Parameter optimization: Comparison of different σ values for the young/old hybrid image
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    For this optimal combination, I performed a comprehensive analysis showing the original images, aligned images, low and high-pass filtered components, the final hybrid image, and the Fourier transforms of all respective images.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(fourierYoungOld22)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={fourierYoungOld22}
                          alt="Complete analysis of young/old hybrid image showing originals, filtered components, and Fourier transforms"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Complete frequency analysis: Original images, filtered components, hybrid result, and corresponding Fourier transforms
                      </p>
                    </div>
                  </div>
                  
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Hybrid Image Experiments</h4>
                  
                  <p className="text-gray-700 mb-4">
                    Here are some additional hybrid images I experimented with to explore different combinations and effects:
                  </p>
                  
                  <div className="space-y-8">
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage(derekCat22)}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src={derekCat22}
                            alt="Derek and cat hybrid image experiment"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Derek + Cat hybrid image
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage(dogDude22)}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src={dogDude22}
                            alt="Dog and person hybrid image experiment"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Dog + Me hybrid image
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage(oldYoung22)}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src={oldYoung22}
                            alt="Final young and old hybrid image result"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Young + Old Me hybrid image
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage(twoLions22)}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src={twoLions22}
                            alt="Mehmet and lion hybrid image experiment"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          My friend Mehmet and his spirit animal
                        </p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            <div id="part2-3">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.3: Gaussian and Laplacian Stacks</h3>
              
              <p className="text-gray-700 mb-4">
                To better understand image decomposition, I implemented Gaussian and Laplacian stacks. Unlike pyramids, stacks do not downsample, so all levels stay the same size as the original image.
              </p>

              <div className="space-y-8">

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Gaussian Stack Construction</h4>
                  
                  <p className="text-gray-700 mb-4">
                    The Gaussian stack was built by repeatedly applying a Gaussian blur, producing progressively smoother versions of the image.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    The construction process follows this iterative approach:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700 font-mono">
                      <li>• <strong>Level 0:</strong> G<sub>0</sub> = Original Image</li>
                      <li>• <strong>Level 1:</strong> G<sub>1</sub> = G<sub>0</sub> ∗ G<sub>σ</sub></li>
                      <li>• <strong>Level 2:</strong> G<sub>2</sub> = G<sub>1</sub> ∗ G<sub>σ</sub></li>
                      <li>• <strong>Level n:</strong> G<sub>n</sub> = G<sub>n-1</sub> ∗ G<sub>σ</sub></li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Each level represents the image at a different degree of smoothness, with higher levels containing increasingly coarse features while eliminating fine details.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Laplacian Stack Computation</h4>
                  
                  <p className="text-gray-700 mb-4">
                    The Laplacian stack was then computed as the difference between consecutive Gaussian levels, isolating details at different frequency bands. The final level is simply the coarsest Gaussian image.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    The mathematical formulation is:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700 font-mono">
                      <li>• <strong>Level 0:</strong> L<sub>0</sub> = G<sub>0</sub> - G<sub>1</sub></li>
                      <li>• <strong>Level 1:</strong> L<sub>1</sub> = G<sub>1</sub> - G<sub>2</sub></li>
                      <li>• <strong>Level n-1:</strong> L<sub>n-1</sub> = G<sub>n-1</sub> - G<sub>n</sub></li>
                      <li>• <strong>Final level:</strong> L<sub>n</sub> = G<sub>n</sub> (coarsest Gaussian)</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Each Laplacian level captures the <strong>frequency band</strong> that was removed when going from one Gaussian level to the next, effectively creating a <strong>bandpass filter</strong> representation of the image.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Step Mask Implementation</h4>
                  
                  <p className="text-gray-700 mb-4">
                    To blend the apple and orange images, I created a vertical step mask that transitions smoothly from one image to the other. The mask implementation uses a gradual transition zone to avoid harsh boundaries.
                  </p>
                  
                  
                  
                  <p className="text-gray-700 mb-4">
                    The mask starts with value 1 on the left half (selecting the apple) and 0 on the right half (selecting the orange). The key is the <strong>smooth transition zone</strong> in the center, where the mask values gradually change from 1 to 0 using a linear interpolation, serving as a "step function". This creates a seamless blend between the two images rather than a sharp vertical line.
                  </p>
                </div>

                
                
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage('/src/assets/project2/2.3_blending_mask.png')}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src="/src/assets/project2/2.3_blending_mask.png"
                          alt="Step mask with smooth transition zone for blending apple and orange images"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Blend mask with 0.05 transition zone around the middle
                      </p>
                    </div>
                  </div>
                

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Stack Analysis: Apple, Orange, and Oraple</h4>
                  
                  <p className="text-gray-700 mb-4">
                    Applied to the apple, orange, and blended "Oraple" images, the stacks clearly show how different frequency components are distributed across levels. I used sigma = 5 for the Gaussian stack and the Laplacian stack in the run below as the outcome came closest to the outcomes in <a href="https://www.dropbox.com/scl/fi/p33rod69w6tf61etn4ijr/SzeliskiBookDraft_20210828.pdf?rlkey=n4w0939o5s5jq09urfb1rl57i&e=1&dl=0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Figure 3.42 in Szelski (Ed 2)</a>.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(stacks23)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={stacks23}
                          alt="Gaussian and Laplacian stacks analysis showing apple, orange, and blended Oraple across different frequency levels"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Gaussian and Laplacian stacks for apple, orange, and blended Oraple images
                      </p>
                    </div>
                  </div>
                   
                   
                 </div>
               </div>
            </div>

            <div id="part2-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.4: Multiresolution Blending (a.k.a. the oraple!)</h3>
              
              <p className="text-gray-700 mb-4">
                With the help of the Laplacian stack from above, it is possible to make some cool image blending!
              </p>

              <div className="relative">
                {/* Carousel Container */}
                <div 
                  id="blending-carousel"
                  className="overflow-x-auto pb-6 carousel-scrollbar"
                  onMouseEnter={() => setIsCarouselHovered(true)}
                  onMouseLeave={() => setIsCarouselHovered(false)}
                >
                  <div className="flex gap-8 min-w-max px-6">
                    {/* Oraple Image */}
                    <div 
                      className="bg-white p-6 rounded-xl border flex-shrink-0 w-96 cursor-pointer hover:opacity-90 transition-all duration-300 group hover:shadow-xl hover:scale-105"
                      onClick={() => setFullscreenImage(myOrapple24)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={myOrapple24}
                          alt="Apple and orange multiresolution blending result - the famous Oraple"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="h-5 w-5 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <p className="text-base text-gray-700 mt-4 text-center font-semibold">
                        The Oraple
                      </p>
                    </div>
                    
                    {/* Vertical Surfboard */}
                    <div 
                      className="bg-white p-6 rounded-xl border flex-shrink-0 w-96 cursor-pointer hover:opacity-90 transition-all duration-300 group hover:shadow-xl hover:scale-105"
                      onClick={() => setFullscreenImage(verticalSurfboard24)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={verticalSurfboard24}
                          alt="Vertical surfboard multiresolution blending example"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="h-5 w-5 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <p className="text-base text-gray-700 mt-4 text-center font-semibold">
                        Vertical Surfboard
                      </p>
                    </div>
                    
                    {/* Horizontal Surfboard */}
                    <div 
                      className="bg-white p-6 rounded-xl border flex-shrink-0 w-96 cursor-pointer hover:opacity-90 transition-all duration-300 group hover:shadow-xl hover:scale-105"
                      onClick={() => setFullscreenImage(horizontalSurfboard24)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={horizontalSurfboard24}
                          alt="Horizontal surfboard multiresolution blending example"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="h-5 w-5 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <p className="text-base text-gray-700 mt-4 text-center font-semibold">
                        Horizontal Surfboard
                      </p>
                    </div>
                    
                    {/* Watermelon */}
                    <div 
                      className="bg-white p-6 rounded-xl border flex-shrink-0 w-96 cursor-pointer hover:opacity-90 transition-all duration-300 group hover:shadow-xl hover:scale-105"
                      onClick={() => setFullscreenImage(watermelonMouth24)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={watermelonMouth24}
                          alt="Creative watermelon with mouth multiresolution blending example"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="h-5 w-5 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <p className="text-base text-gray-700 mt-4 text-center font-semibold">
                        Watermelon with Mouth
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Auto-scroll indicator */}
                <div className="flex justify-center mt-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="italic">Auto-scrolling • Hover to pause</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-16">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Process: Watermelon with Mouth Example</h4>
                
                <p className="text-gray-700 mb-4">
                  With the example of the <strong>"Watermelon with mouth"</strong> I will show how image blending works step by step:
                </p>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 mb-4">
                      <strong>1.</strong> As a first step, the two desired images have to be aligned in the way they should be merged, which I did with the given alignment code.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-4">
                      <strong>2.</strong> After that, I had to define the blending filter.
                    </p>
                    
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-6">
                      <li>For the first three examples this is pretty easy, as you just pick a vertical or horizontal line at the position of blending.</li>
                      <li>For the watermelon and the mouth this is a bit trickier, as you need a mask that has the form of the mouth, essentially an irregular mask.</li>
                    </ul>
                    
                    <p className="text-gray-700 mb-4">
                      To create this, I converted the mouth to grayscale and, with a threshold, assigned all white pixels to background and all other pixels to the mask.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      As there were still some artifacts, I used morphological opening to remove the noise and morphological closing to fill in the holes.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      To make the edges smoother, one must then convert the harsh edge of the filter into a step function that has a "smooth transition."
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      In the end the filter looked like this:
                    </p>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-md cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage('/src/assets/project2/2.4_mouth mask.png')}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src="/src/assets/project2/2.4_mouth mask.png"
                            alt="Mouth mask used for watermelon blending"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Mouth mask for watermelon blending
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-4">
                      <strong>3.</strong> Then you build up a Laplacian stack of the two images you want to blend (I used sigma = 2 and a stack size of 6).
                    </p>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage('/src/assets/project2/2.4_watermelon_laplace.png')}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src="/src/assets/project2/2.4_watermelon_laplace.png"
                            alt="Watermelon Laplacian stack for blending"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Watermelon Laplacian stack
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage('/src/assets/project2/2.4_mouth_laplace.png')}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src="/src/assets/project2/2.4_mouth_laplace.png"
                            alt="Mouth Laplacian stack for blending"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Mouth Laplacian stack
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-4">
                      <strong>4.</strong> As well as a Gaussian stack of the mask.
                    </p>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage('/src/assets/project2/2.4_mask_gaussian.png')}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src="/src/assets/project2/2.4_mask_gaussian.png"
                            alt="Gaussian stack of the mouth mask"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Gaussian stack of the mask
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-4">
                      <strong>5.</strong> In the end, you blend these together with the following formula:
                    </p>
                    
                    <div className="bg-white p-6 rounded-lg border mb-6">
                      <div className="text-center font-mono text-lg">
                        L<sub>blended</sub>[i] = M<sub>G</sub>[i] · L<sub>A</sub>[i] + (1 - M<sub>G</sub>[i]) · L<sub>B</sub>[i]
                      </div>
                      <div className="text-center text-sm text-gray-600 mt-3">
                        where i represents each level of the Laplacian stack
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-700">
                        <p className="mb-2"><strong>Where:</strong></p>
                        <ul className="space-y-1 ml-4">
                          <li>• <strong>L<sub>blended</sub>[i]</strong> = Blended result at stack level i</li>
                          <li>• <strong>M<sub>G</sub>[i]</strong> = Gaussian-blurred mask at level i</li>
                          <li>• <strong>L<sub>A</sub>[i]</strong> = Laplacian of image A at level i</li>
                          <li>• <strong>L<sub>B</sub>[i]</strong> = Laplacian of image B at level i</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage('/src/assets/project2/2.4_merge_laplace.png')}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src="/src/assets/project2/2.4_merge_laplace.png"
                            alt="Merged Laplacian stack showing the blending process"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Merged Laplacian stack
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-4">
                      And end up with this result:
                    </p>
                    
                    <div className="mb-6 flex justify-center">
                      <div 
                        className="bg-white p-4 rounded-lg border max-w-md cursor-pointer hover:opacity-80 transition-opacity group"
                        onClick={() => setFullscreenImage('/src/assets/project2/2.4_watermelonwithmouth.png')}
                        title="Click to view fullscreen"
                      >
                        <div className="relative">
                          <img 
                            src="/src/assets/project2/2.4_watermelonwithmouth.png"
                            alt="Final watermelon with mouth blending result"
                            className="w-full h-auto rounded"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Final watermelon with mouth result
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Part 2 Takeaways</h3>
                
                <div className="max-w-3xl mx-auto">
                  <div className="space-y-4 text-gray-700">
                    <p>• <strong>Unsharp masking</strong> enhances image sharpness by extracting high-frequency details (original - blurred) and adding them back to the original with amplification, but cannot recover information lost during blurring</p>
                    
                    <p>• <strong>Frequency domain separation</strong> allows sophisticated image manipulation by treating images as combinations of low-frequency (smooth) and high-frequency (detailed) components that can be independently processed</p>
                    
                    <p>• <strong>Hybrid images</strong> exploit human visual perception by combining low frequencies from one image with high frequencies from another, creating distance-dependent visual interpretations</p>
                    
                    <p>• <strong>Gaussian stacks</strong> create multi-scale image representations through iterative smoothing, while Laplacian stacks isolate frequency bands by computing differences between consecutive Gaussian levels</p>
                    
                    <p>• <strong>Multiresolution blending</strong> produces seamless image composites by blending corresponding frequency bands separately using smooth mask transitions, avoiding artifacts that occur with direct pixel blending</p>
                                        
                    <p>• <strong>Smooth mask transitions</strong> are crucial for natural-looking blends - sharp mask edges create visible seams, while gradual transitions using Gaussian-blurred masks ensure seamless frequency domain merging</p>
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
          <h3 className="text-xl font-semibold text-white mb-2">CS180 Project 2</h3>
          <p className="text-gray-400 mb-6">
            Fun with Filters and Frequencies! - From edge detection with convolutions to image enhancement with frequency domain techniques
          </p>
          <SocialLinks className="justify-center" iconSize={24} />
        </div>
      </footer>

      {/* Fullscreen Modal */}
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

            {/* Centered image */}
            <div className="flex items-center justify-center h-full">
              <div className="bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden max-w-full max-h-full p-4">
                <img 
                  src={fullscreenImage}
                  alt="Fullscreen view"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const fallback = target.nextElementSibling as HTMLElement;
                    target.style.display = 'none';
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="text-center text-gray-400 hidden">
                  <p>Image Loading Error</p>
                  <p className="text-sm">(Image could not be loaded)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project2;
