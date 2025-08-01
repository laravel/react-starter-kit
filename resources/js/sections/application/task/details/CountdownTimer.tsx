import { useState, useEffect } from 'react';

// project-imports
import MainCard from '@/components/MainCard';

// ===========================|| DETAILS - COUNTDOWN TIMER ||=========================== //

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.getTime() - new Date().getTime();
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        return newTime > 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Time calculations
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <MainCard bodyClassName="bg-light-danger">
      <div className="counter text-center">
        <h4 id="timer" className="text-danger m-0">
          <b>{days}</b> days : <b>{hours}</b>h : <b>{minutes}</b>m : <b>{seconds}</b>s
        </h4>
      </div>
    </MainCard>
  );
}
