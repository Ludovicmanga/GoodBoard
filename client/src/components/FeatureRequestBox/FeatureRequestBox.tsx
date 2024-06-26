import { Card, Chip } from "@mui/material";
import React, { useState } from "react";
import styles from "./FeatureRequestBox.module.scss";
import {
  BillingPlan,
  FeatureRequest,
  FeatureRequestModalMode,
} from "../../helpers/types";
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
import LikeBtn from "../LikeBtn/LikeBtn";

type Props = {
  featureRequestProperties: FeatureRequest;
};

function FeatureRequestBox(props: Props) {
  const [isVoted, setIsVoted] = useState(false);
  const [isChangingVote, setIsChangingVote] = useState(false);
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
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  const handleVote = async () => {
    let url = "";
    if (loggedUser.user) {
      setIsChangingVote(true);
      if (isVoted) {
        url = `${websiteUrl}/api/feature-request/up-vote`;
      } else {
        url = `${websiteUrl}/api/feature-request/down-vote`;
      }
      const res = await axios({
        url,
        method: "post",
        data: {
          featureRequestId: props.featureRequestProperties._id,
        },
        withCredentials: true,
      });
      setIsChangingVote(false);
      if (res.data) {
        handleSuccessFullChangeVote(
          isVoted,
          loggedUser.user._id,
          loggedUser.user.picture
        );
      }
    } else {
      console.log("no damn user");
    }
  };

  const handleSuccessFullChangeVote = (
    isVoted: boolean,
    userId: string,
    userPic: string
  ) => {
    if (isVoted) {
      dispatch(
        upVote({
          featureRequestId: props.featureRequestProperties._id,
          userId,
          userPic,
        })
      );
      dispatch(
        addToVotedFeatures({
          featureRequestId: props.featureRequestProperties._id,
        })
      );
    } else {
      dispatch(
        downVote({
          featureRequestId: props.featureRequestProperties._id,
          userId,
          userPic,
        })
      );
      dispatch(
        removeFromVotedFeatures({
          featureRequestId: props.featureRequestProperties._id,
        })
      );
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
    setIsClickedAtLeastOnce(true);
  };

  const handleChangeToggleBtn = () => {
    if (loggedUser.user) {
      setIsVoted(!isVoted);
    } else {
      dispatch(
        setGeneralProperties({
          cannotMakeActionModalOpen: true,
        })
      );
    }
  };

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
  };

  return (
    <div className={styles.newFeatureRequestsBox}>
      <Card
        className={styles.contentBox}
        onClick={handleOpenNewFeatureRequestsModal}
      >
        <h3 className={styles.featureRequestTitle}>
          {props.featureRequestProperties.title.slice(0, 30)}
          {props.featureRequestProperties.title.length > 30 && "..."}
        </h3>
        <div className={styles.featureRequestDescription}>
          {props.featureRequestProperties.details.slice(0, 50)}
          {props.featureRequestProperties.details.length > 50 && "..."}
        </div>
        <div className={styles.tagsContainer}>
          {activeBoardState.billingPlan !== BillingPlan.free &&
            props.featureRequestProperties.topics.map((category) => (
              <Chip
                className={styles.tag}
                label={category.label}
                key={category._id}
              />
            ))}
        </div>
      </Card>
      <div className={styles.likeBtnContainer}>
        <div className={styles.likeIconAndVoteContainer}>
          <LikeBtn
            checked={isVoted}
            onChange={handleChangeToggleBtn}
            onClick={handleMakeClickedAtLeastOnce}
            isClickedAtLeastOnce={isClickedAtLeastOnce}
          />
          <div className={styles.voteCountContainer}>
            {props.featureRequestProperties.voters?.length || 0}
          </div>
        </div>
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
