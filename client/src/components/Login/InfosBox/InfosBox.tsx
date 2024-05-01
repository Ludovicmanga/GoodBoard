import { GoodboardLogo } from "../../Logo/GoodboardLogo";
import styles from "./InfosBox.module.scss";

export const InfosBox = () => {
  return (
    <div className={styles.container}>
      <GoodboardLogo />
      <div className={styles.mainMessage}>
        Goodboard, ou comment comprendre ses clients
      </div>
      <div className={styles.secondaryMessage}>
        <div className={styles.secondaryMessageTitle}>
          Pourquoi nous rejoindre ?
        </div>
        <div>
          <div>Argument 1</div>
          <div>Argument 2</div>
        </div>
      </div>
    </div>
  );
};
