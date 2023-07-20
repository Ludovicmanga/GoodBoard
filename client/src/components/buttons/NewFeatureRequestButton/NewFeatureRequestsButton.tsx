import { Fab } from "@mui/material";
import React from "react";
import styles from "./NewFeatureRequestsButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import FeatureRequestModal from "../../Modals/FeatureRequestModal/FeatureRequestModal";
import { FeatureRequestModalMode } from "../../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";

type Props = {};

function NewFeatureRequestsButton({}: Props) {
  const [newFeatureRequestsModalOpen, setNewFeatureRequestsModalOpen] =
    useState(false);
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const handleOpenNewFeatureRequestModal = () => {
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
