import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SocialLinks } from '@/components/SocialLinks';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import {
  Eye,
  Wand2,
  Sparkles,
  Zap,
  Layers,
  Home,
  Image as ImageIcon,
  Grid,
  Palette,
  Code,
  Filter
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import bearIcon from '@/assets/bear-icon.png';
import mountainHero from '@/assets/mountain-hero.jpg';

// Part 0 prompts (num_inference_steps = 10 / 20 / 40)
import bearCampus10 from '@/assets/homework 5/download.png';
import bearCampus20 from '@/assets/homework 5/download 1.png';
import bearCampus40 from '@/assets/homework 5/download 2.png';
import munich10 from '@/assets/homework 5/download 3.png';
import munich20 from '@/assets/homework 5/download 4.png';
import munich40 from '@/assets/homework 5/download 5.png';
import tiger10 from '@/assets/homework 5/download 6.png';
import tiger20 from '@/assets/homework 5/download 7.png';
import tiger40 from '@/assets/homework 5/download 8.png';

// Sampling loops visuals
import campanileNoisyTriplet from '@/assets/homework 5/download 15.png';
import campanileGaussianGrid from '@/assets/homework 5/download 16.png';
import campanileGaussianDetail from '@/assets/homework 5/download 17.png';
import oneStepComparison250 from '@/assets/homework 5/download 18.png';
import oneStepComparison500 from '@/assets/homework 5/download 19.png';
import oneStepComparison750 from '@/assets/homework 5/download 20.png';
import iterativeTimeline from '@/assets/homework 5/download 21.png';
import iterativeComparisons from '@/assets/homework 5/download 22.png';
import diffusionSamples from '@/assets/homework 5/download 23.png';
import cfgSamples from '@/assets/homework 5/download 24.png';

// Image-to-image translation
import campanileEdits from '@/assets/homework 5/download 25.png';
import personalEditA from '@/assets/homework 5/download 26.png';
import personalEditB from '@/assets/homework 5/download 27.png';

// Web + hand-drawn edits
import webEditsGrid from '@/assets/homework 5/download 28.png';
import webEdit1 from '@/assets/homework 5/download 29.png';
import webEditNoise20 from '@/assets/homework 5/download 30.png';
import webEditNoise3 from '@/assets/homework 5/download 31.png';
import webEditNoise5 from '@/assets/homework 5/download 32.png';
import webEditNoise7 from '@/assets/homework 5/download 33.png';
import webEditNoise10 from '@/assets/homework 5/download 34.png';
import handDrawnSet1 from '@/assets/homework 5/download 35.png';
import handDrawn1Noise1 from '@/assets/homework 5/download 36.png';
import handDrawn1Noise20 from '@/assets/homework 5/download 37.png';
import handDrawn1Noise3 from '@/assets/homework 5/download 38.png';
import handDrawn1Noise5 from '@/assets/homework 5/download 39.png';
import handDrawn1Noise7 from '@/assets/homework 5/download 40.png';
import handDrawn1Noise10 from '@/assets/homework 5/download 41.png';
import handDrawnSet2 from '@/assets/homework 5/download 42.png';
import handDrawn2Noise1 from '@/assets/homework 5/download 43.png';
import handDrawn2Noise20 from '@/assets/homework 5/download 44.png';
import handDrawn2Noise3 from '@/assets/homework 5/download 45.png';
import handDrawn2Noise5 from '@/assets/homework 5/download 46.png';
import handDrawn2Noise7 from '@/assets/homework 5/download 47.png';
import handDrawn2Noise10 from '@/assets/homework 5/download 48.png';
import webOriginal from '@/assets/homework 5/Screenshot_2025-11-19_at_12.18.14_PM.png';

// Inpainting
import campanileInpaint from '@/assets/homework 5/download 49.png';
import campanileInpaintMask from '@/assets/homework 5/download 50.png';
import personalInpaintA from '@/assets/homework 5/download 51.png';
import personalInpaintB from '@/assets/homework 5/download 52.png';

// Text conditioned image-to-image translation
import christmasTreeTranslation from '@/assets/homework 5/download 53.png';
import madonnaTranslation from '@/assets/homework 5/download 54.png';
import munichTranslation from '@/assets/homework 5/download 55.png';

// Visual anagrams & hybrid images
import visualAnagramA from '@/assets/homework 5/download 56.png';
import visualAnagramB from '@/assets/homework 5/download 57.png';
import visualAnagramBlend from '@/assets/homework 5/download 58.png';
import hybridImageA from '@/assets/homework 5/download 59.png';
import hybridImageB from '@/assets/homework 5/download 60.png';

const Project5 = () => {
  const [activeSection, setActiveSection] = useState('');
  const [activeSubsection, setActiveSubsection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const subsections = document.querySelectorAll('div[id^="part"]');
      const scrollPosition = window.scrollY + 200;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });

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

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && fullscreenImage) {
        setFullscreenImage(null);
      }
    };

    if (fullscreenImage) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [fullscreenImage]);

  const navigationItems = [
    { id: 'overview', title: 'Overview', icon: <Eye className="h-4 w-4" /> },
    { id: 'part0', title: 'Part 0: Prompt Experiments', icon: <Wand2 className="h-4 w-4" /> },
    { id: 'part1', title: 'Part 1: Sampling Loops', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'part1-1', title: '1.1 – Forward Process', icon: <Grid className="h-4 w-4" /> },
    { id: 'part1-2', title: '1.2 – Classical Denoising', icon: <Filter className="h-4 w-4" /> },
    { id: 'part1-3', title: '1.3 – One-Step Denoising', icon: <Zap className="h-4 w-4" /> },
    { id: 'part1-4', title: '1.4 – Iterative Denoising', icon: <Layers className="h-4 w-4" /> },
    { id: 'part1-5', title: '1.5 – Diffusion Sampling', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'part1-6', title: '1.6 – CFG', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'part1-7', title: '1.7 – Img2Img', icon: <Palette className="h-4 w-4" /> },
    { id: 'part1-7-1', title: '1.7.1 – Web & Sketch Edits', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'part1-7-2', title: '1.7.2 – Inpainting', icon: <Wand2 className="h-4 w-4" /> },
    { id: 'part1-7-3', title: '1.7.3 – Text-Conditioned Img2Img', icon: <Palette className="h-4 w-4" /> },
    { id: 'part1-8', title: '1.8 – Visual Anagrams', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'part1-9', title: '1.9 – Hybrid Images', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'takeaways', title: 'Takeaways', icon: <Eye className="h-4 w-4" /> },
  ];

  const renderImageTile = (src: string, alt: string, caption: string) => (
    <div
      key={`${caption}-${src}`}
      className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setFullscreenImage(src)}
    >
      <img src={src} alt={alt} className="w-full h-auto object-cover" />
      <div className="px-4 py-3 text-sm text-gray-600">{caption}</div>
    </div>
  );

  const promptShowcase = [
    {
      prompt: '"a picture of a bear on the berkeley campus"',
      reflections:
        'Interstingly enough I think that the result of num_inference_steps = 10 and 20 look better than 40. 40 is more 3D but honestly looks a bit creepy. At 20 steps it looks like a nice berkeley logo even though the letters don\'t make any sense. Interstingly at 10 steps the bear looks really much alike to the logo I used for this project.',
      samples: [
        { label: 'num_inference_steps = 10', image: bearCampus10 },
        { label: 'num_inference_steps = 20', image: bearCampus20 },
        { label: 'num_inference_steps = 40', image: bearCampus40 },
      ],
    },
    {
      prompt: '"snowy munich with nice lighting"',
      reflections:
        'I think these overall all worked quite well. However I must say that the colors and shapes look a little bit weird at 40 steps. However this could be the case because it tries to incorporate the "nice lighting" part',
      samples: [
        { label: 'steps = 10', image: munich10 },
        { label: 'steps = 20', image: munich20 },
        { label: 'steps = 40', image: munich40 },
      ],
    },
    {
      prompt: '"a tiger on the streets of berlin"',
      reflections:
        'Here I like the image at 20 steps the most. Again I think the one after 40 steps is the worst as the front leg on the right looks weird. On the first one you don\'t have any signs of Berlin at all which is a pity.',
      samples: [
        { label: 'steps = 10', image: tiger10 },
        { label: 'steps = 20', image: tiger20 },
        { label: 'steps = 40', image: tiger40 },
      ],
    },
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
                  <span>
                    Currently: <span className="text-nav-green font-medium">{activeSubsection}</span>
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <img src={bearIcon} alt="Bear" className="h-8 w-8" />
                <span className="text-lg font-bold text-nav-green">Project 5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${scrollProgress}%`,
              background: 'linear-gradient(to right, hsl(120, 40%, 25%), hsl(120, 40%, 25%, 0.6))',
            }}
          />
        </div>
      </nav>

      {/* Mobile Subsection Indicator */}
      <div className="fixed bottom-6 right-6 z-40 xl:hidden">
        {activeSubsection && (
          <div className="px-3 py-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-full text-xs text-muted-foreground">
            {activeSubsection}
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
        <div className="w-56 space-y-1">
          {navigationItems.map((item) => {
            const isMainSection = ['overview', 'part0', 'part1', 'takeaways'].includes(item.id);
            const isActiveSection = activeSection === item.id;
            const isActiveSub = activeSubsection === item.id;
            const isInActiveSection = !isMainSection && activeSection && item.id.startsWith(activeSection);

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 ${
                  isActiveSection || isActiveSub
                    ? 'text-nav-green font-medium'
                    : isInActiveSection
                    ? 'text-muted-foreground/80 pl-6 border-l border-nav-green'
                    : isMainSection
                    ? 'text-muted-foreground hover:text-nav-green'
                    : 'text-muted-foreground/60 hover:text-muted-foreground pl-6'
                }`}
              >
                <span className={`${isActiveSub ? 'relative' : ''}`}>
                  {item.title}
                  {isActiveSub && (
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-nav-green rounded-full" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative py-24 bg-gray-900 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.88)), url(${mountainHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 nature-pattern opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center text-white">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Fun With Diffusion Models!</h1>
           
          </ScrollReveal>
        </div>
      </section>


      {/* Project Overview */}
      <section id="overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part A: The Power of Diffusion Models!</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              This project documents how I explored DeepFloyd IF. From prompt embeddings and classical denoising to classifier-free guidance, inpainting, and visual illusions, while keeping every experiment reproducible with <strong>seed 8</strong>.
            </p>
          </div>
        </div>
      </section>



      {/* Part 0 */}
      <section id="part0" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Part 0: Prompt Embeddings & First Impressions</h2>
          
          <div className="bg-white border rounded-2xl p-6 shadow-sm mb-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Example Prompt Embedding</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Every prompt is encoded into a 4096-dimensional latent vector. One slice of the tensor looks like this:
            </p>
            <div className="bg-gray-900 text-gray-100 text-sm rounded-xl p-4 overflow-x-auto">
              <pre className="font-mono whitespace-pre">
{`tensor([[[-0.1180, -0.0429, -0.0904,  ...,  0.0022,  0.0057,  0.0637],
         [-0.1156, -0.0046, -0.0003,  ..., -0.0471, -0.2053,  0.0531],
         [ 0.1554,  0.0328, -0.0298,  ..., -0.0263, -0.0412, -0.0214],
         ...,
         [ 0.0392,  0.1660, -0.2006,  ...,  0.1078,  0.0139, -0.0330],
         [ 0.0392,  0.1660, -0.2006,  ...,  0.1078,  0.0139, -0.0330],
         [ 0.0392,  0.1660, -0.2006,  ...,  0.1078,  0.0139, -0.0330]]],
       dtype=torch.float16)`}
              </pre>
            </div>

          </div>
        

          <div className="space-y-12">
            {promptShowcase.map((demo) => (
              <div key={demo.prompt} className="bg-gray-50 border rounded-2xl p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Prompt: {demo.prompt}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{demo.reflections}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {demo.samples.map((sample) =>
                    renderImageTile(sample.image, `${demo.prompt} – ${sample.label}`, sample.label),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 1 main intro */}
      <section id="part1" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Part 1: Sampling Loops Deep Dive</h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto">
            I guess building intuition for diffusion requires staring at noisy Campaniles from multiple angles. 
          </p>
        </div>
      </section>

      <section id="part1-1" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.1 Forward Process – Adding Noise</h3>
          <p className="text-gray-700">
            Implemented the <code className="bg-gray-200 px-2 py-1 rounded">forward(im, t)</code> helper to add Gaussian noise according to the cumulative alpha schedule. The visualization below shows the Campanile at noise levels 250, 500, and 750.
          </p>
          {renderImageTile(
            campanileNoisyTriplet,
            'Campanile at noise levels 250, 500, 750',
            'Campanile corrupted at t ∈ {250, 500, 750}',
          )}

          <div className="bg-gray-900 text-gray-100 text-sm rounded-xl p-4 overflow-x-auto">
            <pre className="font-mono whitespace-pre">
{`def forward(im, t):
    with torch.no_grad():
        alpha_bar_t = alphas_cumprod[t]
        epsilon = torch.randn_like(im)
        im_noisy = torch.sqrt(alpha_bar_t) * im + torch.sqrt(1 - alpha_bar_t) * epsilon
    return im_noisy`}
            </pre>
          </div>
        </div>
      </section>

      <section id="part1-2" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">1.2 Classical Denoising</h3>
          <p className="text-gray-700">
            Gaussian blurs with tuned kernel sizes partially recover structure, especially at lower timesteps. I logged the best-performing configurations for comparison.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {renderImageTile(campanileGaussianGrid, 'Gaussian denoising comparisons', 'Denoised Campanile for t ∈ {250, 500, 750}')}
            {renderImageTile(campanileGaussianDetail, 'Gaussian kernels details', 'Kernel sweeps and PSNR tracking')}
          </div>
        </div>
      </section>

      <section id="part1-3" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">1.3 One-Step Denoising</h3>
          <p className="text-gray-700">
            Passing noisy frames through <code className="bg-gray-200 px-2 py-1 rounded">stage_1.unet</code> and subtracting the predicted noise yields improved reconstructions. Each subplot compares the original, noisy observation, and one-step estimate for different timesteps.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {renderImageTile(oneStepComparison250, 'One-step denoising at timestep 250', 't = 250 reconstruction triplet')}
            {renderImageTile(oneStepComparison500, 'One-step denoising at timestep 500', 't = 500 reconstruction triplet')}
            {renderImageTile(oneStepComparison750, 'One-step denoising at timestep 750', 't = 750 reconstruction triplet')}
          </div>
        </div>
      </section>

      <section id="part1-4" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">1.4 Iterative Denoising (i_start = 10)</h3>
          <p className="text-gray-700">
            Constructed <code className="bg-gray-200 px-2 py-1 rounded">strided_timesteps</code> from 990 → 0 with stride 30 and iteratively denoised the Campanile. Every fifth loop is shown alongside final comparisons.
          </p>
          {renderImageTile(iterativeTimeline, 'Iterative denoising timeline', 'Every 5th iteration of the denoising loop')}
          {renderImageTile(iterativeComparisons, 'Iterative vs single-step vs Gaussian', 'Final outputs across three strategies')}

          <ImagePlaceholder label="Code snippet placeholder: iterative_denoise implementation (final comments pending)" />
        </div>
      </section>

      <section id="part1-5" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.5 Diffusion Model Sampling</h3>
          <p className="text-gray-700">
            Sampling with the default scheduler (no classifier-free guidance) produced the gallery below. Diversity is limited but textures stay coherent thanks to the long chain.
          </p>
          {renderImageTile(diffusionSamples, 'Random diffusion samples', 'Five unconditional samples from DeepFloyd IF')}
        </div>
      </section>

      <section id="part1-6" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.6 Classifier-Free Guidance (CFG)</h3>
          <p className="text-gray-700">
            Implemented <code className="bg-gray-200 px-2 py-1 rounded">iterative_denoise_cfg</code> with guidance scale γ = 7 for the prompt <em>"a high quality photo"</em>. The outputs sharpen edges and increase photorealism compared to unconditional sampling.
          </p>
          {renderImageTile(cfgSamples, 'CFG samples (γ = 7)', 'Five CFG-guided samples conditioned on "a high quality photo"')}

          <ImagePlaceholder label="Code snippet placeholder: iterative_denoise_cfg (documenting prompt conditioning details)" />
        </div>
      </section>

      <section id="part1-7" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">1.7 Image-to-Image Translation</h3>
          <p className="text-gray-700">
            Used varying noise levels [1, 3, 5, 7, 10, 20] to edit the Campanile and two personal photos while conditioning on <em>"a high quality photo"</em>. Lower noise keeps structure; higher noise invites new content.
          </p>
          <div className="grid gap-6">
            {renderImageTile(campanileEdits, 'Campanile edits across noise levels', 'Campanile image-to-image results')}
            {renderImageTile(personalEditA, 'Personal photo edit #1', 'Noise sweep for personal test image A')}
            {renderImageTile(personalEditB, 'Personal photo edit #2', 'Noise sweep for personal test image B')}
          </div>
        </div>
      </section>

      <section id="part1-7-1" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">1.7.1 Editing Web & Hand-Drawn Images</h3>
          <p className="text-gray-700">
            Extended the image-to-image pipeline to a scraped web image and two sketches. Each set sweeps the mandated noise levels to demonstrate how much guidance we retain.
          </p>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-900">Web Image</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {renderImageTile(webOriginal, 'Original web image', 'Original source image')}
              {renderImageTile(webEditsGrid, 'Web image edits overview', 'Noise levels [1, 3, 5, 7, 10, 20] at a glance')}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {renderImageTile(webEdit1, 'Web edit – noise level 1', 'Noise level 1')}
              {renderImageTile(webEditNoise3, 'Web edit – noise level 3', 'Noise level 3')}
              {renderImageTile(webEditNoise5, 'Web edit – noise level 5', 'Noise level 5')}
              {renderImageTile(webEditNoise7, 'Web edit – noise level 7', 'Noise level 7')}
              {renderImageTile(webEditNoise10, 'Web edit – noise level 10', 'Noise level 10')}
              {renderImageTile(webEditNoise20, 'Web edit – noise level 20', 'Noise level 20')}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900">Hand-Drawn Example A</h4>
              {renderImageTile(handDrawnSet1, 'Hand-drawn edit set A', 'Overview collage for noise levels [1, 3, 5, 7, 10, 20]')}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {renderImageTile(handDrawn1Noise1, 'Hand-drawn A – noise level 1', 'Noise 1')}
                {renderImageTile(handDrawn1Noise3, 'Hand-drawn A – noise level 3', 'Noise 3')}
                {renderImageTile(handDrawn1Noise5, 'Hand-drawn A – noise level 5', 'Noise 5')}
                {renderImageTile(handDrawn1Noise7, 'Hand-drawn A – noise level 7', 'Noise 7')}
                {renderImageTile(handDrawn1Noise10, 'Hand-drawn A – noise level 10', 'Noise 10')}
                {renderImageTile(handDrawn1Noise20, 'Hand-drawn A – noise level 20', 'Noise 20')}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900">Hand-Drawn Example B</h4>
              {renderImageTile(handDrawnSet2, 'Hand-drawn edit set B', 'Overview collage for noise levels [1, 3, 5, 7, 10, 20]')}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {renderImageTile(handDrawn2Noise1, 'Hand-drawn B – noise level 1', 'Noise 1')}
                {renderImageTile(handDrawn2Noise3, 'Hand-drawn B – noise level 3', 'Noise 3')}
                {renderImageTile(handDrawn2Noise5, 'Hand-drawn B – noise level 5', 'Noise 5')}
                {renderImageTile(handDrawn2Noise7, 'Hand-drawn B – noise level 7', 'Noise 7')}
                {renderImageTile(handDrawn2Noise10, 'Hand-drawn B – noise level 10', 'Noise 10')}
                {renderImageTile(handDrawn2Noise20, 'Hand-drawn B – noise level 20', 'Noise 20')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="part1-7-2" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.7.2 Inpainting</h3>
          <p className="text-gray-700">
            Implemented the <code className="bg-gray-200 px-2 py-1 rounded">inpaint</code> routine to replace user-defined masks with guided diffusion. Masks were created via binary thresholding and morphological cleanup.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {renderImageTile(campanileInpaint, 'Campanile inpainting result', 'Campanile inpainted with custom mask')}
            {renderImageTile(campanileInpaintMask, 'Campanile inpainting mask', 'Mask visualization for Campanile edit')}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {renderImageTile(personalInpaintA, 'Personal inpainting example A', 'Custom mask inpainting example #1')}
            {renderImageTile(personalInpaintB, 'Personal inpainting example B', 'Custom mask inpainting example #2')}
          </div>

          <ImagePlaceholder label="Code snippet placeholder: inpaint function (mask composition comments incoming)" />
        </div>
      </section>

      <section id="part1-7-3" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.7.3 Text-Conditioned Image-to-Image Translation</h3>
          <p className="text-gray-700">
            Re-used the noise sweep but swapped prompts to explore stronger conditioning. The Campanile prompt <em>"a christmas tree with blue lights"</em> showcases dramatic seasonal reimagination, while the personal prompts remix Madonna and a Munich skyline.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {renderImageTile(christmasTreeTranslation, 'Campanile → Christmas tree', 'Prompt: "a christmas tree with blue lights"')}
            {renderImageTile(madonnaTranslation, 'Personal photo → Madonna painting', 'Prompt: "an oil painting of Madonna"')}
            {renderImageTile(munichTranslation, 'Personal photo → Snowy Munich', 'Prompt: "snowy munich with nice lighting"')}
          </div>
        </div>
      </section>

      <section id="part1-8" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.8 Visual Anagrams</h3>
          <p className="text-gray-700">
            Built the <code className="bg-gray-200 px-2 py-1 rounded">visual_anagrams</code> helper to optimize prompts that morph under 180° rotation. Two illusions are shown below, plus an intermediate blend illustrating the shared latent structure.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {renderImageTile(visualAnagramA, 'Visual anagram – upright', 'Illusion #1 (upright)')}
            {renderImageTile(visualAnagramB, 'Visual anagram – rotated', 'Illusion #1 (rotated 180°)')}
            {renderImageTile(visualAnagramBlend, 'Visual anagram – intermediate', 'Latent interpolation preview')}
          </div>

          <ImagePlaceholder label="Code snippet placeholder: visual_anagrams optimization (clean-up in progress)" />
        </div>
      </section>

      <section id="part1-9" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.9 Hybrid Images</h3>
          <p className="text-gray-700">
            Generated hybrid pairs combining low and high frequency components. The first pair uses a modern cityscape and vintage architecture; the second fuses a portrait with a stylized illustration.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {renderImageTile(hybridImageA, 'Hybrid image – pair 1', 'Hybrid Image #1 frequency fusion')}
            {renderImageTile(hybridImageB, 'Hybrid image – pair 2', 'Hybrid Image #2 frequency fusion')}
          </div>

          <ImagePlaceholder label="Code snippet placeholder: make_hybrids frequency pipeline (to be summarized)" />
        </div>
      </section>

      <section id="takeaways" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Diffusion Mechanics</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Forward noise schedules remain intuitive after implementing the scalar <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">ᾱ<sub>t</sub></code> updates manually.</li>
                <li>Iterative denoising drastically outperforms one-step approaches, especially when the stride enforces coverage across the entire timeline.</li>
                <li>Classifier-free guidance trades diversity for photorealism—γ = 7 provided a sweet spot without overshooting colors.</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Creative Applications</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Noise sweeps are a practical knob for how much semantic drift is acceptable during image-to-image translation.</li>
                <li>Inpainting paired with careful mask design enables high-quality scene edits even for personal photos.</li>
                <li>Visual anagrams and hybrid images highlight the versatility of diffusion latents beyond straightforward generation.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">CS180 Project 5</h3>
          <p className="text-gray-400 mb-6">
Fun With Diffusion Models!
          </p>
          <SocialLinks className="justify-center" iconSize={24} />
        </div>
      </footer>

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
              ✕
            </button>
            <div className="absolute top-4 right-16 z-10 bg-black bg-opacity-50 rounded-lg px-3 py-1 text-white text-sm">
              Press <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Esc</kbd> to close
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="bg-gray-800 rounded-lg p-4 max-w-full max-h-full overflow-hidden">
                <img src={fullscreenImage} alt="Fullscreen view" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project5;
