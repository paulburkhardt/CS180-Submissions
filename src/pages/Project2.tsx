import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
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

const Project2 = () => {
  const [activeSection, setActiveSection] = useState('');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 200;

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
    { id: 'part1', title: 'Part 1: Filters', icon: <Filter className="h-4 w-4" /> },
    { id: 'part1-1', title: '1.1: Convolutions', icon: <Grid className="h-4 w-4" /> },
    { id: 'part1-2', title: '1.2: Finite Difference', icon: <Zap className="h-4 w-4" /> },
    { id: 'part1-3', title: '1.3: DoG Filter', icon: <Sparkles className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <img src={bearIcon} alt="Bear" className="h-8 w-8" />
              <span className="text-lg font-bold text-primary">Project 2</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Navigation */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
        <Card className="w-64 p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground mb-4">Navigation</h3>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 h-full">
            <div className="relative">
              <img src={mountainHero} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={bearIcon} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={mountainHero} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={bearIcon} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden md:block">
              <img src={mountainHero} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative hidden md:block">
              <img src={bearIcon} alt="" className="w-full h-full object-cover" />
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
                    After systematic testing across the range [0.15, 0.20, 0.25, 0.30, 0.35, 0.40], I selected <strong>0.3</strong> based on specific visual criteria:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Thresholds 0.15-0.2:</strong> Include excessive background texture noise, particularly in the grass and foliage areas, making it difficult to distinguish meaningful edges from surface patterns</li>
                      <li>• <strong>Threshold 0.25:</strong> Still captures some texture noise but begins to clean up the background</li>
                      <li>• <strong>Threshold 0.3:</strong> <strong>Optimal balance</strong> - preserves the photographer's silhouette, camera body details, and tripod structure while eliminating most texture artifacts in the background</li>
                      <li>• <strong>Thresholds 0.35-0.4:</strong> Begin losing important structural details like the camera housing edges and some tripod components</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    The 0.3 threshold successfully separates <strong>structural edges</strong> (object boundaries, geometric features) from <strong>texture edges</strong> (surface patterns, noise), which aligns with the goal of robust edge detection.
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
                    <pre className="text-sm"><code>{`gaussian_1d = cv2.getGaussianKernel(5, 1)
gaussian_2d = gaussian_1d * gaussian_1d.T`}</code></pre>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This gives a symmetric, separable kernel (3×3 and 5×5 shown in the images).
                  </p>
                  
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Why Separability Matters</h5>
                  
                  <p className="text-gray-700 mb-4">
                    Gaussian filters are <strong>separable</strong>, meaning a 2D Gaussian can be decomposed into two 1D operations:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <div className="text-center font-mono text-lg">
                      G(x,y) = G(x) · G(y)
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    This provides significant computational advantages:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Direct 2D convolution:</strong> O(k²) operations per pixel for a k×k kernel</li>
                      <li><strong>Separable approach:</strong> O(2k) operations per pixel (two 1D convolutions)</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    For a 5×5 Gaussian: 25 operations vs. 10 operations per pixel - a 2.5× speedup. This advantage grows quadratically with kernel size, making separable convolution essential for large Gaussian kernels in practice.
                  </p>
                  
                  <p className="text-gray-700 mb-4">
                    The outer product <code className="bg-gray-200 px-2 py-1 rounded">gaussian_1d * gaussian_1d.T</code> reconstructs the full 2D kernel for visualization and direct comparison, but production implementations typically use the separable approach.
                  </p>
                  
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="bg-white p-4 rounded-lg border max-w-full cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => setFullscreenImage(gaussianFilter13)}
                      title="Click to view fullscreen"
                    >
                      <div className="relative">
                        <img 
                          src={gaussianFilter13}
                          alt="Gaussian filter kernels showing 3x3 and 5x5 matrices with their corresponding weights"
                          className="w-full h-auto rounded"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Gaussian filter kernels: 3×3 and 5×5 matrices showing the bell-curve distribution of weights
                      </p>
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
                    These filters look like smoothed edge detectors — they resemble <strong>blurred versions of the original finite difference filters</strong>, but with a Gaussian "bell curve" weighting.
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

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">CS180 Project 2</h3>
          <p className="text-gray-400">
            Fun with Filters and Frequencies! - Exploring 2D convolutions and frequency domain processing
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
