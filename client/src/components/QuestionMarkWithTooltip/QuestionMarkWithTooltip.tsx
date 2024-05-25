import { IconButton, Tooltip } from "@mui/material";
import styles from "./QuestionMarkWithTooltip.module.scss";
import { SlQuestion } from "react-icons/sl";
import { ReactNode } from "react";

export const QuestionMarkWithTooltip = (props: { message: ReactNode }) => (
  <Tooltip
    title={<div className={styles.tooltipMessage}>{props.message}</div>}
    placement="top-end"
  >
    <IconButton className={styles.iconBtn}>
      <SlQuestion />
    </IconButton>
  </Tooltip>
);
