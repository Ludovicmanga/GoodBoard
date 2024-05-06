import React, { useEffect, useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "on"
  );
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(
      setGeneralProperties({
        darkMode: Boolean(isDarkMode),
      })
    );
    localStorage.setItem("darkMode", isDarkMode ? "on" : "off");
  };

  useEffect(() => {
    handleToggle();
  }, [isDarkMode]);

  return (
    <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
}

export default DarkModeToggle;
