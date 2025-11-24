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

// Part 0 prompts (num_inference_steps = 10 / 20 / 40)
import bearCampus10 from '@/assets/project5/download.png';
import bearCampus20 from '@/assets/project5/download 1.png';
import bearCampus40 from '@/assets/project5/download 2.png';
import munich10 from '@/assets/project5/download 3.png';
import munich20 from '@/assets/project5/download 4.png';
import munich40 from '@/assets/project5/download 5.png';
import tiger10 from '@/assets/project5/download 6.png';
import tiger20 from '@/assets/project5/download 7.png';
import tiger40 from '@/assets/project5/download 8.png';

// Sampling loops visuals
import campanileNoisyTriplet from '@/assets/project5/download 15.png';
import campanileGaussianGrid from '@/assets/project5/download 16.png';
import campanileGaussianDetail from '@/assets/project5/download 17.png';
import oneStepComparison250 from '@/assets/project5/download 18.png';
import oneStepComparison500 from '@/assets/project5/download 19.png';
import oneStepComparison750 from '@/assets/project5/download 20.png';
import iterativeTimeline from '@/assets/project5/download 21.png';
import iterativeComparisons from '@/assets/project5/download 22.png';
import diffusionSamples from '@/assets/project5/download 23.png';
import cfgSamples from '@/assets/project5/download 24.png';

// Image-to-image translation
import campanileEdits from '@/assets/project5/download 25.png';
import personalEditA from '@/assets/project5/download 26.png';
import personalEditB from '@/assets/project5/download 27.png';

// Web + hand-drawn edits
import webEdit1 from '@/assets/project5/download 29.png';
import webEditNoise20 from '@/assets/project5/download 30.png';
import webEditNoise3 from '@/assets/project5/download 31.png';
import webEditNoise5 from '@/assets/project5/download 32.png';
import webEditNoise7 from '@/assets/project5/download 33.png';
import webEditNoise10 from '@/assets/project5/download 34.png';
import handDrawnOriginal1 from '@/assets/project5/download 35.png';
import handDrawn1Noise1 from '@/assets/project5/download 36.png';
import handDrawn1Noise20 from '@/assets/project5/download 37.png';
import handDrawn1Noise3 from '@/assets/project5/download 38.png';
import handDrawn1Noise5 from '@/assets/project5/download 39.png';
import handDrawn1Noise7 from '@/assets/project5/download 40.png';
import handDrawn1Noise10 from '@/assets/project5/download 41.png';
import handDrawnOriginal2 from '@/assets/project5/download 42.png';
import handDrawn2Noise1 from '@/assets/project5/download 43.png';
import handDrawn2Noise20 from '@/assets/project5/download 44.png';
import handDrawn2Noise3 from '@/assets/project5/download 45.png';
import handDrawn2Noise5 from '@/assets/project5/download 46.png';
import handDrawn2Noise7 from '@/assets/project5/download 47.png';
import handDrawn2Noise10 from '@/assets/project5/download 48.png';
import webOriginal from '@/assets/project5/download 28.png';

// Inpainting
import campanileInpaint from '@/assets/project5/download 49.png';
import campanileInpaintMask from '@/assets/project5/download 50.png';
import personalInpaintA from '@/assets/project5/download 51.png';
import personalInpaintB from '@/assets/project5/download 52.png';

// Text conditioned image-to-image translation
import christmasTreeTranslation from '@/assets/project5/download 53.png';
import madonnaTranslation from '@/assets/project5/download 54.png';
import munichTranslation from '@/assets/project5/download 55.png';

// Visual anagrams & hybrid images
import visualAnagramA from '@/assets/project5/download 56.png';
import visualAnagramB from '@/assets/project5/download 57.png';
import visualAnagramBlend from '@/assets/project5/download 58.png';
import hybridImageA from '@/assets/project5/download 59.png';
import hybridImageB from '@/assets/project5/download 60.png';

// Part B: Single-Step Denoising UNet
import unetArchitecture from '@/assets/project5/B/1.1_UNet_architecture.png';
import unetOperations from '@/assets/project5/B/1.1_Standard UNet Operations  .png';
import noisingVisualization from '@/assets/project5/B/1.2_vis_of_noising.png';
import partB1TrainingLoss from '@/assets/project5/B/1.2.1_loss_curve.png';
import partB1SampleResults from '@/assets/project5/B/1.2.1_sample_results.png';
import partB1Epoch1 from '@/assets/project5/B/1.2.3_sample_res_epoch1.png';
import partB1Epoch5 from '@/assets/project5/B/1.2.3_sample_res_epoch5.png';
import oodSigma0 from '@/assets/project5/B/1.2.2_sigma=0.png';
import oodSigma02 from '@/assets/project5/B/1.2.2_sigma=0.2.png';
import oodSigma04 from '@/assets/project5/B/1.2.2_sigma=0.4.png';
import oodSigma05 from '@/assets/project5/B/1.2.2_sigma=0.5.png';
import oodSigma06 from '@/assets/project5/B/1.2.2_sigma=0.6.png';
import oodSigma08 from '@/assets/project5/B/1.2.2_sigma=0.8.png';
import oodSigma10 from '@/assets/project5/B/1.2.2_sigma=1.0.png';

