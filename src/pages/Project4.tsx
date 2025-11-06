import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SocialLinks } from '@/components/SocialLinks';
import {
  Image as ImageIcon,
  Home,
  Grid,
  Eye,
  Zap,
  X,
  Maximize2,
  Sparkles,
  Camera,
  Box,
  Layers
} from 'lucide-react';
import mountainHero from '@/assets/mountain-hero.jpg';
import bearIcon from '@/assets/bear-icon.png';
import frustumVisOverview from '@/assets/project4/0_1.png';
import frustumVisClose from '@/assets/project4/0_2.png';
import foxOriginal from '@/assets/project4/1_fox_original.jpg';
import goldenGateOriginal from '@/assets/project4/1_golden_gate_original.jpg';
import foxProgression from '@/assets/project4/1_fox_progression.png';
import goldenGateProgression from '@/assets/project4/1_gg_progression.png';
import foxGrid from '@/assets/project4/1_fox_grid.png';
import goldenGateGrid from '@/assets/project4/1_gg_grid.png';
import foxPsarCurve from '@/assets/project4/1_fox_loss.png';
import goldenGatePsarCurve from '@/assets/project4/1_gg_loss.png';
import rayVisualization from '@/assets/project4/2_ray_vis.png';
import part2TrainingProgression from '@/assets/project4/2_training_progression.png';
import part2PsarCurve from '@/assets/project4/2_psnr_curve.png';
import legoRenderGif from '@/assets/project4/2_rendering_video.gif';

