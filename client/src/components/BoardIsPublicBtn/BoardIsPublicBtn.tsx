import { Switch } from "antd";
import React from "react";
import styles from "./BoardIsPublicBtn.module.scss";

type Props = {
  handleChangeBoardStatus: (event: boolean) => Promise<void>;
  boardIsPublic: boolean;
};

const BoardIsPublicBtn = (props: Props) => {
  return (
    <div className={styles.container}>
      <div>{props.boardIsPublic ? "Board is public" : "Board is private"}</div>
      <Switch
        loading={false}
        checked={props.boardIsPublic}
        onChange={props.handleChangeBoardStatus}
      />
    </div>
  );
};

export default BoardIsPublicBtn;
