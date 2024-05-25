import * as React from "react";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Avatar,
  AvatarGroup,
  Divider,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
} from "@mui/material";
import styles from "./FeatureRequestModal.module.scss";
import { useState } from "react";
import {
  BillingPlan,
  FeatureRequest,
  FeatureRequestModalMode,
  FeatureRequestStatus,
  TopicType,
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
import TrelloBoardsListModal from "../TrelloBoardsListModal/TrelloBoardsListModal";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import { Add } from "@mui/icons-material";
import { getTopicsList } from "../../../helpers/topics";

export default function FeatureRequestModal(props: {
  modalMode: FeatureRequestModalMode;
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  featureRequestProperties?: FeatureRequest;
}) {
  const [featureRequestProperties, setFeatureRequestProperties] =
    useState<FeatureRequest>(emptyFeatureRequest);
  const [topicsList, setTopicsList] = useState<TopicType[]>([]);

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
  const activeBoardState = useAppSelector((state) => state.activeBoard);
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

  const [topicInputValue, setTopicInputValue] = useState("");

  const handleGetTopicsList = async () => {
    const topicsListResponse = await getTopicsList(activeBoardState._id);
    if (topicsListResponse) {
      setTopicsList(topicsListResponse);
    }
  };

  const bigscreen = useMediaQuery("(min-width: 40rem)");

  useEffect(() => {
    if (props.modalIsOpen && loggedUserState.user) {
      handleGetTopicsList();
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
        loggedUserState?.user.roleOnThisBoard === UserType.admin ||
          loggedUserState?.user.roleOnThisBoard === UserType.member ||
          featureRequestProperties?.creator === loggedUserState.user?._id
      );
    }
  }, [featureRequestProperties.creator]);

  const openDeleteRequestDialog = () => {
    dispatch(
      setGeneralProperties({
        dialogAlert: {
          isOpen: true,
          title: "Supprimer votre idée",
          textDetails:
            "Êtes-vous sûr de vouloir supprimer votre idée ? Cette action est irréversible",
          handleClose: () =>
            dispatch(
              setGeneralProperties({
                dialogAlert: null,
              })
            ),
          handleSubmit: handleDeleteRequest,
          submitBtnText: "supprimer idée",
          submitBtnColor: "error",
        },
      })
    );
  };

  const handleDeleteRequest = async () => {
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
          message: "L'idée a été supprimée",
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
          boardId: generalPropertiesState.activeBoard,
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
              message: "L'idée a bien été créé !",
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
              message: "L'idée a été mise à jour",
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

  const handleCreateTopic = async () => {
    const response = await axios({
      url: `${websiteUrl}/api/topic/create`,
      method: "post",
      data: {
        label: topicInputValue,
        boardId: activeBoardState._id,
      },
      withCredentials: true,
    });
    if (response.data) {
      setTopicsList((curr) => [...curr, response.data]);
      setFeatureRequestProperties((propertiesState) => {
        return {
          ...propertiesState,
          topics: [...propertiesState.topics, response.data],
        };
      });
    }
  };

  return (
    <ModalTemplate
      modalIsOpen={props.modalIsOpen}
      handleClose={props.handleCloseModal}
      width={bigscreen ? "50%" : "90%"}
      maxHeight="93%"
    >
      <div className={styles.modalTitle}>
        {props.modalMode === FeatureRequestModalMode.creation
          ? "Créer une nouvelle idée"
          : props.modalMode === FeatureRequestModalMode.update &&
            hasUpdateRights
          ? "Mettre à jour une idée"
          : ""}
      </div>
      <Divider className={styles.divider} />
      <div className={styles.middle}>
        <div>
          {props.modalMode === FeatureRequestModalMode.update && (
            <div>
              <div className={styles.votersSection}>
                <AvatarGroup
                  className={styles.avatarGroup}
                  total={featureRequestProperties.voters?.length || 0}
                >
                  {featureRequestProperties.votersPics?.length > 0 &&
                    featureRequestProperties.votersPics
                      .slice(0, 4)
                      .map((voterPic) => (
                        <Avatar
                          key={voterPic}
                          alt="Voters pic"
                          src={voterPic}
                        />
                      ))}
                </AvatarGroup>
              </div>
              {activeBoardState.billingPlan === BillingPlan.business && (
                <div className={styles.statusSection}>
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
                    {Object.values(FeatureRequestStatus).map((status) => (
                      <MenuItem value={status} key={status}>
                        {capitalizeFirstLetter(status)}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          )}
          {activeBoardState.billingPlan !== BillingPlan.free && (
            <div className={styles.statusSection}>
              <Autocomplete
                readOnly={
                  props.modalMode === FeatureRequestModalMode.update &&
                  !hasUpdateRights
                }
                multiple
                onChange={(e, value) => {
                  setFeatureRequestProperties((propertiesState) => {
                    return { ...propertiesState, topics: value };
                  });
                }}
                value={featureRequestProperties.topics}
                limitTags={3}
                options={topicsList}
                getOptionLabel={(option) => option.label}
                noOptionsText={
                  loggedUserState?.user?.roleOnThisBoard === UserType.admin ? (
                    <IconButton
                      className={styles.noOptionTopicBtn}
                      onClick={handleCreateTopic}
                    >
                      <Add className={styles.noOptionTopicBtnIcon} />
                      <div className={styles.noOptionTopicBtnText}>
                        Créer {topicInputValue}
                      </div>
                    </IconButton>
                  ) : (
                    `Aucune catégorie avec le nom ${topicInputValue}`
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Catégorie"
                    placeholder="Catégories de l'idée"
                    onChange={(e) => setTopicInputValue(e.target.value)}
                  />
                )}
                fullWidth
              />
            </div>
          )}

          <TextField
            InputProps={{
              readOnly:
                props.modalMode === FeatureRequestModalMode.update &&
                !hasUpdateRights,
            }}
            error={titleHasError}
            helperText={titleErrorHelperText}
            label="Titre"
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
            label="Détails"
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
              ? "Créer "
              : "Mettre à jour "}
            idée
          </Button>
        )}
        {hasUpdateRights &&
          props.modalMode === FeatureRequestModalMode.update && (
            <Button
              className={styles.submitButton}
              onClick={openDeleteRequestDialog}
              variant="outlined"
              color="error"
            >
              Supprimer idée
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
    </ModalTemplate>
  );
}
