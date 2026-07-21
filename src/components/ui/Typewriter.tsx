'use client';

import { useState, useEffect } from 'react';

export default function Typewriter({
  text,
  speed = 40,
  className,
  delay = 0,
}: {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const int = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(int);
        }
      }, speed);
      return () => clearInterval(int);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return <span className={className}>{displayed}</span>;
}
