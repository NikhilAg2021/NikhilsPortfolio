import React from 'react';
import { Code, Database, Cloud, Wrench, Brain, Users } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code className="text-teal-400" size={32} />,
      skills: ['Java', 'JavaScript', 'HTML', 'CSS', 'Python']
    },
    {
      title: 'Frameworks',
      icon: <Wrench className="text-cyan-400" size={32} />,
      skills: ['Spring', 'Spring Boot', 'ReactJS', 'Flask']
    },
    {
      title: 'Database & Cloud',
      icon: <Database className="text-purple-400" size={32} />,
      skills: ['MySQL', 'AWS', 'CI/CD', 'REST APIs', 'Microservices']
    },
    {
      title: 'Tech Skills',
      icon: <Cloud className="text-pink-400" size={32} />,
      skills: ['Data Structures', 'Algorithms', 'OOPs', 'Operating Systems', 'Web Development']
    },
    {
      title: 'Soft Skills',
      icon: <Brain className="text-orange-400" size={32} />,
      skills: ['Problem Solving', 'Analytical Reasoning', 'Logical Thinking', 'Time Management']
    },
    {
      title: 'Leadership',
      icon: <Users className="text-green-400" size={32} />,
      skills: ['Teamwork', 'Communication', 'Leadership', 'Planning', 'Agile Methodology']
    }
  ];

  return (
    <section id="skills" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-teal-400">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive set of technical and soft skills gained through professional experience, academic learning, and hands-on projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700 hover:border-teal-500/50 hover:text-teal-400 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;