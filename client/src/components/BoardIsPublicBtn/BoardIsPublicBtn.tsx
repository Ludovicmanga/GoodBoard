import { Switch } from "antd";
import React from "react";
import styles from "./BoardIsPublicBtn.module.scss";

type Props = {
  handleChangeBoardStatus: (event: boolean) => Promise<void>;
  boardIsPublic: boolean;
  isLoading: boolean;
};

const BoardIsPublicBtn = (props: Props) => {
  return (
    <div className={styles.container}>
      <div>{props.boardIsPublic ? "Board is public" : "Board is private"}</div>
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
