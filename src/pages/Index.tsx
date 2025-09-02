import React from 'react';
import { AssignmentSection } from '@/components/AssignmentSectionNew';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Camera, Users, Building, Clapperboard } from 'lucide-react';
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

const Index = () => {

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
        subtitle="Selfie: The Wrong Way vs. The Right Way "
        description="The close-up selfie appears distorted because of perspective distortion, when the camera is too close, facial features nearest to the lens (like the nose) appear disproportionately large compared to features further away (like the ears). This creates an unflattering, warped appearance. The zoomed portrait looks much better because stepping back and using zoom maintains proper facial proportions. The longer focal length compresses the depth, making all facial features appear more naturally sized relative to each other."
        icon={<Users className="h-8 w-8" />}
        className="bg-secondary/30"
      >
                <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <img 
              src={distorted} 
              alt="Close-up Portrait (No Zoom)" 
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-center text-muted-foreground">Close-up Portrait (No Zoom)</p>
          </div>
          <div className="space-y-2">
            <img 
              src={zoomed} 
              alt="Zoomed Portrait (With Zoom)" 
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-center text-muted-foreground">Zoomed Portrait (With Zoom)</p>
          </div>
        </div>
      </AssignmentSection>

      {/* Part 2: Architectural Perspective */}
      <AssignmentSection
        title="Part 2"
        subtitle="Architectural Perspective Compression"
        description="The zoomed street view appears flattened or compressed because longer focal lengths compress the perception of depth. When you zoom in from a distance, the telephoto effect makes objects at different distances appear closer together than they actually are. This compression effect minimizes the apparent size differences between foreground and background elements, creating a 'stacked' appearance. In contrast, the wide-angle shot taken from closer maintains natural depth perception, where nearby objects appear larger and distant objects smaller, preserving the three-dimensional relationship between elements in the scene."
        icon={<Building className="h-8 w-8" />}
      >
        <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <img 
              src={ex2_1_no_zoom} 
              alt="No Zoom" 
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-center text-muted-foreground">No Zoom</p>
          </div>
          <div className="space-y-2">
            <img 
              src={ex2_1_zoom} 
              alt="Zoomed (Compressed)" 
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-center text-muted-foreground">Zoomed (Compressed)</p>
          </div>
         
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
         
          <div className="space-y-2">
            <img 
              src={ex2_2_no_zoom} 
              alt="No Zoom" 
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-center text-muted-foreground">No Zoom</p>
          </div>
          <div className="space-y-2">
            <img 
              src={ex2_2_zoom} 
              alt="Zoomed (Compressed)" 
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-center text-muted-foreground">Zoomed (Compressed)</p>
          </div>
        </div>
      </AssignmentSection>

      {/* Part 3: Dolly Zoom */}
      <AssignmentSection
        title="Part 3"
        subtitle="The Dolly Zoom (Vertigo Effect)"
        description="The dolly zoom creates a disorienting 'vertigo' effect by simultaneously moving the camera backward while zooming in (or forward while zooming out). This technique keeps the main subject the same size in frame while dramatically changing the background perspective. As you move back and zoom in, the background appears to 'stretch away' due to the telephoto compression effect, distant objects seem to get farther apart and the depth of field flattens. This contradicts our brain's expectation of how perspective should change with distance, creating the unsettling, dreamlike sensation famously used in films like Hitchcock's 'Vertigo' and Spielberg's 'Jaws'."
        icon={<Clapperboard className="h-8 w-8" />}
        className="bg-secondary/30"
      >
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <img 
              src={ex3} 
              alt="Dolly Zoom Effect (Vertigo Effect) - Example 1" 
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-center text-muted-foreground">Dolly Zoom Effect - Example 1</p>
          </div>
          <div className="space-y-2">
            <img 
              src={ex3_2} 
              alt="Dolly Zoom Effect (Vertigo Effect) - Example 2" 
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-center text-muted-foreground">Dolly Zoom Effect - Example 2</p>
          </div>
        </div>
      </AssignmentSection>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={bearIcon} alt="Bear" className="h-8 w-8 opacity-80" />
            <h3 className="text-xl font-semibold">CS180 Assignment 0</h3>
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
