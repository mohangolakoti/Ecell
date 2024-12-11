import { GraduationCap, Mail, Phone, Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                E-Cell VITB
              </span>
            </Link>
            <p className="mt-4 text-gray-600">
              Empowering the next generation of entrepreneurs at Vishnu Institute of Technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-indigo-600">Home</Link>
              <Link to="/events" className="block text-gray-600 hover:text-indigo-600">Events</Link>
              <Link to="/case-studies" className="block text-gray-600 hover:text-indigo-600">Case Studies</Link>
              <Link to="/about" className="block text-gray-600 hover:text-indigo-600">About</Link>
              <Link to="/team" className="block text-gray-600 hover:text-indigo-600">Team</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-2">
              <a href="mailto:ecell@vishnu.edu.in" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                <Mail className="h-5 w-5" />
                <span>ecell@vishnu.edu.in</span>
              </a>
              <a href="tel:+919490538442" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                <Phone className="h-5 w-5" />
                <span>+91 9490 538 442</span>
              </a>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}