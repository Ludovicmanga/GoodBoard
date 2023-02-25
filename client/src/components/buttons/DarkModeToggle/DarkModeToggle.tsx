import React, { useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'on');

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode ? 'on' : 'off');
  };

  return (
    <IconButton onClick={handleToggle}>
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default DarkModeToggle;