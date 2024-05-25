import { Chip } from "@mui/material";
import { ChangeLog } from "../../helpers/types";
import styles from "./ChangelogBottom.module.scss";
import { EmojiVotesContainer } from "../EmojiVotesContainer/EmojiVotesContainer";

export const ChangelogBottom = (props: { changelogData: ChangeLog }) => {
  return (
    <div className={styles.container}>
      <div className={styles.chipsContainer}>
        {props.changelogData.topics.map((topic) => (
          <Chip
            className={styles.chip}
            label={topic.label}
            key={topic._id}
            sx={{
              background: "#fff4e6",
            }}
          />
        ))}
      </div>
      <div className={styles.emojiVotesContainer}>
        <EmojiVotesContainer changelogData={props.changelogData} />
      </div>
    </div>
  );
};
