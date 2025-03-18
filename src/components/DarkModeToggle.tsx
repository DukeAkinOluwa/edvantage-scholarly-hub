
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

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
