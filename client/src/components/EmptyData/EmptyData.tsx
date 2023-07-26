import React from "react";
import { EmptyPageType, FeatureRequestModalMode } from "../../helpers/types";
import styles from "./EmptyData.module.scss";
import { Button } from "@mui/material";
import { handleOpenNewFeatureRequestModal } from "../../helpers/features";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { emptyBox, roadmapImg } from "../../helpers/constants";

type Props = {
  title: string;
  details: string;
  type: EmptyPageType;
};

const EmptyData = (props: Props) => {
  const loggedUser = useAppSelector((state) => state.loggedUser).user;
  const dispatch = useAppDispatch();
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  const openFeatureRequestsModal = () => {
    if (activeBoardState.billingPlan) {
      handleOpenNewFeatureRequestModal({
        loggedUser,
        numberOfFeatureRequests: 0,
        mode: FeatureRequestModalMode.creation,
        activeBoardPlan: activeBoardState.billingPlan,
        dispatch,
      });
    }
  };

  const renderImage = () => {
    switch (props.type) {
      case EmptyPageType.featureRequests:
        return (
          <img
            className={styles.image}
            src={emptyBox}
            alt="Empty Feature Requests"
          />
        );
      case EmptyPageType.roadmap:
        return (
          <img className={styles.image} src={roadmapImg} alt="Empty Roadmap" />
        );
      case EmptyPageType.changeLog:
        return (
          <img className={styles.image} src={emptyBox} alt="Empty Changelog" />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {renderImage()}
      <div className={styles.title}>{props.title}</div>
      <div className={styles.details}>{props.details}</div>
      {props.type === EmptyPageType.featureRequests && (
        <Button onClick={openFeatureRequestsModal} variant="contained">
          Create your first request
        </Button>
      )}
    </div>
  );
};

export default EmptyData;
