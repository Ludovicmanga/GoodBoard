import React from "react";
import styles from "./WelcomeMessage.module.scss";
import { Button } from "@mui/material";

type Props = {
  handleCreateBoard: () => void;
};

const WelcomeMessage = (props: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeTitle}>Bienvenue sur Goodboard! 😄🎉</h1>
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
        />
      </div>
      <div className={styles.message}>
        <p>
          Nous sommes ravis de vous compter parmi nous ! Préparez-vous à vous
          amuser et à créer des demandes de fonctionnalités incroyables !
          Donnons vie à vos idées ! 💡💡💡
        </p>
      </div>
      <Button
        className={styles.createBoardBtn}
        variant="contained"
        onClick={props.handleCreateBoard}
      >
        Créez votre premier board
      </Button>
    </div>
  );
};

export default WelcomeMessage;
