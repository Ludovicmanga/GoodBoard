import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import styles from "./FeatureRequestModal.module.scss";
import ludoPhoto from "../../../photos/ludoImg.jpg";
import noVoter from "../../../photos/no_voter.png";
import { useState } from "react";
import {
  FeatureRequest,
  FeatureRequestModalMode,
  FeatureRequestStatus,
  UserType,
} from "../../../helpers/types";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "../../../helpers/utils";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addFeatureRequest, updateFeatureRequest } from '../../../redux/features/allFeatureRequestsSlice';
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
import { emptyFeatureRequest } from "../../../helpers/constants";

export default function FeatureRequestModal(props: {
  modalMode: FeatureRequestModalMode;
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  featureRequestProperties?: FeatureRequest;
}) {
  const [featureRequestProperties, setFeatureRequestProperties] =
    useState<FeatureRequest>(emptyFeatureRequest);

  useEffect(() => {
    if (props.modalIsOpen) {
      if (
        props.featureRequestProperties &&
        props.modalMode === FeatureRequestModalMode.update
      ) {
        setFeatureRequestProperties(props.featureRequestProperties);
      }
      
      if (props.modalMode === FeatureRequestModalMode.creation) {
        setFeatureRequestProperties(emptyFeatureRequest);
      }
    }
  }, [props.modalIsOpen, props.featureRequestProperties, props.modalMode]);

  const dispatch = useAppDispatch();

  const handleUpsertRequest = async () => {
    if (props.modalMode === FeatureRequestModalMode.creation) {
      const createdFeatureRequest = await axios({
        url: 'http://localhost:8080/feature-request/create',
        method: 'post',
        data: {
            featureRequest: featureRequestProperties,
        }
      });
      if (createdFeatureRequest) {
        dispatch(addFeatureRequest({
          featureRequest: createdFeatureRequest.data,
        }));
        dispatch(setGeneralProperties({
          mainSnackBar: {
            isOpen: true,
            message: 'The feature was successfully created',
          }
        }));
      }
    } else {
      const updatedFeatureRequest = await axios({
        url: 'http://localhost:8080/feature-request/update',
        method: 'post',
        data: {
          featureRequest: featureRequestProperties,
        }
      });
      if (updatedFeatureRequest) {
        dispatch(updateFeatureRequest({
          featureRequestToUpdate: updatedFeatureRequest.data,
        }));
        dispatch(setGeneralProperties({
          mainSnackBar: {
            isOpen: true,
            message: 'The feature was successfully updated',
          }
        }));
      }
    }
    props.handleCloseModal();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.modalIsOpen}
      onClose={props.handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.modalIsOpen}>
        <div className={styles.modalContentContainer}>
          <div className={styles.modalTitle}>
            {props.modalMode === FeatureRequestModalMode.creation
              ? "Make"
              : "Update"}{" "}
            a feature request
          </div>
          <Divider className={styles.divider} />
          {props.modalMode === FeatureRequestModalMode.update && (
            <>
              <div className={styles.votersSection}>
                <div className={styles.votersSectionTitle}>Voters :</div>
                <AvatarGroup
                  className={styles.avatarGroup}
                  total={featureRequestProperties.voters?.length}
                >
                  {featureRequestProperties.voters.length > 1 ? (
                    featureRequestProperties.voters
                      ?.slice(0, 4)
                      .map((voter) => (
                        <Avatar key={voter} alt="Voters pic" src={ludoPhoto} />
                      ))
                  ) : (
                    <div>Not voted yet</div>
                  )}
                </AvatarGroup>
              </div>
              <div className={styles.statusSection}>
                <div className={styles.statusSectionTitle}>Status :</div>
                <Select
                  labelId="status"
                  id="status"
                  value={featureRequestProperties.status}
                  label="Status"
                  onChange={(e: SelectChangeEvent<string>) => {
                    setFeatureRequestProperties((propertiesState) => {
                      return { ...propertiesState, status: e.target.value };
                    });
                  }}
                >
                  {(
                    Object.keys(FeatureRequestStatus) as Array<
                      keyof typeof FeatureRequestStatus
                    >
                  ).map((status) => (
                    <MenuItem value={status}>
                      {capitalizeFirstLetter(status)}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </>
          )}
          <TextField
            label="Title"
            value={featureRequestProperties.title}
            onChange={(e) => {
              setFeatureRequestProperties((propertiesState) => {
                return { ...propertiesState, title: e.target.value };
              });
            }}
            className={`${styles.textInput} ${styles.titleInput}`}
          />
          <TextField
            label="Details"
            multiline
            rows={4}
            value={featureRequestProperties.details}
            onChange={(e) => {
              setFeatureRequestProperties((propertiesState) => {
                return { ...propertiesState, details: e.target.value };
              });
            }}
            className={`${styles.textInput} ${styles.textArea}`}
          />
          <Button
            onClick={handleUpsertRequest}
            className={styles.submitButton}
            variant="contained"
          >
            { props.modalMode === FeatureRequestModalMode.creation ? 'Create ' : 'Update ' }
            request
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}
