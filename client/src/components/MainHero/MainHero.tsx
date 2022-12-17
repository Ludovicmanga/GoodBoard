import { Avatar } from "@mui/material";
import React from "react";
import styles from "./MainHero.module.scss";
import appleLogo from "../../photos/apple_logo.png";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

type Props = {};

const MainHero = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <Avatar
          className={styles.companyLogo}
          alt="Company logo pic"
          src={appleLogo}
          sx={{
            height: 85,
            width: 85,
          }}
        />
        <div className={styles.text}>
          <div className={styles.companyName}>Apple</div>
          <div className={styles.companyDescription}>
            Apple est une entreprise multinationale américaine qui crée et
            commercialise des produits électroniques grand public, des
            ordinateurs personnels et des logiciels.
          </div>
          <a rel="noreferrer" target="_blank" href="https://www.apple.com/">
            <div className={styles.companyLink}>Voir le site web</div>
          </a>
          <div>
            <div className={styles.socialLinks}>
              <BsFacebook className={styles.socialNetworkIcon} />
              <AiFillInstagram className={styles.socialNetworkIcon} />
              <AiFillTwitterCircle className={styles.socialNetworkIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
