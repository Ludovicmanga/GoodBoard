import styles from "./GoodboardLogo.module.scss";
import logo from "../../photos/logo-black.svg";

export const GoodboardLogo = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} alt="logo" src={logo} />
    </div>
  );
};
