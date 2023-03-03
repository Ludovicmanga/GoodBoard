import { Card, Chip, Paper } from "@mui/material";
import styles from "./IntegrationBox.module.scss";
import React from "react";

type Props = {
  name: string;
  description: string;
  logo: JSX.Element;
  connected: boolean;
};

const IntegrationBox = (props: Props) => {
  return (
    <Card className={styles.container}>
      <div className={styles.connectedBadgeContainer}>
        {props.connected && <Chip label="Connected" variant="outlined" />}
      </div>
      <div className={styles.logoAndNameRowContainer}>
        <div className={styles.logoAndNameContainer}>
          <>
            <div className={styles.logoContainer}>{props.logo}</div>
            <div className={styles.nameContainer}>{props.name}</div>
          </>
        </div>
      </div>
      <div className={styles.descriptionContainer}>{props.description}</div>
    </Card>
  );
};

export default IntegrationBox;
