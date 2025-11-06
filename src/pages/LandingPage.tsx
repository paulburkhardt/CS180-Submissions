import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SocialLinks } from '@/components/SocialLinks';
import { Camera, BookOpen, ArrowRight, Palette, Filter, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import mountainHero from '@/assets/mountain-hero.jpg';
import bearIcon from '@/assets/bear-icon.png';

const LandingPage = () => {
  const projects = [
    {
      id: 'project-0',
      title: 'Project 0',
      subtitle: 'Becoming Friends with Your Camera',
      description: 'Understanding perspective, focal length, and the center of projection through photography.',
      path: '/project-0',
      icon: <Camera className="h-6 w-6" />,
    },
    {
      id: 'project-1',
      title: 'Project 1',
      subtitle: 'Images of the Russian Empire',
      description: 'Colorizing the Prokudin-Gorskii photo collection using computational photography and image alignment techniques.',
      path: '/project-1',
      icon: <Palette className="h-6 w-6" />,
    },
    {
      id: 'project-2',
      title: 'Project 2',
      subtitle: 'Fun with Filters and Frequencies',
      description: 'Exploring 2D convolutions, filtering, hybrid images, and multi-resolution blending techniques for creative visual effects.',
      path: '/project-2',
      icon: <Filter className="h-6 w-6" />,
    },
    {
      id: 'project-3',
      title: 'Project 3',
      subtitle: '[Auto]Stitching Photo Mosaics',
      description: 'Creating image mosaics through projective warping, homography computation, and advanced image stitching techniques.',
      path: '/project-3',
      icon: <ImageIcon className="h-6 w-6" />,
    },
    {
      id: 'project-4',
      title: 'Project 4',
      subtitle: 'Neural Radiance Field!',
      description: 'Building NeRFs: calibration, neural fields, and multi-view volume rendering to reconstruct immersive 3D scenes.',
      path: '/project-4',
      icon: <BookOpen className="h-6 w-6" />,
    }
    // Future projects can be added here
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${mountainHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 nature-pattern opacity-20"></div>
        
        <div className="relative text-center text-white px-4 max-w-5xl">
          <ScrollReveal>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <img src={bearIcon} alt="Bear" className="h-20 w-20 animate-float" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white">
              CS180 Projects
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto">
              A collection of computer vision and computational photography projects exploring the intersection of technology and visual perception.
            </p>
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    const offsetTop = element.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                  }
                }}
              >
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Project Portfolio
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Dive into the fascinating world of computational photography and computer vision through hands-on projects and experiments.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.2}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 min-h-[420px] flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {project.icon}
                      </div>
                      
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-muted-foreground">
                      {project.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link to={project.path}>
                        <Button className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          View Project
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={bearIcon} alt="Bear" className="h-8 w-8 opacity-80" />
            <h3 className="text-xl font-semibold">CS180 Project Collection</h3>
          </div>
          <p className="text-primary-foreground/80 mb-6">
            Exploring the frontiers of computational photography and computer vision
          </p>
          <SocialLinks className="justify-center" iconSize={24} />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
