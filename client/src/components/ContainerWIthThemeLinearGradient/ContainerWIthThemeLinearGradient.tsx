import { useTheme } from "@mui/material";
import { ReactNode } from "react";

export const ContainerWIthThemeLinearGradient = (props: {
  children: ReactNode;
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        background: `linear-gradient(to right bottom, ${theme.palette.primary.main}, #FFFFFF 55%)`,
      }}
    >
      {props.children}
    </div>
  );
};
