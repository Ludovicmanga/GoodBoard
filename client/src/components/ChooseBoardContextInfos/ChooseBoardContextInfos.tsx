import { FaCheckCircle } from "react-icons/fa";
import styles from "./ChooseBoardContextInfos.module.scss";

export const ChooseBoardContextInfos = (props: { title: string }) => {
  return (
    <div className={styles.contextInfosContainer}>
      <h1 className={styles.contextInfosContainerTitle}>{props.title}</h1>
      <ul className={styles.argumentsList}>
        <ArgumentInList text="Visualisez les fonctionnalités proposées par vos utilisateurs" />
        <ArgumentInList text="Communiquez sur votre roadmap" />
        <ArgumentInList text="Communiquez sur les dernières fonctionnalités" />
        <ArgumentInList text="Envoyez vos idées directement dans votre outil de gestion produit" />
      </ul>
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
