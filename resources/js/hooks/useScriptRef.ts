import { useEffect, useRef } from 'react';

// ==============================|| HOOK - SCRIPT REFERENCE ||============================== //

export default function useScriptRef() {
  const scripted = useRef(true);

  useEffect(() => {
    scripted.current = false;
  }, []);

  return scripted;
}
