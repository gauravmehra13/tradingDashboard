import { useEffect, useState } from 'react';
import type { Theme } from '../types/theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  });

  useEffect(() => {
    function updateTheme() {
      const root = window.document.documentElement;
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const activeTheme = theme === 'system' ? systemTheme : theme;
      
      root.classList.remove('light', 'dark');
      root.classList.add(activeTheme);
    }

    localStorage.setItem('theme', theme);
    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => updateTheme();
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  return { theme, setTheme };
}