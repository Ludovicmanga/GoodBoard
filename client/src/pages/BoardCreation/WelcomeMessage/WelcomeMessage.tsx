import React from "react";
import styles from "./WelcomeMessage.module.scss";
import { Button } from "@mui/material";

type Props = {
    handleCreateBoard: () => void;
}

const WelcomeMessage = (props: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeTitle}>Welcome to Goodboard! 😄🎉</h1>
      <div className={styles.iframeContainer}>
        <iframe
          title="welcome-gif"
          className={styles.iframe}
          src="https://giphy.com/embed/FQyQEYd0KlYQ"
          style={{
            position: "absolute",
          }}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.message}>
        <p>
          We're excited to have you on board! Get ready to have fun and create
          amazing feature requests! Let's make your ideas come to life! 💡💡💡
        </p>
      </div>
      <Button
        className={styles.createBoardBtn}
        variant="contained"
        onClick={props.handleCreateBoard}
      >
        Create your First Board
      </Button>
    </div>
  );
};

export default WelcomeMessage;
