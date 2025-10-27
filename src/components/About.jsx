import React from 'react';
import { User, Code, Heart } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-teal-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-8 rounded-2xl border border-teal-500/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <User className="text-teal-400" size={28} />
                Professional Background
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer currently working as an Advanced Application Systems Engineer at Accenture. With a strong foundation in Computer Science from VIT Vellore (CGPA: 8.71), I specialize in building scalable web applications using modern technologies.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 p-8 rounded-2xl border border-cyan-500/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Code className="text-cyan-400" size={28} />
                What I Do
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I develop and maintain Java-based web applications using Spring Boot and ReactJS, build RESTful APIs for microservices architecture, and integrate AWS services with CI/CD pipelines for automated deployment and monitoring.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Heart className="text-purple-400" size={28} />
                Beyond Code
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Beyond coding, I'm a natural leader. I led a 50-member dance team at VIT to multiple inter-college victories and managed logistics for large-scale events with 10,000+ attendees. This experience taught me teamwork, communication, and project management.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">Problem Solving</span>
                      <span className="text-teal-400">95%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">Full Stack Development</span>
                      <span className="text-teal-400">90%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">Cloud & DevOps</span>
                      <span className="text-teal-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">Team Leadership</span>
                      <span className="text-teal-400">92%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">Communication</span>
                      <span className="text-teal-400">88%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-teal-500/10 to-transparent p-6 rounded-xl border border-teal-500/20 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">2+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-6 rounded-xl border border-cyan-500/20 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">10+</div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 rounded-xl border border-purple-500/20 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-gray-400 text-sm">Team Members Led</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500/10 to-transparent p-6 rounded-xl border border-pink-500/20 text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">8.71</div>
                <div className="text-gray-400 text-sm">CGPA at VIT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;