'use client';

import { useUIStore } from '@/store/useUIStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <label
      className="dayNight cursor-pointer flex items-center justify-center"
      style={{ cursor: 'pointer' }}
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        style={{ display: 'none' }}
      />
      <div
        style={{
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          position: 'relative',
          boxShadow: isDark
            ? 'inset 14px -14px 0 0 #fff'
            : 'inset 16px -16px 0 0 #fff',
          transform: isDark ? 'scale(.5) rotate(0deg)' : 'scale(1) rotate(-2deg)',
          transition: 'box-shadow .5s ease, transform .4s ease .1s',
        }}
      >
        {/* sun rays — visible in day mode only */}
        <div
          style={{
            content: '',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            margin: '-4px 0 0 -4px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            boxShadow: !isDark
              ? '0 -18px 0 #5628EE, 0 18px 0 #5628EE, 18px 0 0 #5628EE, -18px 0 0 #5628EE, 13px 13px 0 #5628EE, -13px 13px 0 #5628EE, 13px -13px 0 #5628EE, -13px -13px 0 #5628EE'
              : 'none',
            transform: !isDark ? 'scale(1.5)' : 'scale(0)',
            transition: 'all .3s ease',
          }}
        />
      </div>
    </label>
  );
}
