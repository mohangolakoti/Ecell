import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import MagicParticles from "../components/MagicParticles";
import { Sparkles } from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";
import Globe from "../components/Globe";
import { Menu, X, GraduationCap } from "lucide-react";
import CaseStudies from "../components/CaseStudies";
import About from "../components/About";
import Ecell from "../constants/ecell_logo.svg";
import Mallika from "../constants/Mallika.jpg";
import Raghuram from "../constants/Raghuram.jpg";
import Druthi from "../constants/Druthi.jpg";
import Phani from "../constants/Phani.jpg";
import Deekshitha from "../constants/Deekshitha.jpg";
import Surya from "../constants/Surya.jpg";
import Narasimharao from "../constants/Narasimharao.jpg";
import Preethi from "../constants/Preethi.jpg";
import { TypeAnimation } from "react-type-animation";
import Events from "../components/Events";
import Team from "../components/Team";
import Card from "../components/Card";
import Vishnu from "../constants/Vishnu.jpg";
import Nikhil from "../constants/Nikhil.jpg";
import Prasanth from "../constants/Prasanth.jpg";
import Faiza from "../constants/Faiza.jpg";
import Rajkumar from "../constants/Rajkumar.jpg";
import Yagna from "../constants/Yagna.jpg";
import Sohan from "../constants/Sohan.jpg";
import Laikha from "../constants/Laikha.jpg";

