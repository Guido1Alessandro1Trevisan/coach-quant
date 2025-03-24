"use client";
import React, { useRef } from 'react';

const AudioWaveform = () => {
  const waveSectionRef = useRef<any>(null);

  const resetAnimation = () => {
    if (waveSectionRef.current) {
      const waves = waveSectionRef.current.querySelectorAll('.wave');
      waves.forEach((wave: any) => {
        wave.style.animation = 'none';
        void wave.offsetHeight; // Trigger reflow to restart the animation
        wave.style.animation = '';
      });
    }
  };

  return (
    <section
      className="waveformSection"
      onMouseEnter={resetAnimation}
      ref={waveSectionRef}
    >
      <div className="wave wave0"></div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <style jsx>{`
        .waveformSection {
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
          gap: 15px;
          margin-top: 40px;
        }

        .wave {
          width: 20px;
          background-color: black;
          border-radius: 15px;
          transform: scaleY(1); /* Initial scale */
          animation: waveform 1s ease forwards;
          animation-delay: var(--wave-delay);
        }

        @keyframes waveform {
          0% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.2); /* Subtle increase */
          }
          100% {
            transform: scaleY(1);
          }
        }

        .wave0 {
          height: 40px;
          --wave-delay: 0s;
        }
        .wave1 {
          height: 70px;
          --wave-delay: 0.2s;
        }
        .wave2 {
          height: 50px;
          --wave-delay: 0.4s;
        }
        .wave3 {
          height: 40px;
          --wave-delay: 0.6s;
        }
      `}</style>
    </section>
  );
};

export default AudioWaveform;