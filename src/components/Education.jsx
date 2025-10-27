import React from 'react';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const education = [
    {
      institution: 'Vellore Institute of Technology, Vellore',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      period: 'Aug 2020 - Aug 2024',
      location: 'Vellore, India',
      grade: 'CGPA: 8.71/10',
      color: 'teal'
    },
    {
      institution: 'Don Bosco School Park Circus',
      degree: 'Indian School Certificate Examinations (ISC)',
      field: 'Science + Computer',
      period: 'Graduated May 2020',
      location: 'Kolkata, India',
      grade: 'Percentage: 94.75%',
      color: 'cyan'
    }
  ];

  const certifications = [
    {
      title: 'Generative AI Foundations Certificate',
      issuer: 'upGrad in collaboration with Microsoft',
      date: 'September 2025 (Expected)',
      icon: <Award className="text-purple-400" size={24} />
    },
    {
      title: 'Java Full Stack Development',
      issuer: 'Accenture Internal Training',
      date: 'January 2025 (Expected)',
      icon: <Award className="text-pink-400" size={24} />
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      teal: 'border-teal-500/30 hover:border-teal-500',
      cyan: 'border-cyan-500/30 hover:border-cyan-500'
    };
    return colors[color] || colors.teal;
  };

  return (
    <section id="education" className="py-24 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Education & <span className="text-teal-400">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Academic background and professional certifications that shaped my technical expertise.
          </p>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="text-teal-400" size={32} />
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`bg-gray-900 p-8 rounded-2xl border-2 ${getColorClasses(edu.color)} transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl`}
              >
                <h4 className="text-xl font-bold text-white mb-2">{edu.institution}</h4>
                <p className="text-lg text-gray-300 font-semibold mb-4">{edu.degree}</p>
                <p className="text-teal-400 mb-4">{edu.field}</p>
                
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <div className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full">
                  <span className="text-teal-400 font-semibold">{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="text-cyan-400" size={32} />
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{cert.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">{cert.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm">{cert.date}</p>
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

export default Education;