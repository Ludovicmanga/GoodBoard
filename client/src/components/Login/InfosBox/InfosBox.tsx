import { CiCircleCheck } from "react-icons/ci";
import { GoodboardLogo } from "../../Logo/GoodboardLogo";
import styles from "./InfosBox.module.scss";
import { FaCheckCircle } from "react-icons/fa";

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
        <ul className={styles.argumentsList}>
          <ArgumentInList text="Impliquez vos utilisateurs dans vos prices de décision" />
          <ArgumentInList
            text="Basez-vous sur des données factuelles pour choisir vos futurs
              fonctionnalités"
          />
          <ArgumentInList
            text="Tenez votre communauté informée des évolutions récentes, et à
              venir"
          />
        </ul>
      </div>
    </div>
  );
};

const ArgumentInList = (props: { text: string }) => {
  return (
    <li>
      <div className={styles.iconContainer}>
        <FaCheckCircle size={20} color="#228be6" />
      </div>
      <div className={styles.argumentText}>{props.text}</div>
    </li>
  );
};
