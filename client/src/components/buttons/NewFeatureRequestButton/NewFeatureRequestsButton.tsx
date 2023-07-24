import { Fab } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./NewFeatureRequestsButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import FeatureRequestModal from "../../Modals/FeatureRequestModal/FeatureRequestModal";
import { BillingPlan, FeatureRequestModalMode } from "../../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";

type Props = {
  numberOfFeatureRequests: number;
};

function NewFeatureRequestsButton(props: Props) {
  const [newFeatureRequestsModalOpen, setNewFeatureRequestsModalOpen] =
    useState(false);
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const handleOpenNewFeatureRequestModal = () => {
    const userHasAccess =
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
    }
  };

  const handleCloseModal = () => {
    setNewFeatureRequestsModalOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        className={styles.button}
        onClick={handleOpenNewFeatureRequestModal}
      >
        <AddIcon className={styles.addIcon} />
        New request
      </Fab>
      <FeatureRequestModal
        modalMode={FeatureRequestModalMode.creation}
        modalIsOpen={newFeatureRequestsModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default NewFeatureRequestsButton;
