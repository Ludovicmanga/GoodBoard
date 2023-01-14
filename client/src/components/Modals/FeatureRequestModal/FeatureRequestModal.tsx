import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  Avatar,
  AvatarGroup,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import styles from "./FeatureRequestModal.module.scss";
import ludoPhoto from "../../../photos/ludoImg.jpg";
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
import {
  addFeatureRequest,
  deleteFeatureRequest,
  updateFeatureRequest,
} from "../../../redux/features/allFeatureRequestsSlice";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
import { emptyFeatureRequest, websiteUrl } from "../../../helpers/constants";

export default function FeatureRequestModal(props: {
  modalMode: FeatureRequestModalMode;
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  featureRequestProperties?: FeatureRequest;
}) {
  const [featureRequestProperties, setFeatureRequestProperties] =
    useState<FeatureRequest>(emptyFeatureRequest);

  const [hasUpdateRights, setHasUpdateRights] = useState(false);
  const [titleHasError, setTitleHasError] = useState<boolean>(false);
  const [titleErrorHelperText, setTitleErrorHelperText] = useState<string>("");
  const [detailsHasError, setDetailsHasError] = useState<boolean>(false);
  const [detailsErrorHelperText, setDetailsErrorHelperText] =
    useState<string>("");
  const loggedUserState = useAppSelector((state) => state.loggedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.modalIsOpen && loggedUserState.user) {
      if (
        props.featureRequestProperties &&
        props.modalMode === FeatureRequestModalMode.update
      ) {
        setFeatureRequestProperties(props.featureRequestProperties);
      } else {
        setFeatureRequestProperties(emptyFeatureRequest);
      }
    }
  }, [props.modalIsOpen, props.featureRequestProperties, props.modalMode]);

  useEffect(() => {
    if (
      props.modalIsOpen &&
      loggedUserState.user &&
      props.modalMode === FeatureRequestModalMode.update
    ) {
      setHasUpdateRights(
        loggedUserState?.user.type === UserType.admin ||
          featureRequestProperties?.creator === loggedUserState.user?._id
      );
    }
  }, [featureRequestProperties.creator]);

  const deleteRequest = async () => {
    const deletedFeature = await axios({
      url: `${websiteUrl}/api/feature-request/delete`,
      method: "post",
      data: {
        featureRequestId: featureRequestProperties._id,
      },
      withCredentials: true,
    });
    if (deletedFeature.data.deleted) {
      dispatch(
        deleteFeatureRequest({
          featureRequest: featureRequestProperties,
        })
      );
    }
    dispatch(
      setGeneralProperties({
        mainSnackBar: {
          isOpen: true,
          message: "The feature was successfully deleted",
        },
      })
    );
    props.handleCloseModal();
  };

  const upsertRequest = async () => {
    if (props.modalMode === FeatureRequestModalMode.creation) {
      const createdFeatureRequest = await axios({
        url: `${websiteUrl}/api/feature-request/create`,
        method: "post",
        data: {
          featureRequest: featureRequestProperties,
        },
        withCredentials: true,
      });
      if (createdFeatureRequest) {
        dispatch(
          addFeatureRequest({
            featureRequest: createdFeatureRequest.data,
          })
        );
        dispatch(
          setGeneralProperties({
            mainSnackBar: {
              isOpen: true,
              message: "The feature was successfully created",
            },
          })
        );
      }
    } else {
      const updatedFeatureRequest = await axios({
        url: `${websiteUrl}/api/feature-request/update`,
        method: "post",
        data: {
          featureRequest: featureRequestProperties,
        },
        withCredentials: true,
      });
      if (updatedFeatureRequest) {
        dispatch(
          updateFeatureRequest({
            featureRequestToUpdate: updatedFeatureRequest.data,
          })
        );
        dispatch(
          setGeneralProperties({
            mainSnackBar: {
              isOpen: true,
              message: "The feature was successfully updated",
            },
          })
        );
      }
    }
    props.handleCloseModal();
  };

  const handleUpsertRequest = async () => {
    if (
      featureRequestProperties.title.length > 0 &&
      featureRequestProperties.details.length > 0
    ) {
      await upsertRequest();
    } else {
      if (featureRequestProperties.title.length === 0) {
        setTitleHasError(true);
        setTitleErrorHelperText("Title cannot be empty");

        setTimeout(() => {
          setTitleHasError(false);
          setTitleErrorHelperText("");
        }, 3000);
      }

      if (featureRequestProperties.details.length === 0) {
        setDetailsHasError(true);
        setDetailsErrorHelperText("Details cannot be empty");

        setTimeout(() => {
          setDetailsHasError(false);
          setDetailsErrorHelperText("");
        }, 3000);
      }
    }
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
              ? "Make feature request"
              : props.modalMode === FeatureRequestModalMode.update &&
                hasUpdateRights
              ? "Update feature request"
              : ""}
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
                  {featureRequestProperties.voters.length > 0 ? (
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
                  disabled={
                    props.modalMode === FeatureRequestModalMode.update &&
                    !hasUpdateRights
                  }
                  labelId="status"
                  id="status"
                  value={featureRequestProperties.status}
                  label="Status"
                  onChange={(e: SelectChangeEvent<string>) => {
                    setFeatureRequestProperties((propertiesState) => {
                      return {
                        ...propertiesState,
                        status: e.target.value,
                      };
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
            disabled={
              props.modalMode === FeatureRequestModalMode.update &&
              !hasUpdateRights
            }
            error={titleHasError}
            helperText={titleErrorHelperText}
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
            disabled={
              props.modalMode === FeatureRequestModalMode.update &&
              !hasUpdateRights
            }
            error={detailsHasError}
            helperText={detailsErrorHelperText}
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
          <div className={styles.mainButtonsContainer}>
            {(hasUpdateRights ||
              props.modalMode === FeatureRequestModalMode.creation) && (
              <Button
                onClick={handleUpsertRequest}
                className={styles.submitButton}
                variant="contained"
              >
                {props.modalMode === FeatureRequestModalMode.creation
                  ? "Create "
                  : "Update "}
                request
              </Button>
            )}
            {hasUpdateRights &&
              props.modalMode === FeatureRequestModalMode.update && (
                <Button
                  className={styles.submitButton}
                  onClick={deleteRequest}
                  variant="outlined"
                  color="error"
                >
                  Delete request
                </Button>
              )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
