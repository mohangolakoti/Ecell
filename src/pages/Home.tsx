import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import MagicParticles from '../components/MagicParticles';
import { useFirestore } from '../hooks/useFirestore';
import CaseStudies from '../components/CaseStudies';
import About from '../components/About';
import Ecell from '../constants/ecell_logo.svg';
import alarm from '../constants/alarm_clock.png';
import { TypeAnimation } from 'react-type-animation';
import Events from '../components/Events';
import RegistrationForm from '../components/RegistrationForm';


export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
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
      <section className="h-screen relative overflow-hidden bg-black" >
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
      className="z-10 flex flex-col items-center gap-5"
    >
      {/* Animated Heading */}
      <motion.img
      src={Ecell}
      className="w-28">
      </motion.img>

      <motion.h1
        initial={{ scale: 0.5, rotate: -15 }} // Start scaled down and rotated
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text font-Montserrat"
      >
        E-Cell VITB
      </motion.h1>
      
      
      {/* Animated Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }} // Slide in from below
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="text-xl md:text-2xl font-bold font-mono text-transparent bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text"
      >
        <span className='text-white font-bold text-3xl'>&lt; </span>
        <TypeAnimation
          sequence={['Create.', 1100, 'Lead.', 1100, 'Innovate.', 1100]}
          repeat={Infinity}
          className=''
        />
        <span className='text-white font-bold text-3xl'>&gt;</span>
      </motion.p>

      {/* Button Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Start smaller and faded
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <button className="px-6 py-3 text-lg rounded-full font-semibold hover:border hover:text-white hover:border-white transition-all duration-300 bg-gray-300 hover:bg-transparent text-black font-OpenSans">
  Get Started
</button>

      </motion.div>
    </motion.div>
  </div>

</section>


      {/* Next Event Timer Section */}
      <section className="py-10 px-4 pt-1 mt-20" id='next_event'>
      <h1 className="text-white text-4xl ml-24 p-2 text-left font-bold mb-4 text-" >Innovit</h1>
  <div className="max-w-7xl mx-auto text-center flex items-start space-x-6">

    {/* Left Section */}
    <div className="flex-1 text-left">
    <p className="text-grey-500 font-Montserrat mt-4 text-[#acacac] font-bold">
    The Entrepreneurship Cell <span className='text-red-600 hover:text-xl hover:cursor-pointer'>(E-Cell)</span> is a student-driven initiative aimed at fostering entrepreneurial spirit and innovation among young minds. This year, E-Cell is proud to present its 
    flagship event, <span className='text-red-600 hover:text-xl hover:cursor-pointer'>Innovit</span>, a dynamic platform designed to spark creativity and bring groundbreaking ideas to life. **Innovit** invites participants to showcase their innovative solutions through exciting challenges, workshops, and competitions. Along with mentorship from industry experts, the event empowers students to transform their visions into impactful ventures. Join us to collaborate, innovate, and lead the way in shaping the future of entrepreneurship!

      </p>
      <div className='flex items-center mt-4'>
      <motion.img
      src={alarm}
      className="w-12 h-12 mr-5 mt-6">
      </motion.img>
      <div className="bg-white/10 backdrop-blur-md text-center p-4 rounded-lg mr-3 mt-5 w-30 hover:shadow-2xl hover:scale-110 hover:cursor-pointer">
  <span className="text-3xl font-bold text-white">{timeLeft.days}</span>
  <p className="text-white font-bold">days</p>
</div>  
<div className="bg-white/10 backdrop-blur-md text-center p-4 rounded-lg mr-3 mt-5 w-30 hover:shadow-2xl hover:scale-110 hover:cursor-pointer">
  <span className="text-3xl font-bold text-white">{timeLeft.hours}</span>
  <p className="text-white font-bold">hours</p>
</div>
<div
  className="bg-white/10 backdrop-blur-md text-center p-4 rounded-lg mr-3 mt-5 w-30 hover:shadow-2xl hover:scale-110 hover:cursor-pointer"
>
  <span className="text-3xl font-bold text-white">{timeLeft.minutes}</span>
  <p className="text-white font-bold">min</p>
</div>

<div className="bg-white/10 backdrop-blur-md text-center p-4 rounded-lg mr-3 mt-5 w-30 hover:shadow-2xl hover:scale-110 hover:cursor-pointer">
  <span className="text-3xl font-bold text-white">{timeLeft.seconds}</span>
  <p className="text-white font-bold">sec</p>
</div>

      </div>
    </div>

    {/* Vertical Line */}
    <div className="border-l-2 border-gray-300 h-auto"></div>
    {/* Right Section */}
    <div className="flex-1 text-center">
    <img
  src="https://www.ecellsgsits.com/_next/image?url=%2Fes1.jpg&w=3840&q=75"
  className="w-2/3 h-2/3 mx-auto mb-4 shadow-lg shadow-gray-600 rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-110 hover:cursor-pointer"
  alt="E-Cell"
/>

      <button onClick={() => setSelectedEvent(event)} className="mt-4 px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 font-bold hover:bg-indigo-700 transition-colors transition-transform duration-200 ease-in-out rounded-xl hover:scale-110">
        Register Now
      </button>
    </div>
  </div>
</section>
      <section>
        <Events />
      </section>
      <section>
        <CaseStudies/>
      </section>
      <section>
        <About/>
      </section>
      {selectedEvent && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <RegistrationForm
                  eventId={selectedEvent.id}
                  eventName={selectedEvent.name}
                  eventBanner={selectedEvent.eventBanner}
                  coordinator={selectedEvent.coordinator}
                  onClose={() => setSelectedEvent(null)}
                />
              </div>
            )}
    </div>
  );
}
