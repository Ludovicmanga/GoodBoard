import React, { ReactNode, useEffect, useState } from "react";
import styles from "./ChangeLogBox.module.scss";
import { Avatar, Card, Chip, IconButton, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { ChangeLog } from "../../helpers/types";
import { updateChangelogVoteApiCall } from "../../helpers/changelog";
import { updateVoteOneChangeLogItem } from "../../redux/features/changeLogSlice";
import { getMonthForYear } from "../../helpers/utils";
import { EmojiVoteBtn } from "../EmojiVoteBtn/EmojiVoteBtn";
import { EmojiVotesContainer } from "../EmojiVotesContainer/EmojiVotesContainer";
import { ChangelogBottom } from "../ChangelogBottom/ChangelogBottom";

type Props = {
  changelogData: ChangeLog;
};

const ChangeLogBox = (props: Props) => {
  const dispatch = useAppDispatch();

  const [creationDate, setCreationDate] = useState("");

  useEffect(() => {
    const date = new Date(props.changelogData.createdAt);
    setCreationDate(
      `${getMonthForYear(date.getMonth())} ${date.getFullYear()}`
    );
  }, []);

  return (
    <Card className={styles.container}>
      <div
        className={styles.mainContentContainer}
        onClick={() =>
          dispatch(
            setGeneralProperties({
              changeLogDetailsModalOpen: {
                isOpen: true,
                changeLogId: props.changelogData._id,
              },
            })
          )
        }
      >
        <div className={styles.top}>
          <Chip
            label={creationDate}
            sx={{
              background: "#e6fcf5",
              padding: "1rem",
            }}
          />
        </div>
        <div className={styles.titleAndDescriptionContainer}>
          <div className={styles.title}>
            {props.changelogData.title.slice(0, 30)}
            {props.changelogData.title.length > 30 && "..."}
          </div>
          <p className={styles.description}>
            {props.changelogData.details.slice(0, 80)}
            {props.changelogData.details.length > 80 && "..."}
          </p>
        </div>
      </div>
      <ChangelogBottom changelogData={props.changelogData} />
    </Card>
  );
};

export default ChangeLogBox;
