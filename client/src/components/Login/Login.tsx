import styles from "./Login.module.scss";
import { AuthPageType } from "../../helpers/types";
import { InfosBox } from "./InfosBox/InfosBox";
import { AuthFormBox } from "./AuthFormBox/AuthFormBox";

type Props = {
  authType: AuthPageType;
};

const Login = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionBoxContainer}>
        <InfosBox />
      </div>
      <div className={styles.sectionBoxContainer}>
        <AuthFormBox authType={props.authType} />
      </div>
    </div>
  );
};

export default Login;