export default function Home() {
  const [events, setEvents] = useState([]);
  const nextEventSectionRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { getDocuments } = useFirestore("events");

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getDocuments([]);
      setEvents(
        data.map((event) => ({
          ...event,
          eventBanner:
            event.eventBanner ||
            "https://source.unsplash.com/random/800x400?tech,event",
          coordinator: event.coordinator || {
            name: "Event Coordinator",
            email: "coordinator@vishnu.edu.in",
            phone: "+91 9876543210",
          },
        }))
      );
    };
    fetchEvents();
  }, []);

  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDate) > new Date()
  );

  useEffect(() => {
    if (upcomingEvents.length > 0) {
      const interval = setInterval(() => {
        const nextEventDate = new Date(upcomingEvents[0].eventDate).getTime();
        const now = new Date().getTime();
        const difference = nextEventDate - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
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
            className="z-10 flex flex-col items-center gap-5"
          >
            {/* Animated Heading */}
            <motion.img src={Ecell} className="w-28"></motion.img>

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
              <span className="text-white font-bold text-3xl">&lt; </span>
              <TypeAnimation
                sequence={["Create.", 1100, "Lead.", 1100, "Innovate.", 1100]}
                repeat={Infinity}
                className=""
              />
              <span className="text-white font-bold text-3xl">&gt;</span>
            </motion.p>

            {/* Button Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} // Start smaller and faded
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            >
              <button
                onClick={() =>
                  nextEventSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="px-6 py-3 text-lg rounded-full font-semibold hover:border hover:text-white hover:border-white transition-all duration-300 bg-gray-300 hover:bg-transparent text-black font-OpenSans"
              >
                Get Started
              </button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} // Fade in and slide up
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed font-light 
             font-Montserrat text-center bg-gradient-to-r 
             from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent 
             animate-gradient text-shadow-glow"
              style={{
                textTransform: "none",
                animation: "blink-shadow 2s infinite",
              }}
            >
              Welcome to E-Cell VITB, where innovation meets collaboration. We
              empower students to bring their entrepreneurial ideas to life
              through resources, mentorship, and an inspiring community. Let’s
              create, lead, and innovate together for a brighter future!
            </motion.p>

            <style>{`
              @keyframes blink-shadow {
                0%,
                100% {
                  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9);
                }
                50% {
                  text-shadow: none;
                }
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* Next Event Timer Section */}
      <section ref={nextEventSectionRef} className="py-10 px-4 pt-1 mt-40">
        <div className="max-w-7xl mx-auto text-center flex items-start space-x-6">
          {/* Left Section */}
          <div className="flex-1 text-left">
            <h1
              className="text-white text-4xl font-bold mb-4"
              style={{ color: "#4B0082" }}
            >
              Innovit
            </h1>
            <p className="text-white font-roboto mt-4">
              The Entrepreneurship Cell (E-Cell) is a student-driven initiative
              aimed at fostering entrepreneurial spirit and innovation among
              young minds. We provide a platform for aspiring entrepreneurs to
              nurture their ideas, collaborate, and transform them into
              impactful ventures. With workshops, competitions, and mentorship
              programs, E-Cell serves as a catalyst for startup culture,
              empowering students to become leaders, creators, and change-makers
              in today's competitive world.
            </p>
            <div className="flex mt-4">
              <div className="bg-[#555555] text-center p-4 rounded-lg mr-3 mt-5 w-25">
                <span className="text-3xl font-bold text-white">
                  {timeLeft.days}
                </span>
                <p className="text-white font-bold">days</p>
              </div>
              <div className="bg-[#555555] text-center p-4 rounded-lg mr-3 mt-5 w-25">
                <span className="text-3xl font-bold text-white">
                  {timeLeft.hours}
                </span>
                <p className="text-white font-bold">hours</p>
              </div>
              <div className="bg-[#555555] text-center p-4 rounded-lg mr-3 mt-5 w-25">
                <span className="text-3xl font-bold text-white">
                  {timeLeft.minutes}
                </span>
                <p className="text-white font-bold">min</p>
              </div>
              <div className="bg-[#555555] text-center p-4 rounded-lg mr-3 mt-5 w-25">
                <span className="text-3xl font-bold text-white">
                  {timeLeft.seconds}
                </span>
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
        <Events />
      </section>
      <section>
        <CaseStudies />
      </section>
      <section>
        <About />
      </section>
      <section>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-white text-center mt-12"
        >
          Our Team
        </motion.h1>
        <div className="flex flex-col items-center gap-y-0 bg-black-400 p-4">
          {/* Row 1 */}
          <div className="flex gap-0">
            <Card
              imageSrc={Preethi}
              name="Mrs.B.Preethi"
              role="Faculty Coordinator"
              linkedin="https://linkedin.com/in/johndoe"
            />
            <Card
              imageSrc={Narasimharao}
              name="Mr.V.S.N.Narasimha Raju"
              role="Faculty Coordinator"
              linkedin="https://linkedin.com/in/janesmith"
            />
          </div>
          {/* Row 2 */}
          <div className="flex gap-0">
            <Card
              imageSrc={Surya}
              name="Surya"
              role="President"
              linkedin="https://www.linkedin.com/in/surya-teja-191a81294/"
            />
            <Card
              imageSrc={Mallika}
              name="Malika"
              role="Secretarory"
              linkedin="https://www.linkedin.com/in/naga-mallika-balla-13003b27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            />
          </div>
          {/* Row 3 */}
          <div className="flex gap-0">
            <Card
              imageSrc={Phani}
              name="Phanindra"
              role="Technical Lead"
              linkedin="https://www.linkedin.com/in/nelavalli-phanindra-b074a8255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            />
            <Card
              imageSrc={Druthi}
              name="Druthi"
              role="PR/Marketing Lead"
              linkedin="https://www.linkedin.com/in/sri-dhruthi-mallela-9455ab2a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
            />
            <Card
              imageSrc={Raghuram}
              name="Raghuram"
              role="R&D Lead"
              linkedin="https://www.linkedin.com/in/raghuram-manikanta-ba0518280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            />
            <Card
              imageSrc={Deekshitha}
              name="Deekshitha"
              role="Event Managing Lead"
              linkedin="https://www.linkedin.com/in/deexitha-medisetty?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
            />
          </div>
          {/* Row 4 */}
          <div className="flex gap-0">
            <Card
              imageSrc={Vishnu}
              name="Vishnu"
              role="Startup Liason lead"
              linkedin="https://www.linkedin.com/in/aganti-vishnu-vardhan-297369246?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app "
            />
            <Card
              imageSrc={Nikhil}
              name="Nikhil"
              role="Logistics & Operations Lead "
              linkedin="https://www.linkedin.com/in/sainikhil-edupuganti-61281b2a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            />
            <Card
              imageSrc={Prasanth}
              name="Prasanth"
              role="Technical Co-Lead"
              linkedin="https://www.linkedin.com/in/prasanth-pulidhindi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
            />
            <Card
              imageSrc={Yagna}
              name="Yagna"
              role="PR/Marketing Co-Lead"
              linkedin="https://linkedin.com/in/michaeldavis"
            />
          </div>
          {/* Row 5 */}
          <div className="flex gap-0">
            <Card
              imageSrc={Faiza}
              name="Faiza"
              role="R&D Co-Lead"
              linkedin="https://www.linkedin.com/in/faiza-mohammed-72697b2b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            />
            <Card
              imageSrc={Rajkumar}
              name="Rajkumar"
              role="Content Co-Lead"
              linkedin="https://www.linkedin.com/in/rajkumar-sirra-941585320"
            />
            <Card
              imageSrc={Laikha}
              name="Laikha"
              role=" Techincal Associate"
              linkedin="https://linkedin.com/in/michaeldavis"
            />
            <Card
              imageSrc={Sohan}
              name="Sohan"
              role="VidepGraphy Co-Lead"
              linkedin="https://linkedin.com/in/michaeldavis"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
