import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

interface TimerProps {
  targetDate: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventTimer({ targetDate, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const daysSpring = useSpring({ number: timeLeft.days, from: { number: 0 } });
  const hoursSpring = useSpring({ number: timeLeft.hours, from: { number: 0 } });
  const minutesSpring = useSpring({ number: timeLeft.minutes, from: { number: 0 } });
  const secondsSpring = useSpring({ number: timeLeft.seconds, from: { number: 0 } });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const timeUnits = [
    { label: 'Days', value: daysSpring, actual: timeLeft.days },
    { label: 'Hours', value: hoursSpring, actual: timeLeft.hours },
    { label: 'Minutes', value: minutesSpring, actual: timeLeft.minutes },
    { label: 'Seconds', value: secondsSpring, actual: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-indigo-600/20 p-4 rounded-lg backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            <animated.span
              className="text-3xl font-bold text-white block"
            >
              {unit.value.number.to(n => String(Math.floor(n)).padStart(2, '0'))}
            </animated.span>
          </AnimatePresence>
          <p className="text-indigo-200">{unit.label}</p>
        </motion.div>
      ))}
    </div>
  );
}