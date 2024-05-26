import { Card, Chip, Paper } from "@mui/material";
import styles from "./IntegrationBox.module.scss";
import React from "react";

type Props = {
  name: string;
  description: string;
  logo: string;
  connected: boolean;
  developed: boolean;
  onClick?: () => Promise<void>;
};

const IntegrationBox = (props: Props) => {
  return (
    <Card
      onClick={props.onClick}
      className={
        props.developed
          ? `${styles.container} ${styles.developed}`
          : `${styles.container}`
      }
      sx={{
        background: props.developed ? "" : "#f1f3f5",
      }}
    >
      <div className={styles.connectedBadgeContainer}>
        {props.connected && <Chip label="Connected" variant="outlined" />}
        {!props.developed && (
          <Chip
            label="Bientôt sur goodboard"
            variant="outlined"
            sx={{
              background: "#868e96",
              color: "white",
            }}
          />
        )}
      </div>
      <div className={styles.logoAndNameRowContainer}>
        <div className={styles.logoAndNameContainer}>
          <>
            <div className={styles.logoContainer}>
              <img src={props.logo} alt={props.name} height={50} />
            </div>
            <div className={styles.nameContainer}>{props.name}</div>
          </>
        </div>
      </div>
      <div className={styles.descriptionContainer}>{props.description}</div>
    </Card>
  );
};

export default IntegrationBox;
