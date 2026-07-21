'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SLIDER_PROJECT } from '@/constants';

/* ponytail: card-stack slider — pure CSS nth-child positioning, JS just moves DOM nodes */
export default function ProjectSlider() {
  const sliderRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const { images, slides } = SLIDER_PROJECT;

  const go = (dir: 'next' | 'prev') => {
    const ul = sliderRef.current;
    if (!ul) return;
    clearInterval(timerRef.current);
    const items = ul.children;
    if (!items.length) return;
    if (dir === 'next') ul.appendChild(items[0]);
    else ul.prepend(items[items.length - 1]);
    timerRef.current = setInterval(() => go('next'), 4000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go('next'), 4000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return; // let buttons work
    go(target.closest('.prev') ? 'prev' : 'next');
  };

  /* Slider data — first slide is the "hero" bg */
  const firstSlides = slides.slice(0, 4);
  while (firstSlides.length < 6) firstSlides.push(slides[firstSlides.length % slides.length]);
  const displaySlides = firstSlides.slice(0, 6);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black select-none">
      {/* CSS entry animation */}
      <style>{`
        @keyframes showSlideContent {
          0% { filter: blur(5px); transform: translateY(calc(-50% + 75px)); }
          100% { opacity: 1; filter: blur(0); transform: translateY(-50%); }
        }
      `}</style>

      <ul
        ref={sliderRef}
        onClick={handleClick}
        className="slider relative w-full h-full min-h-screen"
      >
        {displaySlides.map((slide, i) => (
          <li
            key={i}
            className="item"
            style={{ backgroundImage: `url(${images[i % images.length]})` }}
          >
            <div className="content">
              <h2 className="title">{slide.title}</h2>
              <p className="description">{slide.description}</p>
              <Link href="/work">
                <button>View Project</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <nav className="nav">
        <button className="btn prev" onClick={() => go('prev')} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="btn next" onClick={() => go('next')} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </nav>

      {/* Slider CSS */}
      <style jsx>{`
        .slider {
          position: relative;
          width: 100%;
          height: 100vh;
        }
        .item {
          width: 200px;
          height: 300px;
          list-style: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          background-position: center;
          background-size: cover;
          border-radius: 20px;
          box-shadow: 0 20px 30px rgba(255,255,255,0.15) inset;
          transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
        }
        .item:nth-child(1),
        .item:nth-child(2) {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: none;
          border-radius: 0;
          box-shadow: none;
          opacity: 1;
        }
        .item:nth-child(3) { left: 50%; }
        .item:nth-child(4) { left: calc(50% + 220px); }
        .item:nth-child(5) { left: calc(50% + 440px); }
        .item:nth-child(6) { left: calc(50% + 660px); opacity: 0; }
        .content {
          width: min(30vw, 400px);
          position: absolute;
          top: 50%;
          left: 3rem;
          transform: translateY(-50%);
          color: white;
          text-shadow: 0 3px 8px rgba(0,0,0,0.5);
          opacity: 0;
          display: none;
          pointer-events: none;
        }
        .content .title {
          font-family: 'Habitus', Arial, Helvetica, sans-serif;
          text-transform: uppercase;
          font-size: 1.8rem;
          font-weight: 500;
          letter-spacing: -0.03em;
        }
        .content .description {
          line-height: 1.7;
          margin: 1rem 0 1.5rem;
          font-size: 0.8rem;
          opacity: 0.9;
        }
        .content button {
          pointer-events: auto;
          width: fit-content;
          background: rgba(0,0,0,0.2);
          color: white;
          border: 2px solid white;
          border-radius: 0.25rem;
          padding: 0.75rem 1.25rem;
          cursor: pointer;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: background 0.3s;
        }
        .content button:hover {
          background: rgba(255,255,255,0.2);
        }
        .item:nth-of-type(2) .content {
          display: block;
          animation: showSlideContent 0.75s ease-in-out 0.3s forwards;
        }
        .nav {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          gap: 0.5rem;
        }
        .btn {
          background: rgba(255,255,255,0.5);
          color: rgba(0,0,0,0.7);
          border: 2px solid rgba(0,0,0,0.6);
          padding: 0.75rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }
        .btn:hover {
          background: rgba(255,255,255,0.3);
        }
        @media (max-width: 900px) {
          .content .title { font-size: 1rem; }
          .content .description { font-size: 0.7rem; }
          .content button { font-size: 0.7rem; }
          .item { width: 160px; height: 270px; }
          .item:nth-child(4) { left: calc(50% + 170px); }
          .item:nth-child(5) { left: calc(50% + 340px); }
          .item:nth-child(6) { left: calc(50% + 510px); opacity: 0; }
        }
        @media (max-width: 650px) {
          .content { left: 1.5rem; }
          .content .title { font-size: 0.9rem; }
          .content .description { font-size: 0.65rem; }
          .content button { font-size: 0.7rem; }
          .item { width: 130px; height: 220px; }
          .item:nth-child(4) { left: calc(50% + 140px); }
          .item:nth-child(5) { left: calc(50% + 280px); }
          .item:nth-child(6) { left: calc(50% + 420px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
