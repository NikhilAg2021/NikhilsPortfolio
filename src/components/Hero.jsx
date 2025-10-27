import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-teal-400 text-sm font-mono bg-teal-400/10 px-4 py-2 rounded-full border border-teal-400/20">
              Advanced Application Systems Engineer
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Nikhil Agarwal
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Full Stack Developer specializing in Java, Spring Boot, and ReactJS. Building scalable web applications with modern technologies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
            >
              View My Work
              <ArrowRight size={20} />
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-teal-400 text-teal-400 hover:bg-teal-400/10 px-8 py-6 rounded-lg font-medium transition-all hover:scale-105"
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="mailto:nikhilagarwal.20.na@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-all hover:scale-110"
            >
              <Mail size={24} />
            </a>
            <a
              href="https://github.com/NikhilAg2021"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-all hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-agarwal-2020/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition-all hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-teal-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;