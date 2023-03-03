import { Fab } from "@mui/material";
import React from "react";
import styles from "./NewFeatureRequestsButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import FeatureRequestModal from "../../Modals/FeatureRequestModal/FeatureRequestModal";
import { FeatureRequestModalMode } from "../../../helpers/types";
import { useAppSelector } from "../../../redux/hooks";

type Props = {};

function NewFeatureRequestsButton({}: Props) {
  const [newFeatureRequestsModalOpen, setNewFeatureRequestsModalOpen] =
    useState(false);
  const handleOpenNewFeatureRequestModal = () => {
    setNewFeatureRequestsModalOpen(true);
  };

  const handleCloseModal = () => {
    setNewFeatureRequestsModalOpen(false);
  };

  const generalPropertiesState = useAppSelector(state => state.generalProperties);

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        className={styles.button}
        onClick={handleOpenNewFeatureRequestModal}
        sx={{
          bgcolor: generalPropertiesState.colorMode === 'light' ? '' : 'black',
          color: generalPropertiesState.colorMode === 'light' ? '' : 'white'
        }}
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
