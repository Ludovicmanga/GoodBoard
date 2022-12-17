import { Card, CardContent, Divider } from "@mui/material";
import React, { useState } from "react";
import styles from "./RoadMapFeature.module.scss";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { FeatureRequest, FeatureRequestModalMode, UserType } from "../../helpers/types";
import FeatureRequestModal from "../Modals/FeatureRequestModal/FeatureRequestModal";

type Props = {
  featureRequest: FeatureRequest;
};

const RoadMapFeature = (props: Props) => {
  const [extendedFeatureRequestsModalOpen, setExtendedFeatureRequestsModalOpen] = useState(false);
  const handleOpenFeatureRequestModal = () => {
    setExtendedFeatureRequestsModalOpen(true);
  };

  const handleCloseModal = () => {
    setExtendedFeatureRequestsModalOpen(false);
  }

  return (
    <>
      <Card
        className={styles.container}
        onClick={handleOpenFeatureRequestModal}
      >
        <CardContent className={styles.cardContent}>
          <div className={styles.topContent}>
            <FiberManualRecordIcon
              className={styles.dotIcon}
              sx={{
                fontSize: 8,
                color: "green",
              }}
            />
            <div className={styles.featureType}>
              {props.featureRequest.creatorType === UserType.admin
                ? "Our ideas"
                : "Your ideas"}
            </div>
          </div>
          <div className={styles.title}>{props.featureRequest.title}</div>
          <div className={styles.detailsContainer}>
            {props.featureRequest.details.slice(0, 90)}
            {props.featureRequest.details.length > 99 && "..."}
          </div>
          <Divider className={styles.divider} />
          <div className={styles.bottomContent}>
            <ArrowDropUpIcon
              className={styles.icon}
              sx={{
                fontSize: 25,
                color: "blue",
              }}
            />
            <div>{props.featureRequest.voters.length}</div>
          </div>
        </CardContent>
      </Card>
      <FeatureRequestModal
        modalMode={FeatureRequestModalMode.update}
        modalIsOpen={extendedFeatureRequestsModalOpen}
        handleCloseModal={handleCloseModal}
        featureRequestProperties={props.featureRequest}
      />
    </>
  );
};

export default RoadMapFeature;
