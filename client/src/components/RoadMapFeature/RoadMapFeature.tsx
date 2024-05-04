import { Card, CardContent, Divider } from "@mui/material";
import React, { useState } from "react";
import styles from "./RoadMapFeature.module.scss";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  FeatureRequest,
  FeatureRequestModalMode,
  UserType,
} from "../../helpers/types";
import FeatureRequestModal from "../Modals/FeatureRequestModal/FeatureRequestModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";

type Props = {
  featureRequest: FeatureRequest;
};

const RoadMapFeature = (props: Props) => {
  const [
    extendedFeatureRequestsModalOpen,
    setExtendedFeatureRequestsModalOpen,
  ] = useState(false);
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const handleOpenFeatureRequestModal = () => {
    if (loggedUser.user) {
      setExtendedFeatureRequestsModalOpen(true);
    } else {
      dispatch(
        setGeneralProperties({
          cannotMakeActionModalOpen: true,
        })
      );
    }
  };

  const handleCloseModal = () => {
    setExtendedFeatureRequestsModalOpen(false);
  };

  return (
    <>
      <Card
        className={styles.container}
        onClick={handleOpenFeatureRequestModal}
      >
        <CardContent className={styles.cardContent}>
          <div className={styles.topContentRow}>
            <div className={styles.topContent}>
              <div className={styles.dotIconContainer}>
                <FiberManualRecordIcon
                  className={styles.dotIcon}
                  sx={{
                    fontSize: 8,
                    color: "#4263EB",
                  }}
                />
              </div>
              <div className={styles.featureType}>
                {props.featureRequest.creatorType === UserType.admin
                  ? "Nos idées"
                  : "Vos idées"}
              </div>
            </div>
          </div>
          <div className={styles.title}>
            {props.featureRequest.title.slice(0, 25)}
            {props.featureRequest.title.length > 25 && "..."}
          </div>
          <div className={styles.detailsContainer}>
            {props.featureRequest.details.slice(0, 60)}
            {props.featureRequest.details.length > 60 && "..."}
          </div>
          <div className={styles.dividerContainer}>
            <div className={styles.divider}>
              <Divider />
            </div>
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.arrowIconContainer}>
              <ArrowDropUpIcon
                className={styles.icon}
                sx={{
                  fontSize: 25,
                  color: "#4C6EF5",
                }}
              />
            </div>
            <div className={styles.votesCount}>
              {props.featureRequest.voters.length}
            </div>
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
