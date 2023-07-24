import { Avatar, Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./MainHero.module.scss";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Board } from "../../helpers/types";
import EmptyImage from "../EmptyImage/EmptyImage";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import CannotMakeActionAsGuestModal from "../Modals/CannotMakeActionAsGuestModal/CannotMakeActionAsGuestModal";
import { setActiveBoardData } from "../../redux/features/activeBoardSlice";
import { setBoardImageApiCall } from "../../helpers/boards";
import NeedToUpgradeModal from "../Modals/NeedToUpgradeModal/NeedToUpgradeModal";

type Props = {};

const MainHero = (props: Props) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      generalPropertiesState.activeBoard &&
      generalPropertiesState.activeBoard.length > 0
    ) {
      handleDispatchActiveBoardData();
    }
  }, [generalPropertiesState.activeBoard]);

  useEffect(() => {
    console.log(activeBoardState, " is the new state board");
  }, [activeBoardState]);

  useEffect(() => {
    if (activeBoardState.themeColor.length > 0) {
      dispatch(
        setGeneralProperties({
          colorMode: activeBoardState.themeColor,
        })
      );
    }
  }, [activeBoardState.themeColor]);

  const handleDispatchActiveBoardData = async () => {
    const response = await axios({
      url: `${websiteUrl}/api/board/get/${generalPropertiesState.activeBoard}`,
    });
    if (response.data) {
      dispatch(
        setActiveBoardData({
          _id: "",
          name: "",
          description: "",
          picture: "",
          themeColor: "",
          websiteUrl: "",
        })
      );
      dispatch(setActiveBoardData(response.data as Board));
    }
  };

  const theme = useTheme();

  const handleUploadImageToBoard = async (selectedFile: File) => {
    const res = await setBoardImageApiCall(
      selectedFile,
      generalPropertiesState.activeBoard!
    );
    if (res.data.url) {
      dispatch(
        setActiveBoardData({
          picture: res.data.url,
        })
      );
    }
  }

  return (
    <Box
      className={styles.container}
      sx={{
        background: theme.palette.primary.main,
      }}
    >
      <div className={styles.contentWrapper}>
        {activeBoardState.picture ? (
          <div className={styles.companyLogoContainer}>
            <Avatar
            variant="rounded"
            className={styles.companyLogo}
            alt="Company logo pic"
            src={activeBoardState.picture}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          </div>
        ) : (
          <EmptyImage
            handleUploadedImage={handleUploadImageToBoard}
            height={85}
            width={85}
          />
        )}

        <div className={styles.text}>
          <div className={styles.companyName}>{activeBoardState.name}</div>
          <div className={styles.companyDescription}>
            {activeBoardState.description}
          </div>
          <a
            rel="noreferrer"
            target="_blank"
            href={activeBoardState.websiteUrl}
          >
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
      <CannotMakeActionAsGuestModal
        modalIsOpen={generalPropertiesState.cannotMakeActionModalOpen}
        handleClose={() =>
          dispatch(
            setGeneralProperties({
              cannotMakeActionModalOpen: false,
            })
          )
        }
      />
      <NeedToUpgradeModal
        modalIsOpen={generalPropertiesState.needToUpgradeModalOpen}
        handleClose={() =>
          dispatch(
            setGeneralProperties({
              needToUpgradeModalOpen: false,
            })
          )
        }
      />
    </Box>
  );
};

export default MainHero;
