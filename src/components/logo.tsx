import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Golden Health Logo"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        d="M85.7,26.2c-8.1-8.1-21.2-8.1-29.3,0L50,32.6L43.6,26.2c-8.1-8.1-21.2-8.1-29.3,0c-8.1,8.1-8.1,21.2,0,29.3l29.3,29.3l29.3-29.3C93.8,47.4,93.8,34.3,85.7,26.2z M53,50h12v6H53v12h-6V56H35v-6h12V38h6V50z"
      />
    </svg>
  );
}
