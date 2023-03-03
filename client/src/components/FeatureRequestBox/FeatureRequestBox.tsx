import { Card, Chip, ToggleButton } from "@mui/material";
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
import { lightBlue, lightGreen } from "@mui/material/colors";
import {
  addToVotedFeatures,
  removeFromVotedFeatures,
} from "../../redux/features/loggedUserSlice";
import { websiteUrl } from "../../helpers/constants";

type Props = {
  featureRequestProperties: FeatureRequest;
};

const featureCategories = [
  "New brand",
  "Faster Website",
  "Faster Website",
];

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
  const generalPropertiesState = useAppSelector(state => state.generalProperties);


  const handleVote = async () => {
    let url = "";
    if (loggedUser.user) {
      if (isVoted) {
        url = `${websiteUrl}/api/feature-request/up-vote/${props.featureRequestProperties._id}`;
        dispatch(
          upVote({
            featureRequestId: props.featureRequestProperties._id,
            userId: loggedUser.user._id,
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

  return (
    <div className={styles.container}>
      <div className={styles.newFeatureRequestsBox}>
        <Card
          className={styles.contentBox}
          onClick={() => setNewFeatureRequestsModalOpen(true)}
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
            {featureCategories.map((category) => (
              <Chip className={styles.tag} label={category} />
            ))}
          </div>
        </Card>
        <ToggleButton
          value="check"
          selected={isVoted}
          onChange={() => setIsVoted(!isVoted)}
          onClick={() => setIsClickedAtLeastOnce(true)}
          className={styles.checkButton}
          sx={{
            "&.Mui-selected": {
              bgcolor: generalPropertiesState.colorMode === 'light' ? lightBlue[700] : 'black'
            },
            '&:hover': { bgcolor: generalPropertiesState.colorMode === 'light' ? lightBlue[700] : 'black', color: generalPropertiesState.colorMode === 'light' ? 'black' : 'white' },
            color: 'black',
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
