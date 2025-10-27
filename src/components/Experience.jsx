import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Accenture',
      role: 'Advanced Application Systems Engineer',
      period: 'Oct 2024 - Present',
      location: 'Bangalore, India',
      responsibilities: [
        'Developed and maintained Java-based web applications using Spring Boot and ReactJS',
        'Built and consumed RESTful APIs to support scalable microservices architecture',
        'Integrated AWS services and CI/CD pipelines for automated deployment and monitoring',
        'Collaborated with cross-functional Agile teams, boosting sprint efficiency by 20%'
      ],
      color: 'teal'
    },
    {
      company: 'Accenture',
      role: 'Advanced Systems Engineer',
      period: 'Jun 2023 - Jul 2023',
      location: 'Bangalore, India',
      responsibilities: [
        'Hands-on with AWS Security, managing ACLs and subnets',
        'Acquired foundational knowledge of AI, 5G, Edge Computing, and Cryptographic Computing'
      ],
      color: 'cyan'
    },
    {
      company: 'L&T-SWC',
      role: 'Software Developer Intern',
      period: 'May 2022 - Jul 2022',
      location: 'Bengaluru, India',
      responsibilities: [
        'Designed dynamic website integrating open-source maps with device markers and clusters',
        'Built user authentication modules (signup/login/logout) using PHP and MySQL',
        'Improved REST API performance by 15% using Axios optimization'
      ],
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      teal: 'border-teal-500/30 hover:border-teal-500',
      cyan: 'border-cyan-500/30 hover:border-cyan-500',
      purple: 'border-purple-500/30 hover:border-purple-500'
    };
    return colors[color] || colors.teal;
  };

  const getDotColor = (color) => {
    const colors = {
      teal: 'bg-teal-400',
      cyan: 'bg-cyan-400',
      purple: 'bg-purple-400'
    };
    return colors[color] || colors.teal;
  };

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-teal-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional journey showcasing my growth as a Full Stack Developer and Systems Engineer.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-400 via-cyan-400 to-purple-400"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? '' : 'md:text-right'}`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8">
                  <div className={`w-4 h-4 ${getDotColor(exp.color)} rounded-full ring-4 ring-black`}></div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'}`}>
                  <div className={`bg-gray-900 p-8 rounded-2xl border-2 ${getColorClasses(exp.color)} transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl`}>
                    <div className="flex items-start gap-3 mb-4">
                      <Briefcase className={`${exp.color === 'teal' ? 'text-teal-400' : exp.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'} flex-shrink-0 mt-1`} size={24} />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-xl text-gray-300 font-semibold">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex} className="flex items-start gap-3 text-gray-300">
                          <span className={`${getDotColor(exp.color)} w-2 h-2 rounded-full mt-2 flex-shrink-0`}></span>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;