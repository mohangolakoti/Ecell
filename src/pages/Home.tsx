import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import MagicParticles from '../components/MagicParticles';
import { Sparkles } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import Globe from '../components/Globe';
import { Menu, X, GraduationCap } from 'lucide-react';
import CaseStudies from '../components/CaseStudies';
import About from '../components/About';
import Ecell from '../constants/ecell_logo.svg';
import { TypeAnimation } from 'react-type-animation';
import Events1 from '../components/Events1';
import banner from '../constants/b2.jpg';
import Aos from "aos";
import "aos/dist/aos.css";

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
    Aos.init({
      duration: 2000,
    });
  }, []);

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
  <div className="absolute inset-0 flex items-center justify-center text-center flex-col">
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Fade and slide up
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="z-10 flex flex-col items-center gap-5"
    >
      {/* Animated Heading */}
      <motion.img
      src={Ecell}
      className="w-28"
      data-aos="fade-up">
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
  style={{ textShadow: "2px 2px 5px rgba(255, 0, 0, 0.8)" }} // Red shadow for the text
>
  <TypeAnimation
    sequence={["Create.", 1100, "Lead.", 1100, "Innovate.", 1100]}
    repeat={Infinity}
    className=""
    style={{ textShadow: "4px 3px 5px rgba(255, 0, 0, 0.8)" }} // Red shadow for animated text
  />
  
</motion.p>


      {/* Button Animation */}
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Start smaller and faded
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <button className="px-6 py-3 text-lg rounded-full font-semibold border text-white border-white transition-all duration-300 bg-transparent font-OpenSans">
  Get Started
</button>

      </motion.div>*/}
    </motion.div> 
    <div className="flex items-center justify-center mt-5">
  <div className="relative group">
    <button
      className="relative inline-block p-px font-semibold leading-6 text-white bg-transparent shadow-2xl cursor-pointer rounded-full shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
    >
      <span
        className="absolute inset-0 rounded-full bg-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>

      <span
        className="relative z-10 block px-6 py-3 rounded-full border hover:border-none bg-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:via-blue-500 group-hover:to-purple-500"
      >
        <div className="relative z-10 flex items-center space-x-2">
          <span
            className="transition-all duration-500 group-hover:translate-x-1"
          >
            Get started
          </span>
          <svg
            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
            data-slot="icon"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </span>
    </button>
  </div>
</div>

  </div>

</section>


      {/* Next Event Timer Section */}
      <section className="py-10 px-4 pt-1 mt-20">
  <div className="max-w-7xl mx-auto text-center flex items-start space-x-6">
    {/* Left Section */}
    <div className="flex-1 text-left">
    <h1 className="text-white text-4xl font-bold mb-4" style={{ color: '#4B0082' }}>Innovit</h1>
    <p className="text-white font-roboto mt-4">
        The Entrepreneurship Cell (E-Cell) is a student-driven initiative aimed at fostering
        entrepreneurial spirit and innovation among young minds. We provide a platform for aspiring
        entrepreneurs to nurture their ideas, collaborate, and transform them into impactful
        ventures. With workshops, competitions, and mentorship programs, E-Cell serves as a
        catalyst for startup culture, empowering students to become leaders, creators, and
        change-makers in today's competitive world.
      </p>
      <div className='flex mt-4'>
      <div className="bg-[#555555] text-center p-4 rounded-lg mr-3 mt-5 w-25">
                    <span className="text-3xl font-bold text-white">{timeLeft.days}</span>
                    <p className="text-white font-bold">days</p>
                  </div>  
                  <div className="bg-[#555555] text-center p-4 rounded-lg mr-3 mt-5 w-25">
                    <span className="text-3xl font-bold text-white">{timeLeft.hours}</span>
                    <p className="text-white font-bold">hours</p>
                  </div>
                  <div className="bg-[#555555] text-center p-4 rounded-lg mr-3 mt-5 w-25">
                    <span className="text-3xl font-bold text-white">{timeLeft.minutes}</span>
                    <p className="text-white font-bold" >min</p>
                  </div>
                  <div className="bg-[#555555] text-center p-4 rounded-lg mr-3 mt-5 w-25">
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
  className="w-64 h-full w-2/3 mx-auto mb-4 shadow-lg shadow-gray-500 rounded-"
  alt="E-Cell"
/>


      <button className="mt-4 px-8 py-3 bg-[#4B0082] text-white rounded-full hover:bg-indigo-700 transition-colors">
        Register Now
      </button>
    </div>
  </div>
</section>
      <section>
        <Events1 />
      </section>
      <section>
        <CaseStudies/>
      </section>
      <section className='mt-16'>
        {/* <img src={banner} alt="banner" className='h-72 w-full mt-16' /> */}
        <hr />
      </section>
      <section>
        <About/>
      </section>
    </div>
  );
}