const Project4 = () => {
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
    { id: 'part0', title: 'Part 0: Camera Calibration & 3D Scan', icon: <Camera className="h-4 w-4" /> },
    { id: 'part0-1', title: '0.1: Calibrating Your Camera', icon: <Grid className="h-4 w-4" /> },
    { id: 'part0-2', title: '0.2: Capturing a 3D Object Scan', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'part0-3', title: '0.3: Estimating Camera Pose', icon: <Zap className="h-4 w-4" /> },
    { id: 'part0-4', title: '0.4: Undistorting & Creating Dataset', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'part1', title: 'Part 1: Neural Field to 2D Image', icon: <Layers className="h-4 w-4" /> },
    { id: 'part2', title: 'Part 2: Neural Radiance Field', icon: <Box className="h-4 w-4" /> },
    { id: 'part2-1', title: '2.1: Create Rays from Cameras', icon: <Grid className="h-4 w-4" /> },
    { id: 'part2-2', title: '2.2: Sampling', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'part2-3', title: '2.3: Dataloading', icon: <Zap className="h-4 w-4" /> },
    { id: 'part2-4', title: '2.4: Neural Radiance Field', icon: <Layers className="h-4 w-4" /> },
    { id: 'part2-5', title: '2.5: Volume Rendering', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'part2-6', title: '2.6: Training with Your Data', icon: <Sparkles className="h-4 w-4" /> },
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
                <span className="text-lg font-bold text-nav-green">Project 4</span>
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
            const isMainSection = ['overview', 'part0', 'part1', 'part2'].includes(item.id);
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
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all"
              title="Close (Esc)"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="absolute top-4 right-16 z-10 bg-black bg-opacity-50 rounded-lg px-3 py-1 text-white text-sm">
              Press <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Esc</kbd> to close
            </div>

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
        {/* Background pattern - placeholder for future images */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-2 md:grid-cols-3 h-full gap-2 p-4">
            {/* TODO: Add background images when available */}
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Neural Radiance Field!
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Neural Radiance Field (NeRF) Project</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              {/* TODO: Add project overview content */}
              Content coming soon...
            </p>
          </div>
        </div>
      </section>

      {/* Part 0: Camera Calibration & 3D Scan */}
      <section id="part0" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part 0: Calibrating Your Camera and Capturing a 3D Scan</h2>
          
          <div className="space-y-12">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Task 0 was all about getting a clean dataset ready for the next parts. I calibrated my phone camera with a ArUco board, filmed a smooth loop around a tabletop object, used COLMAP to recover the camera poses, and exported undistorted images that I will use later when training NeRF.
              </p>

              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What I did</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Took calibration photos to estimate focal length, principal point, and lens distortion.</li>
                  <li>• Shot a turntable-style video with steady spacing between viewpoints.</li>
                  <li>• Ran COLMAP to solve for the camera positions and sparse point cloud.</li>
                  <li>• Exported undistorted images in the format expected by the rest of the project.</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Camera Frustum Visualizations</h3>
              <p className="text-gray-700 mb-6">
                The COLMAP results line up across views. These Viser screenshots show the recovered camera frustums evenly surrounding the object.
              </p>
              <div className="space-y-6">
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(frustumVisOverview)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={frustumVisOverview}
                    alt="Viser overview of reconstructed camera frustums"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Frustums – Orbit View</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>

                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(frustumVisClose)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={frustumVisClose}
                    alt="Viser close-up of recovered camera frustums"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Frustums – Close View</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              </div>
            </div>

            <div id="part0-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 0.1: Calibrating Your Camera</h3>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                I shot the checkerboard/ArUco target from different angles and used OpenCV's aruco tools to estimate fx, fy, cx, cy, plus the lens distortion terms. The saved calibration.json is used by COLMAP and later training scripts.
              </p>
            </div>

            <div id="part0-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 0.2: Capturing a 3D Object Scan</h3>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                With the camera calibrated, I walked around the object and captured evenly spaced photos, trying to keep the motion smooth and the distance to the object steady.
              </p>
            </div>

            <div id="part0-3">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 0.3: Estimating Camera Pose</h3>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                I fed the images and calibration file into COLMAP's sparse reconstruction. It solved for the camera poses, which match the frustum views shown above.
              </p>
            </div>

            <div id="part0-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 0.4: Undistorting images and creating a dataset</h3>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                Lastly, I exported the COLMAP outputs and undistorted image set into the folder layout required by the assignment so they are ready for the next parts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 1: Neural Field to 2D Image */}
      <section id="part1" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part 1: Fit a Neural Field to a 2D Image</h2>
          
          <div className="space-y-12">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                I trained a small neural network to memorize RGB values for every pixel in an image. The network takes in normalized (x, y) coordinates, applies sinusoidal positional encoding, and feeds the result through a four-layer MLP. During training I sample 10k pixels per step, predict their colors, and minimize MSE with Adam. Tracking PSNR makes it easy to see the reconstruction improve over roughly 2,000 iterations.
              </p>

              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Model & Training Setup</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Hyperparameters</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Batch size (pixels per step): 10,000</li>
                      <li>• Training steps: 2,000</li>
                      <li>• Learning rate: 0.01 (Adam)</li>
                      <li>• Hidden width: 256</li>
                      <li>• Positional encoding L: 10</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">MLP Architecture</h4>
                    <p className="text-gray-700 leading-relaxed">
                      MLP(
                      <br />fc1: Linear(42 → 256)
                      <br />fc2: Linear(256 → 256)
                      <br />fc3: Linear(256 → 256)
                      <br />fc4: Linear(256 → 3, Sigmoid)
                      )
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Inputs are 42-D PE-encoded coords; outputs are normalized RGB values.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Reference & Custom Images</h3>
              <p className="text-gray-700 mb-6">
                I trained on the provided fox image and a photo of the Golden Gate Bridge to compare outputs across two scenes.
              </p>
              <div className="space-y-6">
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(foxOriginal)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={foxOriginal}
                    alt="Original fox image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Fox – Original</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(goldenGateOriginal)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={goldenGateOriginal}
                    alt="Original Golden Gate image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Golden Gate – Original</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Progression</h3>
              <p className="text-gray-700 mb-6">
                Snapshots every few hundred steps show the network gradually filling in color and detail for both scenes.
              </p>
              <div className="space-y-6">
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(foxProgression)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={foxProgression}
                    alt="Training progression for fox image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Fox – Training Steps</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(goldenGateProgression)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={goldenGateProgression}
                    alt="Training progression for Golden Gate image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Golden Gate – Training Steps</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Positional Encoding & Width Sweep</h3>
              <p className="text-gray-700 mb-6">
                Final outputs while sweeping the hidden width and PE frequency show how capacity and frequency control sharpness and fine detail.
              </p>
              <div className="space-y-6">
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(foxGrid)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={foxGrid}
                    alt="Hyperparameter sweep results for fox image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Fox – Width × L Grid</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(goldenGateGrid)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={goldenGateGrid}
                    alt="Hyperparameter sweep results for Golden Gate image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Golden Gate – Width × L Grid</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">PSNR Curves</h3>
              <p className="text-gray-700 mb-6">
                PSNR climbs quickly during the first 500 steps and slowly plateaus as the network reaches a close fit.
              </p>
              <div className="space-y-6">
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(foxPsarCurve)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={foxPsarCurve}
                    alt="PSNR curve for fox image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Fox – PSNR</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(goldenGatePsarCurve)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={goldenGatePsarCurve}
                    alt="PSNR curve for Golden Gate image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Golden Gate – PSNR</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Neural Radiance Field */}
      <section id="part2" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part 2: Fit a Neural Radiance Field from Multi-view Images</h2>
          
          <div className="space-y-12">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Building on the 2D neural field, I implemented the full NeRF pipeline for the Lego dataset. The workflow loads calibrated camera poses, fires rays through every pixel, samples points along those rays, predicts density and color with a NeRF network, and then volume-renders the results to compare against the reference frames.
              </p>
            </div>

            <div id="part2-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.1: Create Rays from Cameras</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                I added utilities to convert pixel centers into world-space rays. Each step inverts the intrinsics, lifts the point into homogeneous camera coordinates, applies the camera-to-world matrix, and normalizes the resulting direction vector. Unit checks confirmed the transforms were numerically stable.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Dataset loader normalizes RGB values and caches camera poses plus intrinsics.</li>
                <li>• <span className="font-medium">pixel_to_camera</span> inverts K to place UVs on the image plane at a chosen depth.</li>
                <li>• <span className="font-medium">transform</span> applies the pose and separates the ray origin and direction.</li>
              </ul>
            </div>

            <div id="part2-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.2: Sampling</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The <span className="font-medium">MultiImageRayDataset</span> randomly picks images and pixel indices, converts them to ray origins and directions, and returns the matching RGB targets. A helper dataloader wraps it so every training step receives fresh ray batches. Another routine samples evenly spaced depth values between near and far bounds and, when requested, perturbs them for stratified sampling.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Cache image tensors and camera poses for quick random access.</li>
                <li>• Draw 10k pixel coordinates per iteration to stay within GPU memory.</li>
                <li>• Generate world-space points by adding depth-scaled ray directions to the shared origin.</li>
              </ul>
            </div>

            <div id="part2-3">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.3: Putting the Dataloading All Together</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                To remove redundant ray math, I precomputed every ray once. <span className="font-medium">RaysData</span> builds a meshgrid of pixel centers for each frame, converts them to origins, directions, and RGB targets, and flattens the results. Sampling then becomes a simple gather operation over those cached tensors.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Meshgrid UV centers per image, add 0.5 offsets, and convert to rays.</li>
                <li>• Concatenate all ray tuples into contiguous tensors on the desired device.</li>
                <li>• <span className="font-medium">sample_rays</span> performs fast batched indexing during training.</li>
              </ul>
            </div>

            <div id="part2-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.4: Neural Radiance Field</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The NeRF network uses sinusoidal positional encoding for both spatial coordinates and view directions. Four ReLU layers process the position features, a skip connection reintroduces the original encoding, and three more layers produce a shared feature vector. One branch predicts density (clamped positive), while the color branch squeezes through a bottleneck, injects the encoded view direction, and outputs sigmoid RGB values.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Position encoding lifts 3D points to 63 channels; direction encoding adds 24 more features.</li>
                <li>• Skip connection after layer four improves gradient flow for high-frequency detail.</li>
                <li>• Separate density and color heads mirror the original NeRF design.</li>
              </ul>
            </div>

            <div id="part2-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.5: Volume Rendering</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The renderer converts densities into alpha values, accumulates transmittance down the ray, and blends the predicted colors. Storing intermediate transmittance values in a list avoids in-place operations that would break autograd. The routine returns both the rendered color and the per-sample weights for later use.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Alpha = 1 − exp(−σ × step) for each sampled point.</li>
                <li>• Transmittance multiplies (1 − alpha) cumulatively to model light falloff.</li>
                <li>• Weighted sum of colors recreates the pixel intensity used in the loss.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ray & Sample Visualization</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A debugging pass renders up to 100 randomly chosen rays for a single camera. It overlays their origins and sampled points in world space, which helped verify that near/far bounds and pose transforms were behaving correctly.
              </p>
              <div className="space-y-6">
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(rayVisualization)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={rayVisualization}
                    alt="Visualization of sampled rays and points"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Lego – Rays & Samples</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Progression</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Periodic renders from the validation set show the NeRF sharpening over time. Early iterations capture coarse geometry while later ones refine lighting and brick details.
              </p>
              <div className="space-y-6">
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(part2TrainingProgression)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={part2TrainingProgression}
                    alt="Training progression renders for the Lego scene"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Lego – Training Steps</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Validation PSNR</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Monitoring PSNR on held-out views confirms steady progress. The curve climbs quickly during the warm-up phase and then plateaus once the network overfits fine details.
              </p>
              <div className="space-y-6">
                <div
                  className="relative rounded-xl overflow-hidden border bg-card/30 cursor-pointer group"
                  onClick={() => setFullscreenImage(part2PsarCurve)}
                  title="Click to view fullscreen"
                >
                  <img
                    src={part2PsarCurve}
                    alt="PSNR curve on the Lego validation set"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-sm text-white font-medium">Lego – Validation PSNR</div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Spherical Render</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Rendering the final model along the provided camera path produces a smooth orbit around the Lego scene, highlighting the recovered 3D structure and consistent lighting.
              </p>
              <div className="space-y-6">
                <div className="relative rounded-xl overflow-hidden border bg-card/30">
                  <img
                    src={legoRenderGif}
                    alt="Spherical orbit render of the Lego NeRF"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div id="part2-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Part 2.6: Training with your own data</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                After validating on the Lego splits, I reused the same dataloading, sampling, and rendering stack on my captured scene. The only changes were pointing the loader at my COLMAP outputs and adjusting near/far bounds to match the new capture volume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <div className="mt-16 text-center">
            <SocialLinks />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Project4;
