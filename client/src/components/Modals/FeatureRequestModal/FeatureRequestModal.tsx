import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Avatar,
  AvatarGroup,
  Card,
  Divider,
  MenuItem,
  Paper,
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
import { FaSalesforce, FaTrello } from "react-icons/fa";
import { RxNotionLogo } from "react-icons/rx";
import TrelloBoardsListModal from "../TrelloBoardsListModal/TrelloBoardsListModal";
import { getTopicsList } from "../../../helpers/topics";

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
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const [trelloBoardsList, setTrelloBoardsList] = useState<
    {
      id: string;
      name: string;
      url: string;
      lists: {
        id: string;
        name: string;
        closed: boolean;
        idBoard: string;
        pos: number;
        subscribed: boolean;
        softLimit: null;
        status: null;
      }[];
      prefs: {
        backgroundImageScaled: {
          width: number;
          height: number;
          url: string;
        }[];
      };
    }[]
  >([]);
  const [trelloBoardsListModalOpen, setTrelloBoardsListModalOpen] =
    useState(false);
  const [topicsList, setTopicsList] = useState<string[]>([]);

  useEffect(() => {
    if (props.modalIsOpen && loggedUserState.user) {
      console.log(props.featureRequestProperties, ' are the feature request properties')
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

  const handleSetTopicsList = async () => {
    const topicsListResponse = await getTopicsList();
    setTopicsList(topicsListResponse.data);
  }

  useEffect(() => {
    if (props.modalIsOpen) {
      handleSetTopicsList();
    }
  }, [props.modalIsOpen])

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
          board: generalPropertiesState.activeBoard,
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

  const handleDisplayTrelloCards = async () => {
    const res = await axios({
      method: "POST",
      url: `${websiteUrl}/api/integration/getTrelloBoards`,
      withCredentials: true,
    });

    setTrelloBoardsList(res.data);
    setTrelloBoardsListModalOpen(true);
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
        <Paper className={styles.modalContentContainer}>
          <div className={styles.modalTitle}>
            {props.modalMode === FeatureRequestModalMode.creation
              ? "Make feature request"
              : props.modalMode === FeatureRequestModalMode.update &&
                hasUpdateRights
              ? "Update feature request"
              : ""}
          </div>
          <Divider className={styles.divider} />
          <div className={styles.middle}>
            <div className={styles.mainContentMiddleContainer}>
              {props.modalMode === FeatureRequestModalMode.update && (
                <div>
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
                            <Avatar
                              key={voter}
                              alt="Voters pic"
                              src={ludoPhoto}
                            />
                          ))
                      ) : (
                        <div>Not voted yet</div>
                      )}
                    </AvatarGroup>
                  </div>
                  <div className={styles.statusSection}>
                    <div className={styles.statusSectionTitle}>Status :</div>
                    <Select
                      inputProps={{
                        readOnly:
                          props.modalMode === FeatureRequestModalMode.update &&
                          !hasUpdateRights,
                      }}
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
                </div>
              )}
              <div className={styles.statusSection}>
                <div className={styles.statusSectionTitle}>Topic :</div>
                <Autocomplete
                  multiple
                  onChange={(e, value) => {
                    setFeatureRequestProperties((propertiesState) => {
                      return { ...propertiesState, topics: value };
                    });
                  }}
                  value={featureRequestProperties?.topics || []}
                  limitTags={3}
                  options={topicsList}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Feature topics"
                      placeholder="Topics of the feature"
                    />
                  )}
                  sx={{ width: "500px" }}
                />
              </div>

              <TextField
                InputProps={{
                  readOnly:
                    props.modalMode === FeatureRequestModalMode.update &&
                    !hasUpdateRights,
                }}
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
                InputProps={{
                  readOnly:
                    props.modalMode === FeatureRequestModalMode.update &&
                    !hasUpdateRights,
                }}
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
            </div>
            <div className={styles.rightNavbar}>
              <div className={styles.rightNavbarTitle}>Integrations</div>
              <Card
                onClick={handleDisplayTrelloCards}
                className={styles.integrationChip}
              >
                <FaTrello color="#007AC0" />
                <div className={styles.integrationChipText}>Trello</div>
              </Card>
              <Card className={styles.integrationChip}>
                <FaSalesforce color="#009EDB" />
                <div className={styles.integrationChipText}>Salesforce</div>
              </Card>
              <Card className={styles.integrationChip}>
                <RxNotionLogo />
                <div className={styles.integrationChipText}>Notion</div>
              </Card>
            </div>
          </div>
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
          <TrelloBoardsListModal
            cardTitle={featureRequestProperties.title}
            cardDescription={featureRequestProperties.details}
            trelloBoardsList={trelloBoardsList}
            modalIsOpen={trelloBoardsListModalOpen}
            handleClose={() => setTrelloBoardsListModalOpen(false)}
          />
        </Paper>
      </Fade>
    </Modal>
  );
}
