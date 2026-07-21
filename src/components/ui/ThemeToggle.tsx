'use client';

import { useUIStore } from '@/store/useUIStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  const dark = theme === 'dark';

  return (
    <label className="flex items-center justify-center" style={{ cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={dark}
        onChange={toggleTheme}
        style={{ display: 'none' }}
      />
      <div
        style={{
          borderRadius: '50%',
          width: 22,
          height: 22,
          position: 'relative',
          background: dark ? 'transparent' : '#FFD93D',
          boxShadow: dark
            ? 'inset 7px -7px 0 0 #F5F5F5'
            : '0 0 0 0 transparent',
          transform: dark ? 'scale(1) rotate(0deg)' : 'scale(1) rotate(0deg)',
          transition: 'all .4s ease',
        }}
      >
        {/* Moon crescent highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: dark ? '#1a1a2e' : 'transparent',
            clipPath: dark ? 'circle(70% at 65% 35%)' : 'none',
            transition: 'all .4s ease',
          }}
        />
        {/* Sun rays */}
        <div
          style={{
            position: 'absolute',
            inset: -5,
            borderRadius: '50%',
            border: dark ? '0' : '2px solid #FFD93D',
            opacity: dark ? 0 : 0.3,
            transition: 'all .4s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: -9,
            borderRadius: '50%',
            border: dark ? '0' : '2px solid #FFD93D',
            opacity: dark ? 0 : 0.15,
            transition: 'all .4s ease',
          }}
        />
      </div>
    </label>
  );
}
