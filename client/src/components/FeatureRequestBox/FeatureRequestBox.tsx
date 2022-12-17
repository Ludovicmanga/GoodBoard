import { Card, ToggleButton } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import React, { useState } from "react";
import styles from "./FeatureRequestBox.module.scss";
import { FeatureRequest, FeatureRequestModalMode } from "../../helpers/types";
import FeatureRequestModal from "../Modals/FeatureRequestModal/FeatureRequestModal";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { downVote, upVote } from "../../redux/features/allFeatureRequestsSlice";
import { useEffect } from "react";
import { lightBlue } from "@mui/material/colors";


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

  const handleVote = async () => {
    let url = "";
    if (isVoted) {
      url = `http://localhost:8080/feature-request/up-vote/${props.featureRequestProperties._id}`;
      dispatch(
        upVote({
          featureRequestId: props.featureRequestProperties._id,
          userId: "627846ccfd2156ff58270133",
        })
      );
    } else {
      url = `http://localhost:8080/feature-request/down-vote/${props.featureRequestProperties._id}`;
      dispatch(
        downVote({
          featureRequestId: props.featureRequestProperties._id,
          userId: "627846ccfd2156ff58270133",
        })
      );
    }
    await axios({
      url,
      method: "post",
      data: {
        userId: "627846ccfd2156ff58270133",
      },
    });
  };

  useEffect(() => {
    if (isClickedAtLeastOnce) {
      handleVote();
    }
  }, [isVoted]);

  return (
    <div className={styles.container}>
      <div className={styles.newFeatureRequestsBox}>
        <Card
          className={styles.contentBox}
          onClick={() => setNewFeatureRequestsModalOpen(true)}
        >
          <h3 className={styles.featureRequestTitle}>
            {props.featureRequestProperties.title}
          </h3>
          <div className={styles.featureRequestDescription}>
            {props.featureRequestProperties.details.slice(0, 100)}
            {props.featureRequestProperties.details.length > 99 && "..."}
          </div>
        </Card>
        <ToggleButton
          value="check"
          selected={isVoted}
          onChange={() => setIsVoted(!isVoted)}
          onClick={() => setIsClickedAtLeastOnce(true)}
          className={styles.checkButton}
          sx={{
            '&.Mui-selected': {
              bgcolor: lightBlue[700],
            }
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
        featureRequestProperties={props.featureRequestProperties}
        modalMode={FeatureRequestModalMode.update}
        modalIsOpen={newFeatureRequestsModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}

export default FeatureRequestBox;
