import styles from "./GoodboardLogo.module.scss";
import logo from "../../photos/cosmetics.svg";
import { useNavigate } from "react-router-dom";

export const GoodboardLogo = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container} onClick={() => navigate("/")}>
      <img className={styles.logo} alt="logo" src={logo} />
    </div>
  );
};
