
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

interface DarkModeToggleProps {
  variant?: 'icon' | 'switch' | 'button';
  onToggle?: (isDark: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ 
  variant = 'icon',
  onToggle 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (shouldBeDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDarkMode(newMode);
    
    if (onToggle) {
      onToggle(newMode);
    }
  };

  if (variant === 'switch') {
    return (
      <div 
        className={`dark-mode-toggle ${isDarkMode ? 'dark' : ''}`}
        onClick={toggleDarkMode}
        role="switch"
        aria-checked={isDarkMode}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDarkMode();
          }
        }}
      >
        <div className="dark-mode-toggle-handle" />
      </div>
    );
  }
  
  if (variant === 'button') {
    return (
      <Button
        onClick={toggleDarkMode}
        className="flex items-center gap-2"
      >
        {isDarkMode ? (
          <>
            <Sun className="h-5 w-5" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-5 w-5" />
            <span>Dark Mode</span>
          </>
        )}
      </Button>
    );
  }

  // Default icon variant
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-300 transition-transform hover:rotate-45 duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500 transition-transform hover:rotate-12 duration-300" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
