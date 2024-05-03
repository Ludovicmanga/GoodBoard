import { GoodboardLogo } from "../../Logo/GoodboardLogo";
import styles from "./InfosBox.module.scss";

export const InfosBox = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <GoodboardLogo />
      </div>
      <div className={styles.mainMessage}>
        Pour les entreprises qui créent ce que leurs clients veulent.
      </div>
      <div className={styles.secondaryMessage}>
        <div className={styles.secondaryMessageTitle}>
          Pourquoi utiliser Goodboard ?
        </div>
        <div>
          <div>Argument 1</div>
          <div>Argument 2</div>
        </div>
      </div>
    </div>
  );
};
