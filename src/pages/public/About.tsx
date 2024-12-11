import { motion } from 'framer-motion';
import { GraduationCap, Target, Users, Lightbulb, Award, Rocket } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Users, label: 'Active Members', value: '500+' },
    { icon: Award, label: 'Events Organized', value: '50+' },
    { icon: Rocket, label: 'Startups Launched', value: '20+' },
  ];

  const initiatives = [
    {
      title: 'Startup Mentorship',
      description: 'Connect with industry experts and get guidance for your startup journey.',
      icon: Lightbulb,
    },
    {
      title: 'Innovation Hub',
      description: 'Access resources and workspace to develop your ideas.',
      icon: Target,
    },
    {
      title: 'Skill Development',
      description: 'Regular workshops and training sessions to enhance entrepreneurial skills.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About E-Cell VITB
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering the next generation of entrepreneurs at Vishnu Institute of Technology.
              We foster innovation, creativity, and entrepreneurial spirit among students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center"
              >
                <stat.icon className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300">
                To create a vibrant ecosystem that nurtures entrepreneurial mindset and
                provides platforms for students to transform their innovative ideas into
                successful ventures.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300">
                To be the leading entrepreneurship cell that shapes future leaders and
                innovators who contribute significantly to the startup ecosystem and
                economic growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Our Initiatives
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-8"
              >
                <initiative.icon className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {initiative.title}
                </h3>
                <p className="text-gray-300">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}