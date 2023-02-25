import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./MainHero.module.scss";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Board } from "../../helpers/types";
import EmptyImage from "../EmptyImage/EmptyImage";

type Props = {};

const MainHero = (props: Props) => {
  const generalProperties = useAppSelector((state) => state.generalProperties);
  const [boardData, setBoardData] = useState<Board>({
    _id: "",
    name: "",
    description: "",
    picture: "",
  });

  useEffect(() => {
    if (
      generalProperties.activeBoard &&
      generalProperties.activeBoard.length > 0
    ) {
      getActiveBoardData(generalProperties.activeBoard);
    }
  }, [generalProperties.activeBoard]);

  const getActiveBoardData = async (activeBoard: string) => {
    handleDispatchActiveBoardData(activeBoard);
  };

  const handleDispatchActiveBoardData = async (activeBoard: string) => {
    const response = await axios({
      url: `${websiteUrl}/api/board/get/${generalProperties.activeBoard}`,
    });
    if (response.data) {
      setBoardData(response.data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {boardData.picture ? (
          <Avatar
            className={styles.companyLogo}
            alt="Company logo pic"
            src={boardData.picture}
            sx={{
              height: 85,
              width: 85,
            }}
          />
        ) : (
          <EmptyImage />
        )}

        <div className={styles.text}>
          <div className={styles.companyName}>{boardData.name}</div>
          <div className={styles.companyDescription}>
            {boardData.description}
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
