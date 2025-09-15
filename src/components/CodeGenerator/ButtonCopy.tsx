'use client';

import { FC, useEffect, useState } from 'react';

export const ButtonCopy: FC<{ action: () => void }> = ({ action }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    action();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      data-testid="button-copy"
      onClick={handleClick}
      className={`border-1 rounded-sm w-12 px-1.5 py-0.5
      hover:scale-105 cursor-pointer transition:all duration-300 
      ${copied ? 'bg-green-100 border-green-700' : 'bg-transparent border-violet-700 '}`}
    >
      {copied ? '✔' : 'copy'}
    </button>
  );
};
