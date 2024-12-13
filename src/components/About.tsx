import { motion } from 'framer-motion';
import { GraduationCap, Target, Users, Lightbulb, Award, Rocket } from 'lucide-react';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

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
    <div className="py-20 pb-12 ">
    {/* Initiatives */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-12 pb-4 font-Montserrat "
          >
            Our <span className='text-indigo-500'>Initiatives</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-in">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-8 border cursor-pointer border-gray-400 shadow-md shadow-gray-300 hover:shadow-indigo-500 hover:border-indigo-400"
              >
                <initiative.icon className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 font-Roboto">
                  {initiative.title}
                </h3>
                <p className="text-gray-300 font-OpenSans">{initiative.description}</p>
            </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
