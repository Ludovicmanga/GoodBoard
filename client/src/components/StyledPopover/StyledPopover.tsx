import { Popover } from "@mui/material";
import { ReactNode } from "react";
import styles from "./StyledPopover.module.scss";

export const StyledPopover = (props: {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  children: ReactNode;
}) => {
  return (
    <Popover
      open={!!props.anchorEl}
      anchorEl={props.anchorEl}
      onClose={() => props.setAnchorEl(null)}
      PaperProps={{
        style: { width: "20rem" },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div className={styles.container}>{props.children}</div>
    </Popover>
  );
};
