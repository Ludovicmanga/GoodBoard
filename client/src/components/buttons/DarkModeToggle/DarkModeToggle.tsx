import React, { useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '../../../redux/hooks';
import { setGeneralProperties } from '../../../redux/features/generalPropertiesSlice';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'on');
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setGeneralProperties({
      colorMode: isDarkMode ? 'dark' : 'light'
    }))
    localStorage.setItem('darkMode', !isDarkMode ? 'on' : 'off');
  };

  return (
    <IconButton onClick={handleToggle}>
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default DarkModeToggle;