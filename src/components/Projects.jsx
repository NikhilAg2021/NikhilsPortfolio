import React from 'react';
import { ExternalLink, Github, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';

const Projects = () => {
  const projects = [
    {
      title: 'StockPulse: Data Driven Market Insights',
      description: 'Built a comprehensive web application for stock price forecasting that compares GAN, LSTM, and GRU models for predictive accuracy. Created a trader-focused website with company information, technical analysis, and price forecasts with a responsive frontend.',
      technologies: ['Python', 'Flask', 'JavaScript', 'ReactJS', 'REST APIs', 'Machine Learning', 'LSTM', 'GAN', 'GRU'],
      icon: <TrendingUp className="text-teal-400" size={32} />,
      gradient: 'from-teal-500/20 to-cyan-500/20',
      borderColor: 'border-teal-500/30 hover:border-teal-500',
      link: null // No link for this project
    },
    {
      title: 'Official Website for Team UAV',
      description: 'Developed a professional team website from scratch. Collaborated with 10 developers using Agile methodology, which improved deployment speed by 25%. Implemented responsive design and modern web development practices.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Git', 'Agile', 'Responsive Design'],
      icon: <Users className="text-cyan-400" size={32} />,
      gradient: 'from-cyan-500/20 to-purple-500/20',
      borderColor: 'border-cyan-500/30 hover:border-cyan-500',
      link: 'https://teamuav.github.io/Website/#home'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-teal-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing some of my key projects that demonstrate my technical skills and problem-solving abilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${project.gradient} p-8 rounded-2xl border-2 ${project.borderColor} transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl group`}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {project.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1.5 bg-gray-900/80 text-gray-300 text-sm rounded-full border border-gray-700 hover:border-teal-500/50 hover:text-teal-400 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-teal-400 text-teal-400 hover:bg-teal-400/10 transition-all"
                    >
                      <ExternalLink size={18} />
                      View Project
                    </Button>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Want to see more of my work?</p>
          <a
            href="https://github.com/NikhilAg2021"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Github size={20} />
              Visit My GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;