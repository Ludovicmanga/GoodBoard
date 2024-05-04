import { CiCircleCheck } from "react-icons/ci";
import styles from "./FeatureLine.module.scss";

const FeatureLine = (props: { text: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <CiCircleCheck />
      </div>
      <div className={styles.featureTextContainer}>{props.text}</div>
    </div>
  );
};

export default FeatureLine;
