import { Card, Chip, ToggleButton, useTheme } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import React, { useState } from "react";
import styles from "./FeatureRequestBox.module.scss";
import { FeatureRequest, FeatureRequestModalMode } from "../../helpers/types";
import FeatureRequestModal from "../Modals/FeatureRequestModal/FeatureRequestModal";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { downVote, upVote } from "../../redux/features/allFeatureRequestsSlice";
import { useEffect } from "react";
import {
  addToVotedFeatures,
  removeFromVotedFeatures,
} from "../../redux/features/loggedUserSlice";
import { websiteUrl } from "../../helpers/constants";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";

type Props = {
  featureRequestProperties: FeatureRequest;
};

function FeatureRequestBox(props: Props) {
  const [isVoted, setIsVoted] = useState(false);
  const [isClickedAtLeastOnce, setIsClickedAtLeastOnce] = useState(false);
  const [newFeatureRequestsModalOpen, setNewFeatureRequestsModalOpen] =
    useState(false);
  const handleCloseModal = () => {
    setNewFeatureRequestsModalOpen(false);
  };
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const menuSelectedState = useAppSelector(
    (state) => state.generalProperties.menuSelected
  );

  const handleVote = async () => {
    let url = "";
    if (loggedUser.user) {
      if (isVoted) {
        url = `${websiteUrl}/api/feature-request/up-vote/${props.featureRequestProperties._id}`;
        dispatch(
          upVote({
            featureRequestId: props.featureRequestProperties._id,
            userId: loggedUser.user._id,
            userPic: loggedUser.user.picture,
          })
        );
        dispatch(
          addToVotedFeatures({
            featureRequestId: props.featureRequestProperties._id,
          })
        );
      } else {
        url = `${websiteUrl}/api/feature-request/down-vote/${props.featureRequestProperties._id}`;
        dispatch(
          downVote({
            featureRequestId: props.featureRequestProperties._id,
            userId: loggedUser.user._id,
            userPic: loggedUser.user.picture
          })
        );
        dispatch(
          removeFromVotedFeatures({
            featureRequestId: props.featureRequestProperties._id,
          })
        );
      }
      await axios({
        url,
        method: "post",
        data: {
          userId: loggedUser.user._id,
        },
      });
    }
  };

  useEffect(() => {
    if (isClickedAtLeastOnce) {
      handleVote();
    }
  }, [isVoted]);

  useEffect(() => {
    if (loggedUser.user) {
      setIsVoted(
        loggedUser.user.voted.includes(props.featureRequestProperties._id)
      );
    }
  }, [loggedUser?.user?.voted, menuSelectedState]);

  const handleMakeClickedAtLeastOnce = () => {
    setIsClickedAtLeastOnce(true)
  }

  const handleChangeToggleBtn = () => {
    if (loggedUser.user) {
      setIsVoted(!isVoted)
    } else {
      dispatch(setGeneralProperties({
        cannotMakeActionModalOpen: true,
      }))
    }
  }

  const handleOpenNewFeatureRequestsModal = () => {
    if (loggedUser.user) {
      setNewFeatureRequestsModalOpen(true);
    } else {
      dispatch(
        setGeneralProperties({
          cannotMakeActionModalOpen: true,
        })
      );
    }
  }

  const theme = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.newFeatureRequestsBox}>
        <Card
          className={styles.contentBox}
          onClick={handleOpenNewFeatureRequestsModal}
        >
          <h3 className={styles.featureRequestTitle}>
            {props.featureRequestProperties.title.slice(0,30)}
            {props.featureRequestProperties.title.length > 30 && "..."}
          </h3>
          <div className={styles.featureRequestDescription}>
            {props.featureRequestProperties.details.slice(0, 50)}
            {props.featureRequestProperties.details.length > 50 && "..."}
          </div>
          <div className={styles.tagsContainer}>
            {props.featureRequestProperties.topics.map((category) => (
              <Chip className={styles.tag} label={category} key={category} />
            ))}
          </div>
        </Card>
        <ToggleButton
          value="check"
          selected={isVoted}
          onChange={handleChangeToggleBtn}
          onClick={handleMakeClickedAtLeastOnce}
          className={styles.checkButton}
           sx={{
            "&.Mui-selected": {
              bgcolor: theme.palette.primary.main,
            },
            '&:hover': theme.palette.primary.main,
            color: theme.palette.text.primary,
          }}
        >
          <div className={styles.votesBox}>
            {isVoted ? (
              <div className={styles.iconContainer}>
                <CheckRoundedIcon sx={{ fontSize: 15 }} />
              </div>
            ) : (
              <div className={styles.iconContainer}>
                <ArrowDropUpRoundedIcon />
              </div>
            )}
            <div className={styles.voteCountContainer}>
              {props.featureRequestProperties.voters?.length || 0}
            </div>
          </div>
        </ToggleButton>
      </div>
      <FeatureRequestModal
        modalMode={FeatureRequestModalMode.update}
        modalIsOpen={newFeatureRequestsModalOpen}
        handleCloseModal={handleCloseModal}
        featureRequestProperties={props.featureRequestProperties}
      />
    </div>
  );
}

export default FeatureRequestBox;