// Part B: Time-Conditioned UNet
import timeCondUnetArch from '@/assets/project5/B/2.1_Unet_architecture.png';
import fcBlock from '@/assets/project5/B/2.1_FCBlock for conditioning.png';
import timeCondTrainAlgo from '@/assets/project5/B/2.2_train_algo.png';
import timeCondLoss from '@/assets/project5/B/2.2_loss_curve.png';
import timeCondSamplingAlgo from '@/assets/project5/B/2.3_sampling_algo.png';
import timeCondEpoch1 from '@/assets/project5/B/2.3_epoch1.png';
import timeCondEpoch5 from '@/assets/project5/B/2.3_epoch5.png';
import timeCondEpoch10 from '@/assets/project5/B/2.3_epoch10.png';
import timeCondEpoch20 from '@/assets/project5/B/2.3_epoch20.png';

// Part B: Class-Conditioned UNet
import classCondTrainAlgo from '@/assets/project5/B/2.5_train_algo.png';
import classCondLoss from '@/assets/project5/B/2.5_loss_curve.png';
import classCondSamplingAlgo from '@/assets/project5/B/2.6_sampling_algo.png';
import classCondEpoch1 from '@/assets/project5/B/2.6_epoch1.png';
import classCondEpoch5 from '@/assets/project5/B/2.6_epoch5.png';
import classCondEpoch10 from '@/assets/project5/B/2.6_epoch10.png';
import noSchedulerEpoch1 from '@/assets/project5/B/2.6_no_scheduler_epoch1.png';
import noSchedulerEpoch5 from '@/assets/project5/B/2.6_no_scheduler_epoch5.png';
import noSchedulerEpoch10 from '@/assets/project5/B/2.6_no_scheduler_epoch10.png';
import noSchedulerLossComp from '@/assets/project5/B/2.6_no_scheduler_loss_curve_comp.png';


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
    { id: 'partb-overview', title: 'Part B: Training Diffusion Models', icon: <Code className="h-4 w-4" /> },
    { id: 'partb-1', title: 'B.1 – Single-Step Denoising', icon: <Zap className="h-4 w-4" /> },
    { id: 'partb-2', title: 'B.2 – Flow Matching Model', icon: <Layers className="h-4 w-4" /> },
    { id: 'partb-2-1', title: 'B.2.1 – Time Conditioning', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'partb-2-2', title: 'B.2.2 – Class Conditioning', icon: <Grid className="h-4 w-4" /> },
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
                className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 ${isActiveSection || isActiveSub
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
          backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.88)), url(${diffusionSamples})`,
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
            Gaussian blurs with tuned kernel sizes partially recover structure, especially at lower timesteps. I logged two of the best-performing configurations for comparison.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {renderImageTile(campanileGaussianGrid, 'Gaussian denoising comparisons', 'Denoised Campanile for k=5 and σ=1.0')}
            {renderImageTile(campanileGaussianDetail, 'Gaussian kernels details', 'Denoised Campanile for k=9 and σ=1.5')}
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

          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h4 className="text-xl font-semibold text-gray-900">How the Notebook Cells Were Filled In</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Schedule</strong>: build <code>strided_timesteps</code> marching 990 → 0 in steps of 30, then pass it to the scheduler so the variance helper stays synchronized.</li>
              <li><strong>DDPM Update</strong>: for each step compute <code>α</code>/<code>β</code>, recover <code>x₀</code>, project to the previous timestep, and add the learned variance term.</li>
              <li><strong>Baselines</strong>: reuse the one-step denoiser and a Gaussian blur to benchmark against the iterative result.</li>
            </ul>

            <div className="bg-gray-900 text-gray-100 text-sm rounded-xl p-4 overflow-x-auto space-y-4">
              <pre className="font-mono whitespace-pre-wrap">
                {`# Timesteps & scheduler
steps = list(range(990, 0, -30)) + [0]
stage_1.scheduler.set_timesteps(timesteps=steps)`}
              </pre>
              <pre className="font-mono whitespace-pre-wrap">
                {`# Core DDPM loop
def add_variance(pred_var, t, image):
    sigma = stage_1.scheduler._get_variance(t, predicted_variance=pred_var)
    return image + torch.exp(0.5 * sigma) * torch.randn_like(image)

def iterative_denoise(im_noisy, i_start, prompt_embeds, timesteps):
    image = im_noisy
    with torch.no_grad():
        for i in range(i_start, len(timesteps) - 1):
            t, prev_t = timesteps[i], timesteps[i + 1]
            alpha_t = alphas_cumprod[t]
            alpha_prev = alphas_cumprod[prev_t]
            alpha = alpha_t / alpha_prev
            beta = 1 - alpha

            model_out = stage_1.unet(
                image.half().cuda(),
                torch.tensor(t, device='cuda'),
                encoder_hidden_states=prompt_embeds.half().cuda(),
                return_dict=False
            )[0]

            noise_est, pred_var = torch.split(model_out, image.shape[1], dim=1)
            x0 = (image - torch.sqrt(1 - alpha_t) * noise_est) / torch.sqrt(alpha_t)
            x_prev = (
                torch.sqrt(alpha_prev) * beta / (1 - alpha_t) * x0
                + torch.sqrt(alpha) * (1 - alpha_prev) / (1 - alpha_t) * image
            )
            image = add_variance(pred_var, t, x_prev)

    return image.cpu().float().detach().numpy()`}
              </pre>
              <pre className="font-mono whitespace-pre-wrap">
                {`# Final comparisons
