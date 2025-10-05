import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SocialLinks } from '@/components/SocialLinks';
import { AssignmentSection } from '@/components/AssignmentSectionNew';
import { Camera, Palette, Pyramid, Zap, AlertTriangle, CheckCircle, XCircle, Crown, Train, Layers, ArrowRight, X, Maximize2, Home, Eye, Grid, Sparkles } from 'lucide-react';
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

// Sobel masks visualization
import sobelMasks from '@/assets/project1/sobmasks.gif';

// Image pyramid visualization
import imagePyramid from '@/assets/project1/Image_pyramid.png';

// Raw glass plate negative
import rawStripe from '@/assets/project1/raw_stripe.jpg';

// Image Mapping (Better Color Mapping)
import mappingsVisualization from '@/assets/project1/mappings.png';
import emirImageMapped from '@/assets/project1/image_mapping/emir.jpeg';
import camelImageMapped from '@/assets/project1/image_mapping/camel.jpeg';
import luganoImageMapped from '@/assets/project1/image_mapping/lugano.jpeg';

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
          hasImage: true,
          gammaInfo: 'γ = 1.78, original mean = 0.68'
        },
        {
          name: 'Emir - Gamma Correction',
          before: emirAutoCropped,
          after: emirAutoContrast,
          hasImage: true,
          gammaInfo: 'γ = 1.07, original mean = 0.52'
        },
        {
          name: 'Lugano - Gamma Correction',
          before: luganoAutoCropped,
          after: luganoAutoContrast,
          hasImage: true,
          gammaInfo: 'γ = 1.46, original mean = 0.62'
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
          name: 'Color Mapping Comparison',
          before: mappingsVisualization,
          after: null,
          hasImage: 'matrix-only'
        },
        {
          name: 'Emir - Color Mapping',
          before: emirAutoCropped,
          after: emirImageMapped,
          hasImage: true
        },
        {
          name: 'Camel - Color Mapping',
          before: camelAutoCropped,
          after: camelImageMapped,
          hasImage: true
        },
        {
          name: 'Lugano - Color Mapping',
          before: luganoAutoCropped,
          after: luganoImageMapped,
          hasImage: true
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
  const [activeSection, setActiveSection] = useState('');
  const [activeSubsection, setActiveSubsection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<ImageData | null>(null);
  const [fullscreenBellsWhistles, setFullscreenBellsWhistles] = useState<BellsWhistlesImageData | null>(null);
  const [fullscreenMappings, setFullscreenMappings] = useState<string | null>(null);

  // Helper function to scroll to section with offset
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 80px offset for header
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  // Navigation tracking
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
        if (fullscreenMappings) {
          setFullscreenMappings(null);
        }
      }
    };

    // Add event listener when any fullscreen is open
    if (fullscreenImage || fullscreenBellsWhistles || fullscreenMappings) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [fullscreenImage, fullscreenBellsWhistles, fullscreenMappings]);

  // Naive method results (smaller .jpg images)
  const naiveImages = [
    { name: "cathedral.jpg", displacement: { r: "(1, 7)", g: "(0, 0)", b: "(-2, -5)" }, success: true, method: "naive" },
    { name: "monastery.jpg", displacement: { r: "(1, 6)", g: "(0, 0)", b: "(-2, 3)" }, success: true, method: "naive" },
    { name: "tobolsk.jpg", displacement: { r: "(1, 4)", g: "(0, 0)", b: "(-3, -3)" }, success: true, method: "naive" }
  ];

  // Pyramid method results (larger .tif images)
  const pyramidImages = [
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
      description: "Edge detection-based border removal using Sobel filtering",
      implemented: true,
      details: `To make the pictures prettier, I needed to detect and remove borders automatically rather than using a fixed margin. Initial approaches using variance analysis and pixel intensity thresholds proved unstable.

## Edge Detection Approach

**Core Concept**: Use edge detection to identify border boundaries more reliably than pixel-based methods.

**Implementation Pipeline**:

### Step 1: Image Preprocessing
- **Convert to grayscale** for uniform edge detection
- **Enhance contrast** by stretching dynamic range (ignore darkest/brightest 2% of pixels)
- **Normalize intensity** across 0-255 range to make edges more prominent

### Step 2: Sobel Edge Detection
- **Apply Sobel filter** using OpenCV with kernel size 3
- **Detect horizontal and vertical edges** simultaneously
- **Generate edge magnitude map** highlighting boundary transitions

### Step 3: Border Detection & Cropping
- **Scan predefined margins** on all four sides of the image
- **Identify boundaries** where edge strength exceeds specified threshold
- **Crop automatically** based on detected border locations

## Results & Limitations

**Performance**: This approach robustly crops most border artifacts across the dataset.

**Limitations**: Still dependent on manual threshold tuning. Some images like Emir show remaining artifacts at top and left edges where the threshold wasn't optimal for those specific border characteristics.`
    },
    {
      name: "Automatic Contrasting", 
      description: "Gamma correction for natural brightness and contrast adjustment",
      implemented: true,
      details: `For automatic contrasting, I implemented **gamma correction** to adjust brightness and contrast matching human visual perception, making details in both dark and bright areas more visible and natural-looking.

## Gamma Correction Method

**Core Concept**: Non-linear transformation that corrects for human brightness perception and display characteristics.

### Implementation Process

**Step 1: Analyze Image Brightness**
- Compute mean brightness of the input image
- Determine target mean brightness (typically 0.5 for balanced exposure)

**Step 2: Calculate Optimal Gamma**
- **Formula**: γ = log(target_mean) / log(current_mean)
- **Constraint**: γ values clipped to [0.3, 3.0] to prevent extreme transformations

**Step 3: Apply Transformation**
- **Pixel transformation**: I_out = I_in^γ
- **Gamma behavior**:
  - γ < 1: Brightens image (enhances dark areas)
  - γ > 1: Darkens image (enhances bright areas)

## Results on Test Images

**Applied after auto-cropping to avoid border noise:**

- **Emir**: γ = 1.07, original mean = 0.52 (slight darkening)
- **Camel**: γ = 1.78, original mean = 0.68 (significant darkening)
- **Lugano**: γ = 1.46, original mean = 0.62 (moderate darkening)

**Outcome**: Significantly improved contrast across all test images, making them more visually appealing and natural-looking.`
    },
    {
      name: "Automatic White Balance",
      description: "Hybrid approach combining Robust Gray World and White Patch assumptions",
      implemented: true,
      details: `For white balancing, I initially tried the basic **Gray World assumption** but achieved better results with a hybrid approach specifically designed for historical glass plate negatives.

## Initial Approach: Basic Gray World

**Concept**: Assumes average scene color should be neutral gray (R ≈ G ≈ B) under normal lighting.

**Method**: Scale each channel so their averages are balanced.

**Result**: Didn't yield promising results for historical images.

## Advanced Hybrid Approach

**Core Concept**: Combine robust statistical methods to handle uneven illumination and color casts in historical negatives.

### Method 1: Robust Gray World Assumption

**Statistical Robustness**:
- Computes per-channel averages using only **middle 10-90% intensity range**
- **Excludes outliers** like dust, scratches, or blown highlights
- Provides **stable color balance estimation** resistant to artifacts

### Method 2: White Patch Assumption

**Brightness-Based Correction**:
- Assumes **brightest pixels should be white**
- Identifies brightest regions (likely neutral areas) as reference points
- Estimates **scaling factors** for color correction refinement

### Combined Implementation

**Weighted Integration**:
- **Blends both methods** using weighted averaging
- **NumPy implementation** for percentile calculations, masking, and scaling
- Achieves stable white balance under **uneven illumination and color casts**

## Results

**Performance**: This hybrid approach was specifically designed for historical glass plate negatives, consistently producing more natural white tones and realistic color reproduction across the dataset.`
    },
    {
      name: "Better Color Mapping",
      description: "Linear combination mapping to better approximate original filter spectral responses",
      implemented: true,
      details: `Historical glass plate filters don't correspond directly to modern RGB channels. I developed a custom color mapping to better approximate the spectral responses of **Prokudin-Gorskii's** original filters.

## Problem with Direct RGB Mapping

**Issue**: Assuming red, green, and blue glass plates map directly to R, G, B channels in modern color space produces unnatural colors.

**Cause**: Historical filters likely had **different spectral sensitivities** and **overlapping responses** compared to modern digital sensors. Early 20th century glass filter technology may have resulted in broader spectral bandwidths with potential cross-talk between channels.

## Empirical Optimization Approach

### Evaluation Method
- **Test image**: Used *emir.tif* as reference for visual comparison
- **Comparison technique**: Applied different mappings and evaluated side-by-side
- **Selection criteria**: Chose mapping that produced most realistic appearance

### Optimal Linear Combination

**Mathematical Transformation**:

- **Red channel (R)**: **80%** red plate + **20%** green plate + **0%** blue plate
- **Green channel (G)**: **20%** red plate + **80%** green plate + **0%** blue plate
- **Blue channel (B)**: **0%** red plate + **5%** green plate + **95%** blue plate

### Technical Interpretation

**Red & Green Channel Cross-Talk**: The significant cross-channel contributions (20% each way) between red and green plates may compensate for potential **spectral overlap** in the original filter system. This bidirectional mixing suggests that the historical filters might not have had perfectly isolated spectral responses.

**Blue Channel Behavior**: The blue channel remains mostly isolated (95% from blue plate, 5% from green), which could indicate that the blue filter had less spectral overlap with other channels, though this is based on empirical optimization rather than known filter specifications.

**Empirical Justification**: This mapping was optimized through visual comparison and produces more natural-looking results than direct RGB mapping, suggesting it better approximates whatever spectral characteristics the original filter system actually had.

## Results & Validation

**Performance**: Applied this mapping to additional images beyond the test case.

**Outcome**: Results consistently enhanced color fidelity across the dataset, confirming that this transformation **generalizes well** and produces more accurate historical color reproduction.`
    },
    {
      name: "Better Features",
      description: "Gradient-based and Sobel-based alignment avoiding direct RGB comparison",
      implemented: true,
      details: `To make the alignment more robust, I implemented **gradient- and Sobel-based approaches** that avoid directly comparing RGB values. Instead of relying on raw color intensities, these methods focus on structural features that are more invariant to lighting changes.

## Method 1: Gradient-Based Alignment

**Core Concept**: Captures intensity changes to identify structural features regardless of absolute brightness levels.

**Implementation Steps**:
1. **Compute gradients** along horizontal and vertical directions for each image
2. **Calculate gradient magnitude** to capture edge strength in all directions
3. **Perform alignment** using normalized cross-correlation on gradient maps

**Mathematical Foundation**:
- Horizontal gradient: **Gₓ(x,y) = I(x+1,y) - I(x-1,y)**
- Vertical gradient: **Gᵧ(x,y) = I(x,y+1) - I(x,y-1)**  
- Gradient magnitude: **|∇I| = √(Gₓ² + Gᵧ²)**

**Advantages**: More robust to illumination changes than raw pixel values, emphasizes structural content.

## Method 2: Sobel-Based Alignment

**Core Concept**: Uses the Sobel operator to create binary edge maps that highlight structural transitions.

**Implementation Steps**:
1. **Apply Sobel operator** to detect horizontal and vertical edges
2. **Generate edge maps** highlighting significant intensity transitions
3. **Perform alignment** using NCC between corresponding edge maps

**Advantages**: Invariant to uniform lighting changes, focuses purely on structural information, reduces noise from gradual intensity variations.

## Results & Analysis

**Performance**: Both methods are theoretically more robust than pixel-based alignment, especially for channels with different exposures or color characteristics.

**Practical Outcome**: Since my standard NCC alignment was already performing well, I couldn't observe meaningful improvement in alignment quality. However, the edge maps provide valuable **insight into the alignment process**, showing exactly which structural features the algorithm uses to match between channels.

**Use Case**: These methods would be particularly beneficial for images with challenging lighting conditions, significant color casts, or when aligning channels with very different exposure levels.`
    }
  ];

  const navigationItems = [
    { id: 'process', title: 'Process Demo', icon: <Eye className="h-4 w-4" /> },
    { id: 'overview', title: 'Overview', icon: <Eye className="h-4 w-4" /> },
    { id: 'approach', title: 'Approach', icon: <Grid className="h-4 w-4" /> },
    { id: 'approach-naive', title: '1. Naive Search', icon: <Grid className="h-4 w-4" /> },
    { id: 'approach-pyramid', title: '2. Pyramid', icon: <Pyramid className="h-4 w-4" /> },
    { id: 'results', title: 'Results', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'results-naive', title: '1. Naive Results', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'results-pyramid', title: '2. Pyramid Results', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'additional', title: 'Additional Images', icon: <Camera className="h-4 w-4" /> },
    { id: 'bells-whistles', title: 'Bells & Whistles', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'bells-cropping', title: '1. Auto Cropping', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'bells-contrasting', title: '2. Auto Contrasting', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'bells-whitebalance', title: '3. White Balance', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'bells-colormapping', title: '4. Color Mapping', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'bells-features', title: '5. Better Features', icon: <Sparkles className="h-4 w-4" /> },
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
              {activeSection && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-nav-green rounded-full animate-pulse"></div>
                  <span>Currently: <span className="text-nav-green font-medium">{activeSection}</span></span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <img src={bearIcon} alt="Bear" className="h-8 w-8" />
                <span className="text-lg font-bold text-nav-green">Project 1</span>
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
            const isMainSection = ['process', 'overview', 'approach', 'results', 'additional', 'bells-whistles'].includes(item.id);
            const isActiveSection = activeSection === item.id;
            const isInActiveSection = !isMainSection && activeSection && item.id.startsWith(activeSection.split('-')[0]);
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 ${
                  isActiveSection
                    ? 'text-nav-green font-medium'
                    : isInActiveSection
                    ? 'text-muted-foreground/80 pl-6 border-l border-nav-green'
                    : isMainSection
                    ? 'text-muted-foreground hover:text-nav-green'
                    : 'text-muted-foreground/60 hover:text-muted-foreground pl-6'
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
      <section id="process" className="py-16 bg-white">
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
                <p className="text-sm text-gray-600">Three BGR channels stacked vertically</p>
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
      <section id="overview" className="py-16 bg-gray-50">
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
      <section id="approach" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Approach</h2>
          
          <div className="space-y-12">
            <div id="approach-naive">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Naive Exhaustive Search</h3>
              <p className="text-gray-700 mb-4">
                My first approach was straightforward: keep one image channel fixed (the green channel) and exhaustively slide the other channels over it within a specified window (±15 pixels). At each shifted position, I calculated the displacement using similarity metrics.
              </p>
              
              <div className="bg-white p-6 rounded-lg border mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Similarity Metrics</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Euclidean Distance</h5>
                    <div className="bg-gray-50 p-4 rounded-lg mb-3">
                      <div className="text-center font-mono text-lg">
                        d(I₁, I₂) = √(∑(I₁(x,y) - I₂(x,y))²)
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      This metric measures the pixel-wise difference between two images. Lower values indicate better alignment, 
                      as the squared differences between corresponding pixels are minimized.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Normalized Cross-Correlation (NCC)</h5>
                    <div className="bg-gray-50 p-4 rounded-lg mb-3">
                      <div className="text-center font-mono text-sm">
                        NCC(I₁, I₂) = ∑[(I₁(x,y) - μ₁)(I₂(x,y) - μ₂)] / √[∑(I₁(x,y) - μ₁)² ∑(I₂(x,y) - μ₂)²]
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      NCC measures the correlation between two images after normalizing for their means (μ₁, μ₂). 
                      Values range from -1 to 1, with 1 indicating perfect positive correlation (best alignment).
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                To avoid border artifacts affecting the distance calculation, I removed a fixed percentage (15%) of the border before computing displacement.
              </p>
              
              <p className="text-gray-600 mb-4">
                <strong>Results:</strong> This naive approach worked perfectly for smaller .jpg images in reasonable time, successfully recovering the color photographs. However, for larger .tif images, the ±15 pixel radius was too small, and expanding it would make computation prohibitively slow.
              </p>
            </div>

            <div id="approach-pyramid">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Multi-Scale Image Pyramid Solution</h3>
              <p className="text-gray-700 mb-4">
                To handle larger images efficiently, I implemented a multi-scale pyramid that downsamples the image at each level using bilinear interpolation.
              </p>
              
              {/* Image Pyramid Visualization */}
              <div className="mb-6 flex justify-center">
                <div className="bg-white p-4 rounded-lg border max-w-md">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Image Pyramid Structure</h4>
                  <img 
                    src={imagePyramid}
                    alt="Visual representation of an image pyramid with multiple resolution levels"
                    className="w-full h-auto rounded"
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Multi-scale representation showing progressive downsampling from high to low resolution
                    <br />
                    <span className="text-xs italic">Source: <a href="https://en.wikipedia.org/wiki/Pyramid_(image_processing)" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Wikipedia - Pyramid (image processing)</a></span>
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Bilinear Interpolation Process</h4>
                <p className="text-gray-700 mb-3">
                  The downsampling works by interpolating between neighboring pixels in two steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li><strong>X-direction interpolation:</strong> Interpolate between the two top points and the two bottom points horizontally</li>
                  <li><strong>Y-direction interpolation:</strong> Interpolate between the results from step 1 vertically</li>
                </ol>
              </div>
              
              <p className="text-gray-700 mb-4">
                The alignment process starts on the coarsest (most downsampled) image at the top of the pyramid and progressively refines the alignment at each finer level as we move down. At each step, the search window is halved, with ±3 pixels as the minimum window size. This coarse-to-fine strategy dramatically reduces computational complexity while maintaining alignment accuracy.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h5 className="font-medium text-blue-900 mb-2">Pyramid Alignment Strategy</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li><strong>Level 3 (Coarsest):</strong> Fast alignment on heavily downsampled image</li>
                  <li><strong>Level 2:</strong> Refine alignment using previous level's result as starting point</li>
                  <li><strong>Level 1 (Finest):</strong> Final precision alignment on full-resolution image</li>
                </ul>
              </div>
              
              <p className="text-gray-700 mb-4">
                Using a 3-level pyramid, NCC as the similarity function, and a ±15 pixel search window, I successfully aligned all .tif images. Only melons.tif and self_portrait.tif required expanding the search window to ±20 pixels, after which all images achieved excellent alignment in under 1 minute average runtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Naive Method */}
      <section id="results" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Results</h2>
          <p className="text-gray-600 text-center mb-12">Blue and Red channels aligned to Green (reference)</p>
          
          <div id="results-naive" className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">1. Naive Exhaustive Search Results</h3>
            <p className="text-gray-600 text-center mb-8">Smaller .jpg images successfully aligned with ±15 pixel window</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {naiveImages.map((img, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">{img.name}</h4>
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                      Naive
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

          <div id="results-pyramid">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">2. Multi-Scale Pyramid Results</h3>
            <p className="text-gray-600 text-center mb-8">Larger .tif images aligned using image pyramid approach</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pyramidImages.map((img, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">{img.name}</h4>
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                      Pyramid
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
        </div>
      </section>

      {/* Additional Images Section */}
      <section id="additional" className="py-16 bg-gray-50">
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
      <section id="bells-whistles" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Bells & Whistles Implementation</h2>
          
          {/* Processing Order Note */}
          <div className="mb-12 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-800">Processing Pipeline Order</h3>
                <p className="mt-2 text-blue-700">
                  Both automatic contrasting and white balancing are performed <strong>after auto-cropping</strong>, as borders would introduce noise to these algorithms and affect the statistical calculations used for gamma correction and color balance.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-16">
            {bellsWhistles.map((feature, index) => {
              // Map feature names to IDs
              const featureIdMap: Record<string, string> = {
                'Automatic Cropping': 'bells-cropping',
                'Automatic Contrasting': 'bells-contrasting',
                'Automatic White Balance': 'bells-whitebalance',
                'Better Color Mapping': 'bells-colormapping',
                'Better Features': 'bells-features'
              };
              const featureId = featureIdMap[feature.name] || '';
              
              return (
              <div key={index} id={featureId}>
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
                      <ReactMarkdown 
                        components={{
                          h2: ({children}) => <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">{children}</h4>,
                          h3: ({children}) => <h5 className="text-base font-medium text-gray-800 mt-4 mb-2">{children}</h5>
                        }}
                      >
                        {feature.details}
                      </ReactMarkdown>
                    </div>
                    
                    {feature.name === "Automatic Cropping" && (
                      <div className="mt-6 flex justify-center">
                        <div className="bg-white p-4 rounded-lg border max-w-md">
                          <h5 className="font-medium text-gray-900 mb-3 text-center">Sobel Filter Visualization</h5>
                          <img 
                            src={sobelMasks}
                            alt="Sobel filter kernels and edge detection process"
                            className="w-full h-auto rounded"
                          />
                          <p className="text-sm text-gray-600 mt-2 text-center">
                            Sobel operator kernels for horizontal and vertical edge detection
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {feature.implemented && (
                  <div className="space-y-8">
                    {getBellsWhistlesImages(feature.name).map((technique, techIndex) => (
                      <div key={techIndex} className="space-y-4">
                        <div className="text-center">
                          <h5 className="text-lg font-medium text-gray-800">{technique.name}</h5>
                          {technique.gammaInfo && (
                            <p className="text-sm text-gray-600 mt-1">{technique.gammaInfo}</p>
                          )}
                        </div>
                        <div 
                          className={`${technique.hasImage === 'matrix-only' ? 'flex justify-center cursor-pointer hover:opacity-80 transition-opacity group' : `grid grid-cols-1 md:grid-cols-2 gap-8 ${technique.hasImage ? 'cursor-pointer hover:opacity-80 transition-opacity group' : ''}`}`}
                          onClick={() => {
                            if (technique.hasImage === true) {
                              setFullscreenBellsWhistles({
                                name: technique.name,
                                featureName: feature.name,
                                before: technique.before,
                                after: technique.after
                              });
                            } else if (technique.hasImage === 'matrix-only') {
                              setFullscreenMappings(technique.before);
                            }
                          }}
                          title={technique.hasImage === true ? "Click to view fullscreen comparison" : technique.hasImage === 'matrix-only' ? "Click to view fullscreen" : undefined}
                        >
                          {technique.hasImage === 'matrix-only' ? (
                            <div className="w-full flex flex-col items-center">
                              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center border overflow-hidden max-w-4xl w-full relative">
                                <img 
                                  src={technique.before}
                                  alt="Color Transformation Matrix Visualization"
                                  className="w-full h-auto object-contain rounded"
                                />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Maximize2 className="h-4 w-4 text-gray-600" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">CS180 Project 1</h3>
          <p className="text-gray-400 mb-6">
            Images of the Russian Empire - Colorizing the Prokudin-Gorskii Photo Collection
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

      {/* Mappings Fullscreen Modal */}
      {fullscreenMappings && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenMappings(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-screen">
            {/* Close button */}
            <button
              onClick={() => setFullscreenMappings(null)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all"
              title="Close (Esc)"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Escape key hint */}
            <div className="absolute top-4 right-16 z-10 bg-black bg-opacity-50 rounded-lg px-3 py-1 text-white text-sm">
              Press <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Esc</kbd> to close
            </div>

            {/* Image title */}
            <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 rounded-lg p-3 text-white">
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-semibold">Color Mapping Transformation Matrix</h3>
                <span className="text-sm text-gray-300">Better Color Mapping</span>
              </div>
            </div>

            {/* Centered image */}
            <div className="flex items-center justify-center h-full">
              <div className="bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden max-w-full max-h-full p-4">
                <img 
                  src={fullscreenMappings}
                  alt="Color Transformation Matrix Visualization"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const fallback = target.nextElementSibling as HTMLElement;
                    target.style.display = 'none';
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="text-center text-gray-400 hidden">
                  <p>Mappings Visualization</p>
                  <p className="text-sm">(Image loading error)</p>
                </div>
              </div>
            </div>

            {/* Description at bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-lg p-4 text-white max-w-2xl">
              <h4 className="font-medium text-center mb-2">Linear Color Transformation Matrix</h4>
              <p className="text-sm text-center text-gray-300">
                Optimized mapping from historical glass plate filters to modern RGB color space
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project1;
