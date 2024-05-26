import { Avatar, IconButton, Skeleton, useTheme } from "@mui/material";
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
import NeedToUpgradeModal from "../Modals/NeedToUpgradeModal/NeedToUpgradeModal";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { handleUploadImageToBoard } from "../../helpers/boards";
import { IoLinkOutline } from "react-icons/io5";

type Props = {};

const MainHero = (props: Props) => {
  const [pictureIsLoading, setPictureIsLoading] = useState(false);
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const dispatch = useAppDispatch();
  const [nameWithCapitalFirstLetter, setNameWithCapitalFirstLetter] =
    useState("");
  const [
    descriptionWithCapitalFirstLetter,
    setDescriptionWithCapitalFirstLetter,
  ] = useState("");

  useEffect(() => {
    if (
      generalPropertiesState.activeBoard &&
      generalPropertiesState.activeBoard.length > 0
    ) {
      handleDispatchActiveBoardData();
    }
  }, [generalPropertiesState.activeBoard]);

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
      dispatch(setActiveBoardData(response.data));
    }
  };

  useEffect(() => {
    if (activeBoardState?.name) {
      setNameWithCapitalFirstLetter(
        capitalizeFirstLetter(activeBoardState.name)
      );
    }
  }, [activeBoardState.name]);

  useEffect(() => {
    if (activeBoardState?.description) {
      setDescriptionWithCapitalFirstLetter(
        capitalizeFirstLetter(activeBoardState.description)
      );
    }
  }, [activeBoardState.description]);

  const theme = useTheme();

  const handleUpdateBoardImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPictureIsLoading(true);
      await handleUploadImageToBoard(
        selectedFile,
        dispatch,
        generalPropertiesState.activeBoard!
      );
      setPictureIsLoading(false);
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        background: theme.palette.primary.main,
      }}
    >
      <div
        className={styles.contentWrapper}
        style={{
          background: theme.palette.secondary.light,
        }}
      >
        <div className={styles.imgContainer}>
          {pictureIsLoading ? (
            <Skeleton variant="circular" height={125} width={125} />
          ) : activeBoardState.picture ? (
            <Avatar
              variant="circular"
              className={styles.companyLogo}
              alt="Company logo pic"
              src={activeBoardState.picture}
              sx={{
                height: 145,
                width: 145,
                border: "1px solid lightgray",
              }}
            />
          ) : (
            <EmptyImage
              handleUploadedImage={handleUpdateBoardImage}
              height={145}
              width={145}
            />
          )}
        </div>
        <div className={styles.text}>
          <div className={styles.companyName}>{nameWithCapitalFirstLetter}</div>
          <div className={styles.companyDescription}>
            {descriptionWithCapitalFirstLetter}
          </div>
          <div className={styles.companyLinkBtnContainer}>
            <IconButton
              className={styles.companyLinkBtn}
              onClick={() => window.open(activeBoardState?.websiteUrl)}
            >
              <div className={styles.companyLinkIcon}>
                <IoLinkOutline />
              </div>
              <div className={styles.companyLinkText}>Voir le site web</div>
            </IconButton>
          </div>
          <div>
            <div className={styles.socialLinks}>
              <IconButton
                onClick={() =>
                  window.open(
                    "https://facebook.com/" + activeBoardState.facebookUrl
                  )
                }
              >
                <BsFacebook className={styles.socialNetworkIcon} size={24} />
              </IconButton>
              <IconButton
                onClick={() =>
                  window.open(
                    "https://instagram.com/" + activeBoardState.instagramUrl
                  )
                }
              >
                <AiFillInstagram
                  className={styles.socialNetworkIcon}
                  size={28}
                />
              </IconButton>
              <IconButton
                onClick={() =>
                  window.open("https://x.com/" + activeBoardState.twitterUrl)
                }
              >
                <AiFillTwitterCircle
                  className={styles.socialNetworkIcon}
                  size={28}
                />
              </IconButton>
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
    </div>
  );
};

export default MainHero;
