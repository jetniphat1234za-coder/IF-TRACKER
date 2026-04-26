import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Timer, Scale, Activity, Flame, Heart } from 'lucide-react';

const ICONS = [Dumbbell, Timer, Scale, Activity, Flame, Heart];

export function FloatingIcons() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only access window on the client side
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width === 0) return null; // Avoid rendering on server or before mount

  // Generate 12 random icons
  const floaters = Array.from({ length: 12 }).map((_, i) => {
    const Icon = ICONS[i % ICONS.length];
    const size = Math.random() * 40 + 20; // 20px to 60px
    const startX = Math.random() * windowSize.width;
    const startY = Math.random() * windowSize.height;
    
    // Animation parameters
    const duration = Math.random() * 20 + 20; // 20s to 40s
    const moveX = (Math.random() - 0.5) * 400; // -200px to +200px
    const moveY = (Math.random() - 0.5) * 400; // -200px to +200px
    const rotation = Math.random() * 360;

    return { id: i, Icon, size, startX, startY, duration, moveX, moveY, rotation };
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {floaters.map((floater) => (
        <motion.div
          key={floater.id}
          className="absolute text-orange-500/10 dark:text-orange-500/5 transition-colors duration-1000"
          initial={{ 
            x: floater.startX, 
            y: floater.startY,
            rotate: 0,
            opacity: 0
          }}
          animate={{
            x: floater.startX + floater.moveX,
            y: floater.startY + floater.moveY,
            rotate: floater.rotation,
            opacity: [0, 1, 1, 0], // Fade in and fade out
          }}
          transition={{
            duration: floater.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <floater.Icon size={floater.size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
