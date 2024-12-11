import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import MagicParticles from '../components/MagicParticles';
import { Sparkles } from 'lucide-react';
import { useFirestore } from './../hooks/useFirestore';
import Globe from '../components/Globe';
import { Menu, X, GraduationCap } from 'lucide-react';


export default function Home() {
  const [events, setEvents] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { getDocuments } = useFirestore('events');

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getDocuments([]);
      setEvents(
        data.map((event) => ({
          ...event,
          eventBanner: event.eventBanner || 'https://source.unsplash.com/random/800x400?tech,event',
          coordinator: event.coordinator || {
            name: 'Event Coordinator',
            email: 'coordinator@vishnu.edu.in',
            phone: '+91 9876543210',
          },
        }))
      );
    };
    fetchEvents();
  }, []);

  const upcomingEvents = events.filter((event) => new Date(event.eventDate) > new Date());

  useEffect(() => {
    if (upcomingEvents.length > 0) {
      const interval = setInterval(() => {
        const nextEventDate = new Date(upcomingEvents[0].eventDate).getTime();
        const now = new Date().getTime();
        const difference = nextEventDate - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [upcomingEvents]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden bg-black">
  {/* Magic Particles Canvas */}
  <div className="absolute inset-0 mt-20">
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 20, 0]} />
      <MagicParticles />
      <OrbitControls enableZoom={false} />
    </Canvas>
  </div>

  {/* Main Content Animation */}
  <div className="absolute inset-0 flex items-center justify-center text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Fade and slide up
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="space-y-6 z-10"
    >
      {/* Animated Heading */}
      <motion.h1
        initial={{ scale: 0.5, rotate: -15 }} // Start scaled down and rotated
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl md:text-  font-bold text-white  flex justify-center"
      >
        <GraduationCap className="h-20 w-20 text-red-600 " />
      </motion.h1>
      <motion.h1
        initial={{ scale: 0.5, rotate: -15 }} // Start scaled down and rotated
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-bold text-white"
      >
        E-Cell VITB
      </motion.h1>
      
      
      {/* Animated Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }} // Slide in from below
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="text-xl md:text-2xl font-bold text-yellow-600"
      >
        Create. Lead. Innovate.
      </motion.p>

      {/* Button Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Start smaller and faded
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <button className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600">
          Get Started
        </button>
      </motion.div>
    </motion.div>
  </div>

</section>


      {/* Next Event Timer Section */}
      <section className="py-10 px-4 pt-1 mt-20">
        <div className="max-w-7xl mx-auto text-cente">
          {upcomingEvents[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-black mb-4">Next Event</h2>
              <div className="bg-none backdrop-blur-md rounded-lg p-8 border border-none">
                <h3 className="text-2xl font-semibold text-white mb-4">{upcomingEvents[0].name}</h3>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-red-600 p-4 rounded-lg">
                    <span className="text-3xl font-bold text-white">{timeLeft.days}</span>
                    <p className="text-red-200">Days</p>
                  </div>
                  <div className="bg-red-600 p-4 rounded-lg">
                    <span className="text-3xl font-bold text-white">{timeLeft.hours}</span>
                    <p className="text-red-200">Hours</p>
                  </div>
                  <div className="bg-red-600 p-4 rounded-lg">
                    <span className="text-3xl font-bold text-white">{timeLeft.minutes}</span>
                    <p className="text-red-200">Minutes</p>
                  </div>
                  <div className="bg-blue-600/20 p-4 rounded-lg">
                    <span className="text-3xl font-bold text-white">{timeLeft.seconds}</span>
                    <p className="text-red-200">Seconds</p>
                  </div>
                </div>
                <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                  Register Now
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <h2 className="text-4xl font-bold text-black text-center">Event Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#D6BD98] backdrop-blur-md p-6 rounded-xl">
                  <img
                    src={`https://source.unsplash.com/random/800x600?startup,${i}`}
                    alt="Event"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Past Event {i}
                  </h3>
                  <p className="text-indigo-200">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
