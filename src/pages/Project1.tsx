import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AssignmentSection } from '@/components/AssignmentSectionNew';
import { Camera, Palette, Pyramid, Zap, AlertTriangle, CheckCircle, XCircle, Crown, Train, Layers, ArrowRight, X, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mountainHero from '@/assets/mountain-hero.jpg';
import bearIcon from '@/assets/bear-icon.png';


// Import unaligned images
import boyUnaligned from '@/assets/project1/unaligned/boy.jpeg';
import camelUnaligned from '@/assets/project1/unaligned/camel.jpeg';
import cathedralUnaligned from '@/assets/project1/unaligned/cathedral.jpg';
import churchUnaligned from '@/assets/project1/unaligned/church.jpeg';
import emirUnaligned from '@/assets/project1/unaligned/emir.jpeg';
import harvestersUnaligned from '@/assets/project1/unaligned/harvesters.jpeg';
import iconUnaligned from '@/assets/project1/unaligned/icon.jpeg';
import italilUnaligned from '@/assets/project1/unaligned/italil.jpeg';
import lastochikinoUnaligned from '@/assets/project1/unaligned/lastochikino.jpeg';
import luganoUnaligned from '@/assets/project1/unaligned/lugano.jpeg';
import melonsUnaligned from '@/assets/project1/unaligned/melons.jpeg';
import monasteryUnaligned from '@/assets/project1/unaligned/monastery.jpg';
import selfPortraitUnaligned from '@/assets/project1/unaligned/self_portrait.jpeg';
import sirenUnaligned from '@/assets/project1/unaligned/siren.jpeg';
import threeGenerationsUnaligned from '@/assets/project1/unaligned/three_generations.jpeg';
import tobolskUnaligned from '@/assets/project1/unaligned/tobolsk.jpg';
import tradDressUnaligned from '@/assets/project1/unaligned/trad_dress.jpeg';
import waterUnaligned from '@/assets/project1/unaligned/water.jpeg';

// Import aligned images
import boyAligned from '@/assets/project1/ncc/boy.jpeg';
import camelAligned from '@/assets/project1/ncc/camel.jpeg';
import cathedralAligned from '@/assets/project1/ncc/cathedral.jpg';
import churchAligned from '@/assets/project1/ncc/church.jpeg';
import emirAligned from '@/assets/project1/ncc/emir.jpeg';
import harvestersAligned from '@/assets/project1/ncc/harvesters.jpeg';
import iconAligned from '@/assets/project1/ncc/icon.jpeg';
import italilAligned from '@/assets/project1/ncc/italil.jpeg';
import lastochikinoAligned from '@/assets/project1/ncc/lastochikino.jpeg';
import luganoAligned from '@/assets/project1/ncc/lugano.jpeg';
import melonsAligned from '@/assets/project1/ncc/melons.jpeg';
import monasteryAligned from '@/assets/project1/ncc/monastery.jpg';
import selfPortraitAligned from '@/assets/project1/ncc/self_portrait.jpeg';
import sirenAligned from '@/assets/project1/ncc/siren.jpeg';
import threeGenerationsAligned from '@/assets/project1/ncc/three_generations.jpeg';
import tobolskAligned from '@/assets/project1/ncc/tobolsk.jpg';
import tradDressAligned from '@/assets/project1/ncc/trad_dress.jpeg';
import waterAligned from '@/assets/project1/ncc/water.jpeg';

// Import bells and whistles images
// Auto Contrast (Gamma correction)
import camelAutoContrast from '@/assets/project1/auto_contrast/camel.jpeg';
import emirAutoContrast from '@/assets/project1/auto_contrast/emir.jpeg';
import luganoAutoContrast from '@/assets/project1/auto_contrast/lugano.jpeg';

// Auto Cropped
import camelAutoCropped from '@/assets/project1/auto_cropped/camel.jpeg';
import emirAutoCropped from '@/assets/project1/auto_cropped/emir.jpeg';
import luganoAutoCropped from '@/assets/project1/auto_cropped/lugano.jpeg';

// Auto White Balance
import camelAutoWhiteBalance from '@/assets/project1/auto_white_balance/camel.jpeg';
import emirAutoWhiteBalance from '@/assets/project1/auto_white_balance/emir.jpeg';
import luganoAutoWhiteBalance from '@/assets/project1/auto_white_balance/lugano.jpeg';

// Edge Detection (Better Features)
import gradientEdgeDetection from '@/assets/project1/edge_detection/gradient.png';
import sobelEdgeDetection from '@/assets/project1/edge_detection/sobel.png';

// Raw glass plate negative
import rawStripe from '@/assets/project1/raw_stripe.jpg';

// Image mapping objects for easy lookup
const unalignedImages: Record<string, string> = {
  'boy.jpeg': boyUnaligned,
  'camel.jpeg': camelUnaligned,
  'cathedral.jpg': cathedralUnaligned,
  'church.jpeg': churchUnaligned,
  'emir.jpeg': emirUnaligned,
  'harvesters.jpeg': harvestersUnaligned,
  'icon.jpeg': iconUnaligned,
  'italil.jpeg': italilUnaligned,
  'lastochikino.jpeg': lastochikinoUnaligned,
  'lugano.jpeg': luganoUnaligned,
  'melons.jpeg': melonsUnaligned,
  'monastery.jpg': monasteryUnaligned,
  'self_portrait.jpeg': selfPortraitUnaligned,
  'siren.jpeg': sirenUnaligned,
  'three_generations.jpeg': threeGenerationsUnaligned,
  'tobolsk.jpg': tobolskUnaligned,
  'trad_dress.jpeg': tradDressUnaligned,
  'water.jpeg': waterUnaligned,
};

const alignedImages: Record<string, string> = {
  'boy.jpeg': boyAligned,
  'camel.jpeg': camelAligned,
  'cathedral.jpg': cathedralAligned,
  'church.jpeg': churchAligned,
  'emir.jpeg': emirAligned,
  'harvesters.jpeg': harvestersAligned,
  'icon.jpeg': iconAligned,
  'italil.jpeg': italilAligned,
  'lastochikino.jpeg': lastochikinoAligned,
  'lugano.jpeg': luganoAligned,
  'melons.jpeg': melonsAligned,
  'monastery.jpg': monasteryAligned,
  'self_portrait.jpeg': selfPortraitAligned,
  'siren.jpeg': sirenAligned,
  'three_generations.jpeg': threeGenerationsAligned,
  'tobolsk.jpg': tobolskAligned,
  'trad_dress.jpeg': tradDressAligned,
  'water.jpeg': waterAligned,
};

// Function to get before/after images for bells and whistles features
const getBellsWhistlesImages = (featureName: string) => {
  switch (featureName) {
    case 'Automatic Contrasting':
      return [
        {
          name: 'Camel - Gamma Correction',
          before: camelAutoCropped,
          after: camelAutoContrast,
          hasImage: true
        },
        {
          name: 'Emir - Gamma Correction',
          before: emirAutoCropped,
          after: emirAutoContrast,
          hasImage: true
        },
        {
          name: 'Lugano - Gamma Correction',
          before: luganoAutoCropped,
          after: luganoAutoContrast,
          hasImage: true
        }
      ];
    case 'Automatic White Balance':
      return [
        {
          name: 'Camel - White Balance',
          before: camelAutoCropped,
          after: camelAutoWhiteBalance,
          hasImage: true  
        },
        {
          name: 'Emir - White Balance',
          before: emirAutoCropped,
          after: emirAutoWhiteBalance,
          hasImage: true  
        },
        {
          name: 'Lugano - White Balance',
          before: luganoAutoCropped,
          after: luganoAutoWhiteBalance,
          hasImage: true  
        }
      ];
    case 'Automatic Cropping':
      return [
        {
          name: 'Camel - Auto Cropped',
          before: alignedImages['camel.jpeg'],
          after: camelAutoCropped,
          hasImage: true
        },
        {
          name: 'Emir - Auto Cropped',
          before: alignedImages['emir.jpeg'],
          after: emirAutoCropped,
          hasImage: true
        },
        {
          name: 'Lugano - Auto Cropped',
          before: alignedImages['lugano.jpeg'],
          after: luganoAutoCropped,
          hasImage: true
        }
      ];
    case 'Better Color Mapping':
      return [
        {
          name: 'Color Transformation Matrix',
          before: null,
          after: null,
          hasImage: false
        }
      ];
    case 'Better Features':
      return [
        {
          name: 'Gradient-based Alignment',
          before: emirAutoCropped,
          after: gradientEdgeDetection,
          hasImage: true
        },
        {
          name: 'Edge-based Alignment (Sobel)',
          before: emirAutoCropped,
          after: sobelEdgeDetection,
          hasImage: true
        }
      ];
    default:
      return [
        {
          name: 'Default Enhancement',
          before: emirUnaligned,
          after: emirAligned,
          hasImage: true
        }
      ];
  }
};

interface ImageData {
  name: string;
  displacement: {
    r: string;
    g: string;
    b: string;
  };
  method: string;
}

interface BellsWhistlesImageData {
  name: string;
  featureName: string;
  before: string;
  after: string;
}

const Project1 = () => {
  const [fullscreenImage, setFullscreenImage] = useState<ImageData | null>(null);
  const [fullscreenBellsWhistles, setFullscreenBellsWhistles] = useState<BellsWhistlesImageData | null>(null);

  // Handle Escape key to close fullscreen modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null);
        }
        if (fullscreenBellsWhistles) {
          setFullscreenBellsWhistles(null);
        }
      }
    };

    // Add event listener when any fullscreen is open
    if (fullscreenImage || fullscreenBellsWhistles) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [fullscreenImage, fullscreenBellsWhistles]);

  // Example images with displacement vectors (aligned blue and red to green)
  const exampleImages = [
    { name: "cathedral.jpg", displacement: { r: "(1, 7)", g: "(0, 0)", b: "(-2, -5)" }, success: true, method: "naive" },
    { name: "monastery.jpg", displacement: { r: "(1, 6)", g: "(0, 0)", b: "(-2, 3)" }, success: true, method: "naive" },
    { name: "tobolsk.jpg", displacement: { r: "(1, 4)", g: "(0, 0)", b: "(-3, -3)" }, success: true, method: "naive" },
    { name: "church.jpeg", displacement: { r: "(-8, 33)", g: "(0, 0)", b: "(-4, -25)" }, success: true, method: "pyramid" },
    { name: "emir.jpeg", displacement: { r: "(17, 57)", g: "(0, 0)", b: "(-24, -49)" }, success: true, method: "pyramid" },
    { name: "harvesters.jpeg", displacement: { r: "(-3, 65)", g: "(0, 0)", b: "(-17, -59)" }, success: true, method: "pyramid" },
    { name: "icon.jpeg", displacement: { r: "(5, 48)", g: "(0, 0)", b: "(-17, -41)" }, success: true, method: "pyramid" },
    { name: "italil.jpeg", displacement: { r: "(15, 38)", g: "(0, 0)", b: "(-21, -38)" }, success: true, method: "pyramid" },
    { name: "melons.jpeg", displacement: { r: "(3, 96)", g: "(0, 0)", b: "(-10, -81)" }, success: true, method: "pyramid" },
    { name: "lugano.jpeg", displacement: { r: "(-13, 52)", g: "(0, 0)", b: "(16, -41)" }, success: true, method: "pyramid" },
    { name: "lastochikino.jpeg", displacement: { r: "(-7, 78)", g: "(0, 0)", b: "(2, 2)" }, success: true, method: "pyramid" },
    { name: "self_portrait.jpeg", displacement: { r: "(8, 98)", g: "(0, 0)", b: "(-29, -78)" }, success: true, method: "pyramid" },
    { name: "three_generations.jpeg", displacement: { r: "(-3, 59)", g: "(0, 0)", b: "(-13, -52)" }, success: true, method: "pyramid" },
    { name: "siren.jpeg", displacement: { r: "(-19, 47)", g: "(0, 0)", b: "(6, -49)" }, success: true, method: "pyramid" }
  ];

  // Additional images from Prokudin-Gorskii collection
  const additionalImages = [
    { name: "camel.jpeg", displacement: { r: "(7, 60)", g: "(0, 0)", b: "(-21, -56)" } },
    { name: "boy.jpeg", displacement: { r: "(2, 57)", g: "(0, 0)", b: "(12, -39)" } },
    { name: "water.jpeg", displacement: { r: "(-9, 67)", g: "(0, 0)", b: "(7, -15)" } },
    { name: "trad_dress.jpeg", displacement: { r: "(15, 59)", g: "(0, 0)", b: "(-39, -48)" } }
  ];

  const bellsWhistles = [
    {
      name: "Automatic Cropping",
      description: "Intelligent border detection and removal using pixel intensity analysis",
      implemented: true,
      details: `I initially attempted edge detection using variance, but this approach didn't yield reliable results. Instead, I developed a method that analyzes the percentage of white/black pixels in columns and rows from all sides of the image. The algorithm crops away borders when the percentage exceeds a specific threshold. 

A key challenge emerged when integrating this with the alignment algorithm - the cropped images had mismatched dimensions. I solved this by implementing a helper function that crops all channels to the maximum border cutoff, ensuring consistent dimensions across RGB channels.`,
      problems: "Requires careful hyperparameter tuning. Sometimes crops too aggressively or too conservatively depending on the image content."
    },
    {
      name: "Automatic Contrasting", 
      description: "Multi-stage contrast enhancement using linear normalization, gamma correction, and histogram equalization",
      implemented: true,
      details: `I implemented a three-stage contrast enhancement pipeline:

1. **Linear Normalization**: Rescaled all pixels so the darkest pixel becomes 0 and the brightest becomes 1. However, this linear approach had minimal visual impact.

2. **Gamma Correction**: Applied non-linear transformation to correct for human brightness perception and display characteristics.

3. **Histogram Equalization**: This proved most effective, significantly improving contrast by redistributing pixel intensities across the full dynamic range.`,
      problems: "Results are image-dependent. Works excellently on images like cathedral.jpg but produces unnatural-looking results on others like tobolsk.jpg."
    },
    {
      name: "Automatic White Balance",
      description: "Hybrid approach combining Robust Gray World and White Patch assumptions",
      implemented: true,
      details: `I attempted multiple white balance strategies:

Initially tried the simple Gray World assumption, but results were overly white and unnatural.

Then implemented a sophisticated hybrid approach:
1. **Robust Gray World Assumption**: Uses 10th-90th percentile pixel values instead of mean to avoid outliers (dust, scratches, blown highlights)
2. **White Patch Assumption**: Identifies brightest 5% of pixels as potential white/neutral regions
3. **Combination Strategy**: Weighted average (70% gray world, 30% white patch) to calculate scaling factors

This hybrid method was designed specifically for historical glass plate negatives with uneven illumination and color casts.`,
      problems: "Despite the sophisticated approach, results still appear overly white. The method needs further refinement for these historical images."
    },
    {
      name: "Better Color Mapping",
      description: "Empirically-derived color transformation matrix based on ground truth comparison",
      implemented: true,
      details: `I developed a custom color mapping by comparing my aligned results with a professionally restored version of the Emir image from the Library of Congress. Using a tool with interactive sliders, I empirically determined optimal color transformation coefficients:

• **RGB Red** = 0.88 × RedPlate + 0.00 × GreenPlate + 0.09 × BluePlate
• **RGB Green** = 0.00 × RedPlate + 1.00 × GreenPlate + 0.00 × BluePlate  
• **RGB Blue** = 0.00 × RedPlate + 0.08 × GreenPlate + 0.81 × BluePlate

This transformation accounts for the fact that Prokudin-Gorskii's glass plate filters didn't capture pure RGB channels but had spectral overlap and different sensitivities.`,
      problems: "The transformation was optimized for the Emir image and may not generalize perfectly to all images in the collection."
    },
    {
      name: "Better Features",
      description: "Gradient-based and edge-based alignment for improved robustness",
      implemented: true,
      details: `I implemented two advanced feature-based alignment methods:

**Gradient-based Alignment**:
• Computes image gradients using np.gradient() to capture intensity changes in x and y directions
• Calculates gradient magnitude to capture edge strength regardless of direction  
• Uses normalized cross-correlation on gradient magnitudes for alignment scoring
• More robust to illumination changes than raw pixel values

**Edge-based Alignment**:
• Detects edges using Canny edge detector with thresholds (100, 200)
• Creates binary edge maps highlighting significant intensity transitions
• Uses normalized cross-correlation on edge maps for alignment scoring
• Invariant to uniform lighting changes, focusing on structural information

Both methods are superior to pixel-based alignment because they emphasize structural features rather than absolute intensity values - crucial for aligning RGB channels with different exposures or color casts.`,
      problems: "Requires careful threshold tuning for the Canny edge detector. Performance depends on the amount of edge content in the images."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 h-full">
            <div className="relative">
              <img src={emirAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={camelAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={cathedralAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={churchAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden md:block">
              <img src={harvestersAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden md:block">
              <img src={monasteryAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden lg:block">
              <img src={sirenAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden lg:block">
              <img src={threeGenerationsAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden lg:block">
              <img src={waterAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden lg:block">
              <img src={luganoAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden lg:block">
              <img src={tradDressAligned} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden lg:block">
              <img src={tobolskAligned} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Images of the Russian Empire
            </h1>
            
            <p className="text-xl mb-8 text-gray-200">
              Colorizing the Prokudin-Gorskii Photo Collection
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Demonstration Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">From Glass Plate to Color Image</h2>
            <p className="text-gray-600 text-center mb-12">The transformation process from original glass plate negative to aligned color photograph</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
              {/* Raw glass plate */}
              <div className="flex flex-col items-center text-center max-w-32 md:max-w-40">
                <div className="w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden mb-4 p-2">
                  <img 
                    src={rawStripe}
                    alt="Original glass plate negative"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Original Glass Plate</h3>
                <p className="text-sm text-gray-600">Three RGB channels stacked vertically</p>
              </div>
              
              {/* Arrow */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-gray-400" />
              </div>
              <div className="md:hidden">
                <ArrowRight className="h-6 w-6 text-gray-400 rotate-90" />
              </div>
              
              {/* Final aligned image */}
              <div className="flex flex-col items-center text-center max-w-32 md:max-w-40">
                <div className="w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden mb-4 p-2">
                  <img 
                    src={camelAligned}
                    alt="Final aligned color image"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aligned Color Image</h3>
                <p className="text-sm text-gray-600">Channels separated, aligned, and recombined</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Project Overview</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              This project implements an automatic image alignment system to colorize the digitized Prokudin-Gorskii glass plate images. 
              The algorithm extracts three color channels (RGB) from the glass plates, aligns them using computational techniques, 
              and produces vibrant color images with minimal visual artifacts. The implementation includes both single-scale 
              exhaustive search and multi-scale pyramid optimization for efficient processing of high-resolution images.
            </p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Approach</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Full Image with Border Cropping</h3>
              <p className="text-gray-700 mb-4">
                I started by using the entire image for alignment to ensure sufficient visual information for reliable correspondences between RGB channels. 
                To mitigate border artifacts while preserving visual content, I implemented a border cropping strategy - 
                removing 15% of the image from each side before computing alignment. I tested both Normalized Cross-Correlation (NCC) 
                and Euclidean distance as similarity metrics, with a ±15 pixel search window.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Results:</strong> This approach worked remarkably well for the smaller .jpg test images, producing clean alignments 
                with reasonable computation times. However, when applied to the high-resolution .tif images, two critical problems emerged:
              </p>
              <ul className="text-gray-600 list-disc list-inside space-y-1">
                <li><strong>Performance:</strong> Processing time ballooned to nearly a minute per image</li>
                <li><strong>Quality:</strong> The ±15 pixel search window was insufficient for the larger displacements in high-res images</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Final Solution: Multi-Scale Image Pyramid</h3>
              <p className="text-gray-700 mb-4">
                To address both the performance and quality issues, I implemented a coarse-to-fine image pyramid approach. 
                The algorithm uses a 3-level pyramid where each level halves the resolution of the previous one. Starting at the 
                coarsest (smallest) scale, it performs alignment with the full ±15 pixel search window, then propagates and refines 
                this estimate at each finer scale with progressively smaller search windows (minimum ±3 pixels).
              </p>
              <p className="text-gray-700 mb-4">
                This multi-scale strategy is computationally efficient because most of the heavy searching happens on small, 
                low-resolution images, while the fine-scale refinements require only local adjustments.
              </p>
              <p className="text-gray-600">
                <strong>Performance gains:</strong> Reduced processing time to approximately 45 seconds for large .tif images<br/>
                <strong>Quality improvements:</strong> Achieved excellent alignments across most test images, including challenging cases like the Emir<br/>
                <strong>Edge cases:</strong> For particularly misaligned images (melons.tif and self_portrait.tif), I expanded the initial search window to ±20 pixels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Results on Example Images</h2>
          <p className="text-gray-600 text-center mb-12">Blue and Red channels aligned to Green (reference)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exampleImages.map((img, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{img.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    img.method === 'naive' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {img.method === 'naive' ? 'naive' : 'Pyramid'}
                  </span>
                </div>
                
                {/* Image display */}
                <div 
                  className="grid grid-cols-2 gap-3 cursor-pointer hover:opacity-80 transition-opacity group"
                  onClick={() => setFullscreenImage(img)}
                  title="Click to view fullscreen comparison"
                >
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center border relative overflow-hidden">
                    <img 
                      src={unalignedImages[img.name]}
                      alt={`Unaligned ${img.name}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="text-center text-gray-500 text-sm hidden">
                      <p>Unaligned</p>
                      <p className="text-xs">(Image pending)</p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center border relative">
                    {/* Try to load the aligned image if it exists */}
                    <img 
                      src={alignedImages[img.name]}
                      alt={`Aligned ${img.name}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="text-center text-gray-500 text-sm hidden">
                      <p>Aligned</p>
                      <p className="text-xs">(Image pending)</p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                </div>
                
                {/* Displacement vectors */}
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-2">Displacement Vectors (NCC):</p>
                  <div className="space-y-1 font-mono text-xs">
                    <div>Red: {img.displacement.r}</div>
                    <div>Green: {img.displacement.g}</div>
                    <div>Blue: {img.displacement.b}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Images Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Additional Images from Prokudin-Gorskii Collection</h2>
          <p className="text-gray-600 text-center mb-12">Self-selected examples from the Library of Congress collection</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalImages.map((img, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{img.name}</h3>
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                    Pyramid
                  </span>
                </div>
                
                {/* Image display */}
                <div 
                  className="grid grid-cols-2 gap-3 cursor-pointer hover:opacity-80 transition-opacity group"
                  onClick={() => setFullscreenImage({...img, method: 'pyramid'})}
                  title="Click to view fullscreen comparison"
                >
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center border relative overflow-hidden">
                    <img 
                      src={unalignedImages[img.name]}
                      alt={`Unaligned ${img.name}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="text-center text-gray-500 text-sm hidden">
                      <p>Unaligned</p>
                      <p className="text-xs">(Image pending)</p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center border relative">
                    <img 
                      src={alignedImages[img.name.replace('.tif', '.jpg')]}
                      alt={`Aligned ${img.name}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        const target = e.currentTarget as HTMLImageElement;
                        const fallback = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="text-center text-gray-500 text-sm hidden">
                      <p>Aligned</p>
                      <p className="text-xs">(Image pending)</p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-2">Displacement Vectors (NCC):</p>
                  <div className="space-y-1 font-mono text-xs">
                    <div>Red: {img.displacement.r}</div>
                    <div>Green: {img.displacement.g}</div>
                    <div>Blue: {img.displacement.b}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bells & Whistles Results */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Bells & Whistles Implementation</h2>
          
          <div className="space-y-16">
            {bellsWhistles.map((feature, index) => (
              <div key={index}>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                    <span className={`mr-3 text-2xl ${feature.implemented ? 'text-green-600' : 'text-red-500'}`}>
                      {feature.implemented ? '✓' : '✗'}
                    </span>
                    {feature.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">{feature.description}</p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Implementation Details</h4>
                    <div className="text-gray-700 leading-relaxed prose prose-gray max-w-none">
                      <ReactMarkdown>{feature.details}</ReactMarkdown>
                    </div>
                    
                    {feature.problems && (
                      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-yellow-800">
                          <strong>Challenges:</strong> {feature.problems}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {feature.implemented && (
                  <div className="space-y-8">
                    {getBellsWhistlesImages(feature.name).map((technique, techIndex) => (
                      <div key={techIndex} className="space-y-4">
                        <h5 className="text-lg font-medium text-gray-800 text-center">{technique.name}</h5>
                        <div 
                          className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${technique.hasImage ? 'cursor-pointer hover:opacity-80 transition-opacity group' : ''}`}
                          onClick={() => technique.hasImage && setFullscreenBellsWhistles({
                            name: technique.name,
                            featureName: feature.name,
                            before: technique.before,
                            after: technique.after
                          })}
                          title={technique.hasImage ? "Click to view fullscreen comparison" : undefined}
                        >
                          <div>
                            <h4 className="font-medium text-gray-900 mb-4">{feature.name === 'Better Features' ? 'Original Image' : 'Before Enhancement'}</h4>
                            <div className="aspect-square bg-gray-100 rounded flex items-center justify-center border overflow-hidden relative">
                              {technique.hasImage ? (
                                <>
                                  <img 
                                    src={technique.before}
                                    alt={`Before ${technique.name}`}
                                    className="w-full h-full object-cover rounded"
                                    onError={(e) => {
                                      const target = e.currentTarget as HTMLImageElement;
                                      target.style.display = 'none';
                                      const parent = target.parentElement;
                                      if (parent) {
                                        parent.innerHTML = '<div class="text-center text-gray-500"><p>Image Loading Error</p><p class="text-sm mt-1">Before ' + technique.name + '</p></div>';
                                      }
                                    }}
                                  />
                                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 className="h-4 w-4 text-gray-600" />
                                  </div>
                                </>
                              ) : (
                                <div className="text-center text-gray-500">
                                  <p>Original Image</p>
                                  <p className="text-sm mt-1">Placeholder for {technique.name}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-4">{feature.name === 'Better Features' ? 'With Edge Detection' : 'After Enhancement'}</h4>
                            <div className="aspect-square bg-gray-100 rounded flex items-center justify-center border overflow-hidden relative">
                              {technique.hasImage ? (
                                <>
                                  <img 
                                    src={technique.after}
                                    alt={`After ${technique.name}`}
                                    className="w-full h-full object-cover rounded"
                                  />
                                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 className="h-4 w-4 text-gray-600" />
                                  </div>
                                </>
                              ) : (
                                <div className="text-center text-gray-500">
                                  <p>Enhanced Image</p>
                                  <p className="text-sm mt-1">Placeholder for {technique.name}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">CS180 Project 1</h3>
          <p className="text-gray-400">
            Images of the Russian Empire - Colorizing the Prokudin-Gorskii Photo Collection
          </p>
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

            {/* Image title and method */}
            <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 rounded-lg p-3 text-white">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold">{fullscreenImage.name}</h3>
                <span className={`px-2 py-1 text-xs rounded ${
                  fullscreenImage.method === 'naive' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {fullscreenImage.method === 'naive' ? 'naive' : 'Pyramid'}
                </span>
              </div>
            </div>

            {/* Side by side images */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Unaligned image */}
              <div className="flex flex-col h-full">
                <div className="bg-black bg-opacity-50 rounded-lg p-2 mb-2 text-white text-center">
                  <h4 className="font-medium">Unaligned RGB Channels</h4>
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={unalignedImages[fullscreenImage.name]}
                    alt={`Unaligned ${fullscreenImage.name}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      const fallback = target.nextElementSibling as HTMLElement;
                      target.style.display = 'none';
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="text-center text-gray-400 hidden">
                    <p>Unaligned Image</p>
                    <p className="text-sm">(Image pending upload)</p>
                  </div>
                </div>
              </div>

              {/* Aligned image */}
              <div className="flex flex-col h-full">
                <div className="bg-black bg-opacity-50 rounded-lg p-2 mb-2 text-white text-center">
                  <h4 className="font-medium">Aligned Color Result</h4>
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={alignedImages[fullscreenImage.name.replace('.tif', '.jpg').replace('.jpg', '.jpg')]}
                    alt={`Aligned ${fullscreenImage.name}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      const fallback = target.nextElementSibling as HTMLElement;
                      target.style.display = 'none';
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="text-center text-gray-400 hidden">
                    <p>Aligned Image</p>
                    <p className="text-sm">(Image pending upload)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Displacement vectors at bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-lg p-4 text-white">
              <h4 className="font-medium mb-2 text-center">Displacement Vectors (NCC)</h4>
              <div className="grid grid-cols-3 gap-4 font-mono text-sm">
                <div className="text-center">
                  <span className="text-red-400">Red:</span><br/>
                  {fullscreenImage.displacement.r}
                </div>
                <div className="text-center">
                  <span className="text-green-400">Green:</span><br/>
                  {fullscreenImage.displacement.g}
                </div>
                <div className="text-center">
                  <span className="text-blue-400">Blue:</span><br/>
                  {fullscreenImage.displacement.b}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bells & Whistles Fullscreen Modal */}
      {fullscreenBellsWhistles && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenBellsWhistles(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-screen">
            {/* Close button */}
            <button
              onClick={() => setFullscreenBellsWhistles(null)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all"
              title="Close (Esc)"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Escape key hint */}
            <div className="absolute top-4 right-16 z-10 bg-black bg-opacity-50 rounded-lg px-3 py-1 text-white text-sm">
              Press <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Esc</kbd> to close
            </div>

            {/* Image title and feature */}
            <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 rounded-lg p-3 text-white">
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-semibold">{fullscreenBellsWhistles.name}</h3>
                <span className="text-sm text-gray-300">{fullscreenBellsWhistles.featureName}</span>
              </div>
            </div>

            {/* Side by side images */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Before image */}
              <div className="flex flex-col h-full">
                <div className="bg-black bg-opacity-50 rounded-lg p-2 mb-2 text-white text-center">
                  <h4 className="font-medium">{fullscreenBellsWhistles.featureName === 'Better Features' ? 'Original Image' : 'Before Enhancement'}</h4>
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={fullscreenBellsWhistles.before}
                    alt={`Before ${fullscreenBellsWhistles.name}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      const fallback = target.nextElementSibling as HTMLElement;
                      target.style.display = 'none';
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="text-center text-gray-400 hidden">
                    <p>Before Image</p>
                    <p className="text-sm">(Image loading error)</p>
                  </div>
                </div>
              </div>

              {/* After image */}
              <div className="flex flex-col h-full">
                <div className="bg-black bg-opacity-50 rounded-lg p-2 mb-2 text-white text-center">
                  <h4 className="font-medium">{fullscreenBellsWhistles.featureName === 'Better Features' ? 'Edge Detection' : 'After Enhancement'}</h4>
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={fullscreenBellsWhistles.after}
                    alt={`After ${fullscreenBellsWhistles.name}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      const fallback = target.nextElementSibling as HTMLElement;
                      target.style.display = 'none';
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="text-center text-gray-400 hidden">
                    <p>After Image</p>
                    <p className="text-sm">(Image loading error)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhancement info at bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-lg p-4 text-white">
              <h4 className="font-medium text-center">{fullscreenBellsWhistles.featureName}</h4>
              <p className="text-sm text-center text-gray-300 mt-1">{fullscreenBellsWhistles.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project1;
