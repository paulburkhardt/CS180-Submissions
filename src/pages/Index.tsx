import React, { useState } from 'react';
import { AssignmentSection } from '@/components/AssignmentSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Camera, Users, Building, Clapperboard } from 'lucide-react';
import mountainHero from '@/assets/mountain-hero.jpg';
import bearIcon from '@/assets/bear-icon.png';

const Index = () => {
  const [part1Files, setPart1Files] = useState<File[]>([]);
  const [part2Files, setPart2Files] = useState<File[]>([]);
  const [part3Files, setPart3Files] = useState<File[]>([]);

  const handlePart1Upload = (files: File[]) => {
    setPart1Files(prev => [...prev, ...files]);
  };

  const handlePart2Upload = (files: File[]) => {
    setPart2Files(prev => [...prev, ...files]);
  };

  const handlePart3Upload = (files: File[]) => {
    setPart3Files(prev => [...prev, ...files]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${mountainHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 nature-pattern opacity-30"></div>
        
        <div className="relative text-center text-white px-4 max-w-4xl">
          <ScrollReveal>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img src={bearIcon} alt="Bear" className="h-16 w-16 animate-float" />
              <Camera className="h-16 w-16 animate-float" style={{ animationDelay: '1s' }} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 mountain-gradient bg-clip-text text-transparent">
              Becoming Friends with Your Camera
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              A Photography Journey Through Kings Canyon National Park
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-lg">
                <strong>Due Date:</strong> Tuesday, September 2nd, 2025 at 11:59PM
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Assignment Overview */}
      <ScrollReveal className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Assignment Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            In this class, we want you to become friends with every pixel. The first step toward this goal 
            is to become friends with your camera—e.g., the one in your smartphone. The goal of this project 
            is to get you some intuitive understanding of the somewhat subtle relationship between perspective, 
            focal length/zoom, and the center of projection.
          </p>
        </div>
      </ScrollReveal>

      {/* Part 1: Selfie */}
      <AssignmentSection
        title="Part 1"
        subtitle="Selfie: The Wrong Way vs. The Right Way"
        description="Take a picture of your friend (or yourself) from close up. You get a typical distorted selfie image. Now step back several feet from your subject, zoom in, and take a second picture. Try to get the face in the second photo to be the same size as in the first photo. If you've done things right, the second portrait should look much better than the first one. Think about why this is."
        uploadTitle="Upload Your Portrait Comparison"
        uploadDescription="Upload 1-2 photos showing the close-up vs. zoomed comparison"
        onFileUpload={handlePart1Upload}
        uploadedFiles={part1Files}
        icon={<Users className="h-8 w-8" />}
        className="bg-secondary/30"
      />

      {/* Part 2: Architectural Perspective */}
      <AssignmentSection
        title="Part 2"
        subtitle="Architectural Perspective Compression"
        description="Let's repeat the same procedure in reverse, for an urban scene. Pick a nice view down a long street (or a walking path on campus), zoom in, and take a photo. Now, walk down the street in the direction of your first shot, and take a second photo without zoom, such that the scene in the two photos appears approximately the same size. The first picture should look flattened, or compressed, compared to the second."
        uploadTitle="Upload Your Perspective Study"
        uploadDescription="Upload 1-2 photos showing the compressed vs. natural perspective"
        onFileUpload={handlePart2Upload}
        uploadedFiles={part2Files}
        icon={<Building className="h-8 w-8" />}
      />

      {/* Part 3: Dolly Zoom */}
      <AssignmentSection
        title="Part 3"
        subtitle="The Dolly Zoom (Vertigo Effect)"
        description="The idea is to simultaneously move the camera back while also zooming in. First, come up with a good setting for the shot (e.g., a scene with stuffed animals is one popular choice). Now take a few (4-8 or even more!) still photos while you move the camera back and zoom in, keeping the resulting image roughly the same size. Combine your stills into an animated GIF file—you have a dolly zoom!"
        uploadTitle="Upload Your Dolly Zoom"
        uploadDescription="Upload your animated GIF or individual frames from your dolly zoom sequence"
        onFileUpload={handlePart3Upload}
        uploadedFiles={part3Files}
        icon={<Clapperboard className="h-8 w-8" />}
        className="bg-secondary/30"
      />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={bearIcon} alt="Bear" className="h-8 w-8 opacity-80" />
            <h3 className="text-xl font-semibold">Kings Canyon Photography Assignment</h3>
          </div>
          <p className="text-primary-foreground/80">
            Capturing the beauty of perspective and focal length in nature's grandest classroom
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
