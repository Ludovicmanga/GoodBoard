import { Switch } from "antd";
import React from "react";
import styles from "./BoardIsPublicBtn.module.scss";
import { SlQuestion } from "react-icons/sl";
import { IconButton, Tooltip } from "@mui/material";
import { QuestionMarkWithTooltip } from "../QuestionMarkWithTooltip/QuestionMarkWithTooltip";

type Props = {
  handleChangeBoardStatus: (event: boolean) => Promise<void>;
  boardIsPublic: boolean;
  isLoading: boolean;
};

const BoardIsPublicBtn = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.infosContainer}>
        <div className={styles.textContainer}>
          {props.boardIsPublic ? "Le board est public" : "Le board est privé"}
        </div>
        <QuestionMarkWithTooltip
          message={
            <>
              <p>
                Si le board est public, tous ceux en possession du lien pourront
                y accéder (mais pas voter).
              </p>
              <br />
              <p>
                Si le board est privé, seuls les utilisateurs que vous aurez
                invités pourront y accéder, et voter.
              </p>
            </>
          }
        />
      </div>
      <div className={styles.switchContainer}>
        <Switch
          loading={props.isLoading}
          checked={props.boardIsPublic}
          onChange={props.handleChangeBoardStatus}
        />
      </div>
    </div>
  );
};

export default BoardIsPublicBtn;
