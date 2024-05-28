import { Fab } from "@mui/material";
import React from "react";
import styles from "./NewFeatureRequestsButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { FeatureRequestModalMode } from "../../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleOpenNewFeatureRequestModal } from "../../../helpers/features";

function NewFeatureRequestsButton() {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const allFeatureRequests = useAppSelector(
    (state) => state.allFeatureRequests
  );

  const openNewFeatureRequestModal = () => {
    if (activeBoardState.billingPlan) {
      handleOpenNewFeatureRequestModal({
        activeBoardPlan: activeBoardState.billingPlan,
        mode: FeatureRequestModalMode.creation,
        dispatch,
        numberOfFeatureRequests: allFeatureRequests.length,
        loggedUser: loggedUser.user,
      });
    }

    /* const userHasAccess =
      activeBoardState.billingPlan !== BillingPlan.free ||
      props.numberOfFeatureRequests < 15;
    if (userHasAccess) {
      if (loggedUser.user) {
        setNewFeatureRequestsModalOpen(true);
      } else {
        dispatch(
          setGeneralProperties({
            cannotMakeActionModalOpen: true,
          })
        );
      }
    } else {
      dispatch(
        setGeneralProperties({
          needToUpgradeModalOpen: true,
        })
      );
    } */
  };

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        className={styles.button}
        onClick={openNewFeatureRequestModal}
      >
        <AddIcon className={styles.addIcon} />
        Nouvelle idée
      </Fab>
    </>
  );
}

export default NewFeatureRequestsButton;
