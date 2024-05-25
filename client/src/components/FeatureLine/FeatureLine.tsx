import { CiCircleCheck } from "react-icons/ci";
import styles from "./FeatureLine.module.scss";
import { useTheme } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

const FeatureLine = (props: { text: string }) => {
  function shadeColor(color: string, percent: number) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R *= (100 + percent) / 100;
    G *= (100 + percent) / 100;
    B *= (100 + percent) / 100;

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  const theme = useTheme();
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FaCheckCircle color={shadeColor(theme.palette.primary.main, -10)} />
      </div>
      <div className={styles.featureTextContainer}>{props.text}</div>
    </div>
  );
};

export default FeatureLine;
