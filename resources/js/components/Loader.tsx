import { useEffect, useState } from 'react';

// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// ==============================|| LOADER ||============================== //

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-100 t-0 l-0 position-fixed">
      <ProgressBar animated now={progress} />
    </div>
  );
}
