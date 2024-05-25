import { ReactNode } from "react";
import styles from "./EmojiVoteBtn.module.scss";
import { Avatar, IconButton } from "@mui/material";

export const EmojiVoteBtn = (props: {
  icon: ReactNode;
  votesCount: number;
  isVoted: boolean;
  onClick: (isVoted: boolean) => Promise<void>;
}) => {
  return (
    <IconButton onClick={() => props.onClick(props.isVoted)}>
      <Avatar
        sx={{
          padding: "1.7rem",
          background: props.isVoted ? "#dbe4ff" : "#f1f3f5",
          color: "black",
          fontSize: "1rem",
        }}
      >
        {props.icon}
        <div className={styles.votesCount}>{props.votesCount}</div>
      </Avatar>
    </IconButton>
  );
};