prompt_embeds = prompt_embeds_dict["a high quality photo"]
i_start = 10
t = steps[i_start]
im_noisy = forward(test_im, t).half().to(device)

clean_iter = iterative_denoise(im_noisy, i_start, prompt_embeds, steps)

with torch.no_grad():
    alpha_t = alphas_cumprod[t]
    noise_est = stage_1.unet(
        im_noisy.half().cuda(),
        torch.tensor(t, device='cuda'),
        encoder_hidden_states=prompt_embeds.half().cuda(),
        return_dict=False
    )[0][:, :3].cpu().float()
    clean_one_step = (
        im_noisy.cpu().float() - torch.sqrt(1 - alpha_t) * noise_est
    ) / torch.sqrt(alpha_t)

blur_filtered = TF.gaussian_blur(
    im_noisy.cpu().float(), kernel_size=[5, 5], sigma=[2.0, 2.0]
)

# These arrays back the comparison mosaic shown above.`}
              </pre>
            </div>
          </div>
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

          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h4 className="text-xl font-semibold text-gray-900">How γ = 7 Guidance Was Implemented</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Reuse the same timestep stride as the unconditional loop so variance sampling stays aligned.</li>
              <li>Run the U-Net twice (conditioned + unconditional) and blend the noise terms with γ = 7.</li>
              <li>Project back to <em>t − 30</em>, inject learned variance, and keep tensors on CUDA/Half for parity with the notebook.</li>
            </ul>

            <div className="bg-gray-900 text-gray-100 text-sm rounded-xl p-4 overflow-x-auto">
              <pre className="font-mono whitespace-pre-wrap">
                {`# Prompt embeddings used for CFG
prompt_embeds = prompt_embeds_dict["a high quality photo"]
uncond_prompt_embeds = prompt_embeds_dict[""]


def iterative_denoise_cfg(im_noisy, i_start, prompt_embeds, uncond_prompt_embeds, timesteps, scale=7):
    image = im_noisy

    with torch.no_grad():
        for i in range(i_start, len(timesteps) - 1):
            t, prev_t = timesteps[i], timesteps[i + 1]

            alpha_t = alphas_cumprod[t]
            alpha_prev = alphas_cumprod[prev_t]
            alpha = alpha_t / alpha_prev
            beta = 1 - alpha

            t_tensor = torch.tensor(t, device="cuda")
            cond_out = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=prompt_embeds.half().cuda(),
                return_dict=False
            )[0]
            uncond_out = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=uncond_prompt_embeds.half().cuda(),
                return_dict=False
            )[0]

            noise_cond, pred_var = torch.split(cond_out, image.shape[1], dim=1)
            noise_uncond, _ = torch.split(uncond_out, image.shape[1], dim=1)
            guided_noise = noise_uncond + scale * (noise_cond - noise_uncond)

            x0 = (image - torch.sqrt(1 - alpha_t) * guided_noise) / torch.sqrt(alpha_t)
            x_prev = (
                torch.sqrt(alpha_prev) * beta / (1 - alpha_t) * x0
                + torch.sqrt(alpha) * (1 - alpha_prev) / (1 - alpha_t) * image
            )

            image = add_variance(pred_var, t, x_prev)

    return image.cpu().float().detach().numpy()`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section id="part1-7" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">1.7 Image-to-Image Translation</h3>
          <p className="text-gray-700">
            Used varying noise levels [1, 3, 5, 7, 10, 20] to edit the Campanile and two personal photos of the MIT and an image in the MoMA while conditioning on <em>"a high quality photo"</em>.
          </p>
          <div className="grid gap-6">
            {renderImageTile(campanileEdits, 'Campanile edits across noise levels', 'Campanile image-to-image results')}
            {renderImageTile(personalEditA, 'MIT image edits across noise levels', 'MIT image-to-image results')}
            {renderImageTile(personalEditB, 'Art image edits across noise levels', 'Painting image-to-image results')}
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
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
              {renderImageTile(webOriginal, 'Original web image', 'Original image from the web')}
              {renderImageTile(webEdit1, 'Web edit – noise level 1', 'Noise 1')}
              {renderImageTile(webEditNoise3, 'Web edit – noise level 3', 'Noise 3')}
              {renderImageTile(webEditNoise5, 'Web edit – noise level 5', 'Noise 5')}
              {renderImageTile(webEditNoise7, 'Web edit – noise level 7', 'Noise 7')}
              {renderImageTile(webEditNoise10, 'Web edit – noise level 10', 'Noise 10')}
              {renderImageTile(webEditNoise20, 'Web edit – noise level 20', 'Noise 20')}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-900">Hand-Drawn Example A</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {renderImageTile(handDrawnOriginal1, 'Hand-drawn original A', 'Hand-drawn original A')}
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {renderImageTile(handDrawnOriginal2, 'Hand-drawn original B', 'Hand-drawn original B')}
              {renderImageTile(handDrawn2Noise1, 'Hand-drawn B – noise level 1', 'Noise 1')}
              {renderImageTile(handDrawn2Noise3, 'Hand-drawn B – noise level 3', 'Noise 3')}
              {renderImageTile(handDrawn2Noise5, 'Hand-drawn B – noise level 5', 'Noise 5')}
              {renderImageTile(handDrawn2Noise7, 'Hand-drawn B – noise level 7', 'Noise 7')}
              {renderImageTile(handDrawn2Noise10, 'Hand-drawn B – noise level 10', 'Noise 10')}
              {renderImageTile(handDrawn2Noise20, 'Hand-drawn B – noise level 20', 'Noise 20')}
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
            {renderImageTile(campanileInpaint, 'Campanile inpainting result 1', 'Campanile inpainted with custom mask')}
            {renderImageTile(campanileInpaintMask, 'Campanile inpainting result 2', 'Campanile inpainted with custom mask')}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {renderImageTile(personalInpaintA, 'Personal inpainting example A', 'Custom mask inpainting on drawing')}
            {renderImageTile(personalInpaintB, 'Personal inpainting example B', 'Custom mask inpainting on Big Sur shore')}
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h4 className="text-xl font-semibold text-gray-900">How the Inpainting Loop Works</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Start from pure noise, reusing the CFG loop (γ = 7) to stay consistent with earlier sampling.</li>
              <li>For each stride, blend conditional/unconditional predictions and recover <code>x₀</code> before stepping to the previous timestep.</li>
              <li>Reinject the noisy source outside the binary mask so only masked pixels get regenerated.</li>
            </ul>

            <div className="bg-gray-900 text-gray-100 text-sm rounded-xl p-4 overflow-x-auto">
              <pre className="font-mono whitespace-pre-wrap">
                {`def inpaint(original_image, mask, prompt_embeds, uncond_prompt_embeds, timesteps, scale=7):
    image = torch.randn_like(original_image).to(device).half()

    with torch.no_grad():
        for i in range(len(timesteps) - 1):
            t, prev_t = timesteps[i], timesteps[i + 1]

            alpha_t = alphas_cumprod[t]
            alpha_prev = alphas_cumprod[prev_t]
            alpha = alpha_t / alpha_prev
            beta = 1 - alpha

            t_tensor = torch.tensor(t, device="cuda")
            cond_out = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=prompt_embeds.half().cuda(),
                return_dict=False
            )[0]
            uncond_out = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=uncond_prompt_embeds.half().cuda(),
                return_dict=False
            )[0]

            noise_cond, pred_var = torch.split(cond_out, image.shape[1], dim=1)
            noise_uncond, _ = torch.split(uncond_out, image.shape[1], dim=1)
            guided_noise = noise_uncond + scale * (noise_cond - noise_uncond)

            x0 = (image - torch.sqrt(1 - alpha_t) * guided_noise) / torch.sqrt(alpha_t)
            x_prev = (
                torch.sqrt(alpha_prev) * beta / (1 - alpha_t) * x0
                + torch.sqrt(alpha) * (1 - alpha_prev) / (1 - alpha_t) * image
            )
            x_prev = add_variance(pred_var, t, x_prev)

            noisy_original = forward(original_image, t).half().to(device)
            image = mask * x_prev + (1 - mask) * noisy_original

    return image.cpu().float().detach().numpy()`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section id="part1-7-3" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.7.3 Text-Conditioned Image-to-Image Translation</h3>
          <p className="text-gray-700">
            Re-used the noise sweep but swapped prompts to explore stronger conditioning. The Campanile prompt <em>"a christmas tree with blue lights"</em> showcases dramatic seasonal reimagination, while the personal prompts remix Madonna and a Munich skyline. As you can see with higher noise levels the image resembles more the input image in layout and style. For the campanile it actually leaves the campanile and places the christmas tree small in the bottom left of the image.
          </p>
          {renderImageTile(christmasTreeTranslation, 'Campanile → Christmas tree', 'Prompt: "a christmas tree with blue lights"')}
          {renderImageTile(madonnaTranslation, 'Personal photo → Madonna painting', 'Prompt: "an oil painting of Madonna"')}
          {renderImageTile(munichTranslation, 'Personal photo → Snowy Munich', 'Prompt: "snowy munich with nice lighting"')}
        </div>
      </section>

      <section id="part1-8" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.8 Visual Anagrams</h3>
          <p className="text-gray-700">
            Built the <code className="bg-gray-200 px-2 py-1 rounded">visual_anagrams</code> helper to optimize prompts that morph under 180° rotation. Below you can see two different visual anagrams whereas of the pretzel/yoga pair I decided to show the two best results.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {renderImageTile(visualAnagramA, 'Visual anagram 1', 'Pretzel/Yoga 1')}
            {renderImageTile(visualAnagramB, 'Visual anagram 2', 'Pretzel/Yoga 2')}
            {renderImageTile(visualAnagramBlend, 'Visual anagram 3', 'Cook/Scientist')}
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h4 className="text-xl font-semibold text-gray-900">Key Pieces of the Flip-Illusion Routine</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Run the CFG denoiser twice, once with each prompt, and keep both conditional/unconditional noise estimates.</li>
              <li>Flip the latent horizontally for the second pass, then unflip its guidance term so features meet in the middle.</li>
              <li>Average the two guidance signals before the DDPM projection so the image reads coherently upright and upside down.</li>
            </ul>

            <div className="bg-gray-900 text-gray-100 text-sm rounded-xl p-4 overflow-x-auto">
              <pre className="font-mono whitespace-pre-wrap">
                {`import numpy as np

def visual_anagrams(image, prompt_embeds_1, prompt_embeds_2, uncond_prompt_embeds, timesteps, scale=7):
    with torch.no_grad():
        for i in range(len(timesteps) - 1):
            t, prev_t = timesteps[i], timesteps[i + 1]

            alpha_t = alphas_cumprod[t]
            alpha_prev = alphas_cumprod[prev_t]
            alpha = alpha_t / alpha_prev
            beta = 1 - alpha

            t_tensor = torch.tensor(t, device="cuda")
            cond1 = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=prompt_embeds_1.half().cuda(),
                return_dict=False
            )[0]
            uncond1 = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=uncond_prompt_embeds.half().cuda(),
                return_dict=False
            )[0]

            noise1, pred_var = torch.split(cond1, image.shape[1], dim=1)
            noise1_uncond, _ = torch.split(uncond1, image.shape[1], dim=1)
            eps1 = noise1_uncond + scale * (noise1 - noise1_uncond)

            flipped = torch.flip(image, dims=[2])
            cond2 = stage_1.unet(
                flipped.half().cuda(),
                t_tensor,
                encoder_hidden_states=prompt_embeds_2.half().cuda(),
                return_dict=False
            )[0]
            uncond2 = stage_1.unet(
                flipped.half().cuda(),
                t_tensor,
                encoder_hidden_states=uncond_prompt_embeds.half().cuda(),
                return_dict=False
            )[0]

            noise2, _ = torch.split(cond2, image.shape[1], dim=1)
            noise2_uncond, _ = torch.split(uncond2, image.shape[1], dim=1)
            eps2 = torch.flip(noise2_uncond + scale * (noise2 - noise2_uncond), dims=[2])

            eps = 0.5 * (eps1 + eps2)

            x0 = (image - torch.sqrt(1 - alpha_t) * eps) / torch.sqrt(alpha_t)
            image = add_variance(
                pred_var,
                t,
                torch.sqrt(alpha_prev) * beta / (1 - alpha_t) * x0
                + torch.sqrt(alpha) * (1 - alpha_prev) / (1 - alpha_t) * image
            )

    return image.cpu().float().detach().numpy()`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section id="part1-9" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">1.9 Hybrid Images</h3>
          <p className="text-gray-700">
            Generated hybrid pairs combining low and high frequency components. The first pair merges a picture of robots and dinosaurs; the second fuses a nuclear explosion with a rubber duck.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {renderImageTile(hybridImageA, 'Hybrid image – pair 1', 'Robots and Dinosaurs frequency fusion')}
            {renderImageTile(hybridImageB, 'Hybrid image – pair 2', 'Nuclear Explosion and Rubber Duck frequency fusion')}
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h4 className="text-xl font-semibold text-gray-900">Frequency-Blended Hybrids</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Generate two CFG-guided noise estimates from distinct prompts while staying on the same timestep schedule.</li>
              <li>Low-pass one guidance map (wide Gaussian blur) and keep the complementary high frequencies from the other.</li>
              <li>Combine the filtered signals before the DDPM projection so one scene dominates coarse structure, the other fine detail.</li>
            </ul>

            <div className="bg-gray-900 text-gray-100 text-sm rounded-xl p-4 overflow-x-auto">
              <pre className="font-mono whitespace-pre-wrap">
                {`def make_hybrids(image, prompt_embeds_1, prompt_embeds_2, uncond_prompt_embeds, timesteps, scale=7):
    with torch.no_grad():
        for i in range(len(timesteps) - 1):
            t, prev_t = timesteps[i], timesteps[i + 1]

            alpha_t = alphas_cumprod[t]
            alpha_prev = alphas_cumprod[prev_t]
            alpha = alpha_t / alpha_prev
            beta = 1 - alpha

            t_tensor = torch.tensor(t, device="cuda")
            cond1 = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=prompt_embeds_1.half().cuda(),
                return_dict=False
            )[0]
            uncond1 = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=uncond_prompt_embeds.half().cuda(),
                return_dict=False
            )[0]
            noise1, pred_var = torch.split(cond1, image.shape[1], dim=1)
            noise1_uncond, _ = torch.split(uncond1, image.shape[1], dim=1)
            eps1 = noise1_uncond + scale * (noise1 - noise1_uncond)

            cond2 = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=prompt_embeds_2.half().cuda(),
                return_dict=False
            )[0]
            uncond2 = stage_1.unet(
                image.half().cuda(),
                t_tensor,
                encoder_hidden_states=uncond_prompt_embeds.half().cuda(),
                return_dict=False
            )[0]
            noise2, _ = torch.split(cond2, image.shape[1], dim=1)
            noise2_uncond, _ = torch.split(uncond2, image.shape[1], dim=1)
            eps2 = noise2_uncond + scale * (noise2 - noise2_uncond)

            eps_low = TF.gaussian_blur(eps1, kernel_size=33, sigma=2)
            eps_high = eps2 - TF.gaussian_blur(eps2, kernel_size=33, sigma=2)
            eps = eps_low + eps_high

            x0 = (image - torch.sqrt(1 - alpha_t) * eps) / torch.sqrt(alpha_t)
            image = add_variance(
                pred_var,
                t,
                torch.sqrt(alpha_prev) * beta / (1 - alpha_t) * x0
                + torch.sqrt(alpha) * (1 - alpha_prev) / (1 - alpha_t) * image
            )

    return image.cpu().float().detach().numpy()`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Part B Overview */}
      <section id="partb-overview" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Part B: Training Your Own Diffusion Model!</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-gray-300">
              In this part, I trained my own diffusion models from scratch on the MNIST dataset. Starting with a simple single-step denoiser, I progressively built up to a full flow matching model with time and class conditioning. Each step revealed how these models learn to denoise and generate realistic digits.
            </p>
          </div>
        </div>
      </section>
      {/* Part B.1: Single-Step Denoising UNet */}
      <section id="partb-1" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">Part B.1: Training a Single-Step Denoising UNet</h3>

          <div className="bg-gray-50 border rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">UNet Architecture</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Before diving into training, here's the UNet architecture I implemented. It consists of downsampling blocks (encoder), upsampling blocks (decoder), and skip connections that help preserve spatial information:
            </p>
            {renderImageTile(
              unetArchitecture,
              'UNet architecture diagram',
              'UNet with downsampling, upsampling, and skip connections'
            )}

            <div className="mt-6">
              <h5 className="font-semibold text-gray-900 mb-3">Standard UNet Operations</h5>
              <p className="text-gray-700 mb-3">
                The UNet uses several standard operations including convolutions, group normalization, and upsampling:
              </p>
              {renderImageTile(
                unetOperations,
                'Standard UNet operations',
                'Conv2d, GroupNorm, and Upsample building blocks'
              )}
            </div>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">The Denoising Problem</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The goal is straightforward: given a noisy image <code className="bg-gray-200 px-2 py-1 rounded">z = x + σε</code>, train a UNet to predict the clean image <code className="bg-gray-200 px-2 py-1 rounded">x</code>. I implemented a UNet with downsampling and upsampling blocks, trained it on MNIST digits with <code className="bg-gray-200 px-2 py-1 rounded">σ = 0.5</code>, and watched it learn to denoise over 5 epochs.
            </p>

            <div className="bg-white border rounded-xl p-4 mb-6">
              <h5 className="font-semibold text-gray-900 mb-3">Training Configuration</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Dataset:</strong> MNIST (28×28 grayscale digits)</li>
                <li><strong>Noise level:</strong> σ = 0.5</li>
                <li><strong>Architecture:</strong> UNet with hidden dimension D = 128</li>
                <li><strong>Optimizer:</strong> Adam (lr = 1e-4)</li>
                <li><strong>Training:</strong> 5 epochs, batch size 256</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Noising Process Visualization</h5>
                <p className="text-gray-700 mb-3">
                  First, I visualized how different noise levels affect the digits. As σ increases from 0.0 to 1.0, the digits progressively become more corrupted:
                </p>
                {renderImageTile(
                  noisingVisualization,
                  'Noising process visualization',
                  'MNIST digits with σ ∈ {0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0}'
                )}
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Training Loss Curve</h5>
                <p className="text-gray-700 mb-3">
                  The model converged smoothly over 5 epochs. The loss curve shows steady improvement as the UNet learned to map noisy digits back to clean ones:
                </p>
                {renderImageTile(
                  partB1TrainingLoss,
                  'Training loss curve',
                  'Loss curve over 5 epochs for single-step denoiser (σ = 0.5)'
                )}
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">After Epoch 1</h5>
                {renderImageTile(
                  partB1Epoch1,
                  'Denoising results after epoch 1',
                  'Test set results after 1 epoch of training'
                )}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 mt-6">After Epoch 5</h5>
                  {renderImageTile(
                    partB1Epoch5,
                    'Denoising results after epoch 5',
                    'Test set results after 5 epochs of training'
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Out-of-Distribution Testing</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {"Since the model was trained exclusively on σ = 0.5, I tested how it generalizes to other noise levels. Interestingly, it performs reasonably well even on noise levels it never saw during training, though performance degrades at the extremes (σ -> 1.0)."}
            </p>
            <div className="space-y-4">
              {renderImageTile(oodSigma0, 'σ = 0.0', 'Clean digits (no noise)')}
              {renderImageTile(oodSigma02, 'σ = 0.2', 'Low noise level')}
              {renderImageTile(oodSigma04, 'σ = 0.4', 'Medium-low noise')}
              {renderImageTile(oodSigma05, 'σ = 0.5', 'Training noise level')}
              {renderImageTile(oodSigma06, 'σ = 0.6', 'Medium-high noise')}
              {renderImageTile(oodSigma08, 'σ = 0.8', 'High noise level')}
              {renderImageTile(oodSigma10, 'σ = 1.0', 'Maximum noise')}
            </div>
          </div>
        </div>
      </section>

      {/* Part B.2: Flow Matching Model */}
      <section id="partb-2" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">Part B.2: Training a Flow Matching Model</h3>

          <div className="bg-white border rounded-2xl p-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              Single-step denoising is cool, but iterative denoising is where the magic happens. I implemented a flow matching model that learns to denoise step-by-step, moving from pure noise to clean digits. The key insight: instead of predicting the clean image directly, predict the <em>noise</em> that was added, then iteratively remove it.
            </p>


          </div>
        </div>
      </section>

      {/* Part B.2.1: Time Conditioning */}
      <section id="partb-2-1" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">B.2.1: Time Conditioning</h3>

          <div className="bg-gray-50 border rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Time-Conditioned UNet Architecture</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The key modification for time conditioning is adding fully-connected blocks (FCBlocks) that inject the timestep information throughout the network:
            </p>
            {renderImageTile(
              timeCondUnetArch,
              'Time-conditioned UNet architecture',
              'UNet with time conditioning via FCBlocks'
            )}

            <div className="mt-6">
              <h5 className="font-semibold text-gray-900 mb-3">FCBlock for Time Conditioning</h5>
              <p className="text-gray-700 mb-3">
                The FCBlock takes the timestep embedding and conditions each layer of the UNet:
              </p>
              {renderImageTile(
                fcBlock,
                'FCBlock diagram',
                'Fully-connected block for injecting time information'
              )}
            </div>

            <div className="mt-6">
              <h5 className="font-semibold text-gray-900 mb-3">Training Algorithm</h5>
              <p className="text-gray-700 mb-3">
                The training loop samples random timesteps and trains the model to predict noise at each step:
              </p>
              {renderImageTile(
                timeCondTrainAlgo,
                'Training algorithm',
                'Algorithm for training time-conditioned UNet'
              )}
            </div>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Why Time Conditioning?</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The variance of noisy images changes with timestep <code className="bg-gray-200 px-2 py-1 rounded">t</code>. At <code className="bg-gray-200 px-2 py-1 rounded">t=0</code>, we have clean images; at <code className="bg-gray-200 px-2 py-1 rounded">t=T</code>, pure noise. To handle this, I added time conditioning to the UNet using fully-connected blocks that inject the timestep information throughout the network.
            </p>

            <div className="bg-white border rounded-xl p-4 mb-6">
              <h5 className="font-semibold text-gray-900 mb-3">Training Configuration</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Timesteps:</strong> T = 300 (reduced from 1000 for MNIST simplicity)</li>
                <li><strong>Architecture:</strong> Time-conditioned UNet with D = 64</li>
                <li><strong>Optimizer:</strong> Adam (lr = 1e-3) with exponential decay (γ = 0.1^(1/20))</li>
                <li><strong>Training:</strong> 20 epochs, batch size 128</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Sampling Algorithm</h5>
                <p className="text-gray-700 mb-3">
                  To generate new digits, we start from pure noise and iteratively denoise using the trained model:
                </p>
                {renderImageTile(
                  timeCondSamplingAlgo,
                  'Sampling algorithm',
                  'Iterative denoising algorithm for generation'
                )}
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Training Loss Curve</h5>
                {renderImageTile(
                  timeCondLoss,
                  'Time-conditioned training loss',
                  'Training loss over 20 epochs'
                )}
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Sampling Results Over Training</h5>
                <p className="text-gray-700 mb-3">
                  I sampled from the model after epochs 1, 5, 10, 15, and 20. Early on, the model produces blurry blobs. By epoch 20, it generates recognizable digits, though without class conditioning they're random:
                </p>
                <div className="space-y-4">
                  {renderImageTile(timeCondEpoch1, 'Epoch 1', 'Early training - blurry blobs')}
                  {renderImageTile(timeCondEpoch5, 'Epoch 5', 'Starting to form shapes')}
                  {renderImageTile(timeCondEpoch10, 'Epoch 10', 'Recognizable digits')}
                  {renderImageTile(timeCondEpoch20, 'Epoch 20', 'Clear digits')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part B.2.2: Class Conditioning */}
      <section id="partb-2-2" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          <h3 className="text-2xl font-semibold text-gray-900">B.2.2: Class Conditioning with CFG</h3>

          <div className="bg-white border rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Controlling What We Generate</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Time conditioning lets us denoise iteratively, but we still can't control <em>which</em> digit gets generated. Enter class conditioning: I added one-hot vectors representing digits 0-9 to the UNet, along with 10% dropout during training so the model can still work unconditionally. At inference time, I used classifier-free guidance (CFG) with γ = 5 to amplify the class signal.
            </p>



            <div className="bg-white border rounded-xl p-4 mb-6">
              <h5 className="font-semibold text-gray-900 mb-3">Training Configuration</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Conditioning:</strong> One-hot vectors for digits 0-9</li>
                <li><strong>Dropout:</strong> 10% unconditional training</li>
                <li><strong>Guidance scale:</strong> γ = 5 at inference</li>
                <li><strong>Same hyperparameters</strong> as time-conditioned model</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Training Algorithm with Class Conditioning</h5>
                <p className="text-gray-700 mb-3">
                  The training algorithm now includes class labels and implements 10% dropout for classifier-free guidance:
                </p>
                {renderImageTile(
                  classCondTrainAlgo,
                  'Class-conditioned training algorithm',
                  'Training with class labels and dropout'
                )}
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Sampling with Classifier-Free Guidance</h5>
                <p className="text-gray-700 mb-3">
                  At inference, we use CFG to amplify the class signal and generate specific digits:
                </p>
                {renderImageTile(
                  classCondSamplingAlgo,
                  'CFG sampling algorithm',
                  'Sampling with classifier-free guidance (γ=5)'
                )}
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Training Loss Curve</h5>
                {renderImageTile(
                  classCondLoss,
                  'Class-conditioned training loss',
                  'Training loss over 20 epochs with class conditioning'
                )}
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Class-Conditioned Sampling Results</h5>
                <p className="text-gray-700 mb-3">
                  With class conditioning and CFG, I can now generate specific digits on demand. The results after 20 epochs are remarkably clean and diverse. Each row shows samples for a specific digit class:
                </p>
                <div className="space-y-4">
                  {renderImageTile(classCondEpoch1, 'Epoch 1', 'Early class-conditioned training')}
                  {renderImageTile(classCondEpoch5, 'Epoch 5', 'Digits becoming class-specific')}
                  {renderImageTile(classCondEpoch10, 'Epoch 10', 'Clean, controllable generation')}
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-6 mt-6">
                <h5 className="font-semibold text-gray-900 mb-3">Removing the Learning Rate Scheduler</h5>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  To maintain performance without the exponential learning rate scheduler, I reduced the constant learning rate from 1e-2 to 2e-3.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The original scheduler started with a high learning rate (1e-2) for fast initial convergence, then decayed it (γ ≈ 0.794 per epoch) to allow the model to fine-tune and stabilize in later epochs.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Without this decay, a constant moderate learning rate (5e-3) caused training instability in later epochs - the optimizer continued taking relatively large steps that prevented the model from settling into a good solution, leading to degraded sample quality at epoch 10 despite lower training loss.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h6 className="font-semibold text-gray-900 mb-2">What Changed:</h6>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Removed exponential learning rate scheduler</li>
                    <li>Used constant learning rate of 2e-3 (instead of starting at 1e-3 with decay)</li>
                    <li>Maintained same training duration (20 epochs)</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div>
                    <h6 className="font-semibold text-gray-900 mb-3">Loss Curve Comparison</h6>
                    <p className="text-gray-700 mb-3 text-sm">
                      The comparison shows both the full training curve and a zoomed view of the first 200 iterations. The no-scheduler version converges more slowly initially but maintains steady progress:
                    </p>
                    {renderImageTile(
                      noSchedulerLossComp,
                      'Loss curve comparison',
                      'Training loss with and without scheduler (full + zoomed first 200 iterations)'
                    )}
                  </div>

                  <div>
                    <h6 className="font-semibold text-gray-900 mb-3">Sample Quality Comparison</h6>
                    <p className="text-gray-700 mb-3 text-sm">
                      Despite the simpler training procedure, the no-scheduler version achieves comparable sample quality:
                    </p>
                    <div className="space-y-4">
                      {renderImageTile(noSchedulerEpoch1, 'No-scheduler Epoch 1', 'Early training without scheduler')}
                      {renderImageTile(noSchedulerEpoch5, 'No-scheduler Epoch 5', 'Mid-training without scheduler')}
                      {renderImageTile(noSchedulerEpoch10, 'No-scheduler Epoch 10', 'Final results without scheduler')}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                  <h6 className="font-semibold text-green-900 mb-2">Results</h6>
                  <p className="text-green-800 text-sm leading-relaxed">
                    By using a lower constant learning rate of 2e-3, the model trades off slower initial convergence for better stability throughout training, maintains consistent sample quality across all epochs, avoids the late-stage instability that occurs with higher constant learning rates, and achieves comparable final performance to the scheduled version.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Key Insight</h5>
                <p className="text-blue-800 text-sm leading-relaxed">
                  The progression from single-step denoising → time conditioning → class conditioning mirrors the evolution of modern diffusion models. Each step adds more control and better quality, culminating in a model that can generate specific, high-quality digits from pure noise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Takeaways Section */}
      <section id="takeaways" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Takeaways</h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Part A: The Power of Pretrained Models</h3>
              <p className="text-gray-700 leading-relaxed">
                Working with DeepFloyd IF showed me how sophisticated even simple diffusion models are. From simple prompt embeddings to complex techniques like CFG, inpainting, and visual anagrams, these models are incredibly versatile. The iterative denoising process is elegant: each step refines the image, building up from noise to photorealistic results.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Part B: Building From Scratch</h3>
              <p className="text-gray-700 leading-relaxed">
                Training my own diffusion models from scratch was eye-opening. Starting with a simple single-step denoiser and progressively adding time and class conditioning revealed how these models actually learn. The flow matching formulation is mathematically elegant, and seeing the model evolve from producing blurry blobs to crisp, controllable digits over 20 epochs was incredibly satisfying.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">The Magic of Diffusion</h3>
              <p className="text-gray-700 leading-relaxed">
                What strikes me most is how diffusion models turn the denoising problem into a generative one. By learning to reverse the noising process, they can start from pure randomness and sculpt it into meaningful images. Whether it's generating a "rocket ship" with DeepFloyd or a specific MNIST digit with my trained model, the underlying principle is the same: iterative refinement guided by learned priors.
              </p>
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
