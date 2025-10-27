import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Since this is a static site, we'll just show a success message
    // In production, this would send to a backend or email service
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-teal-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a
                  href="mailto:nikhilagarwal.20.na@gmail.com"
                  className="flex items-start gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-teal-500/50 transition-all group"
                >
                  <Mail className="text-teal-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white font-medium">nikhilagarwal.20.na@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+919804770368"
                  className="flex items-start gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-all group"
                >
                  <Phone className="text-cyan-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <p className="text-white font-medium">+91 98047 70368</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
                  <MapPin className="text-purple-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="text-white font-medium">Kolkata, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Social Links</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/nikhil-agarwal-2020/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-gray-900 rounded-lg border border-gray-800 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all group"
                >
                  <Linkedin className="text-gray-400 group-hover:text-teal-400 group-hover:scale-110 transition-all" size={24} />
                </a>
                <a
                  href="https://github.com/NikhilAg2021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-gray-900 rounded-lg border border-gray-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all group"
                >
                  <Github className="text-gray-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all" size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={5}
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 rounded-lg font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;