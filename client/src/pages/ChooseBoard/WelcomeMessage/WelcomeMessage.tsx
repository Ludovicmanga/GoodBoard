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
          Toute l'équipe vous souhaite la bienvenue sur GoodBoard ! <br />
          <br /> Il est temps d'enfin savoir ce que vos clients attendent de
          vous! Grâce aux données factuelles recueillies, vous pourrez créer le
          produit que vos clients souhaitent, tout en leur montrant que vous les
          incluez dans vos processus décisionnels.
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
