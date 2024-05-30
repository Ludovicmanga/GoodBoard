import React, { useEffect, useState } from "react";
import styles from "./ShareBoardModal.module.scss";
import {
  Button,
  IconButton,
  OutlinedInput,
  Paper,
  useMediaQuery,
} from "@mui/material";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton/CopyToClipboardButton";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";
import { BillingPlan, UserType } from "../../../helpers/types";
import UserWithRoleInput from "../../UserWithRoleInput/UserWithRoleInput";
import { getBoardShareableUrl } from "../../../helpers/boards";
import { generateRandomId } from "../../../helpers/utils";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import AdminsListSection from "../../AdminsList/AdminsListSection/AdminsListSection";
import BoardIsPublicBtn from "../../BoardIsPublicBtn/BoardIsPublicBtn";
import { SlQuestion } from "react-icons/sl";
import { QuestionMarkWithTooltip } from "../../QuestionMarkWithTooltip/QuestionMarkWithTooltip";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ShareBoardModal = (props: Props) => {
  const [usersToInviteList, setUsersToInviteList] = useState<
    {
      id: string;
      email: string;
      role: UserType;
    }[]
  >([
    {
      id: generateRandomId(10),
      email: "",
      role: UserType.member,
    },
  ]);
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const [boardIsPublic, setBoardIsPublic] = useState(false);

  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const handleGetPublicStatus = async () => {
    const response = await axios({
      method: "post",
      url: `${websiteUrl}/api/board/get-public-status`,
      withCredentials: true,
      data: { activeBoard: generalPropertiesState.activeBoard },
    });
    if (response.data) {
      setBoardIsPublic(response.data);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [boardUrl, setBoardUrl] = useState("");

  const boardId = useAppSelector(
    (state) => state.generalProperties.activeBoard
  );

  const sendAdminInvitations = async () => {
    const response = await axios({
      method: "post",
      url: `${websiteUrl}/api/board/invite-users`,
      withCredentials: true,
      data: { usersToInviteList, boardId },
    });
    if (response.data) {
      props.handleClose();
    }
  };

  const handleSetBoardUrl = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBoardUrl(e.target.value);
  };

  const handleGetShareableUrl = async () => {
    if (boardId) {
      const url = await getBoardShareableUrl(boardId);
      if (url) {
        setBoardUrl(url);
      }
    }
  };

  const handleAddNewUserToInvite = () => {
    setUsersToInviteList((currArray) => [
      ...currArray,
      {
        id: generateRandomId(10),
        email: "",
        role: UserType.member,
      },
    ]);
  };

  const handleChangeBoardStatus = async (event: boolean) => {
    setIsLoading(true);
    const response = await axios({
      method: "post",
      url: `${websiteUrl}/api/board/update-public-status`,
      withCredentials: true,
      data: {
        publicStatus: event,
        activeBoard: generalPropertiesState.activeBoard,
      },
    });
    setIsLoading(false);
    if (response.data !== null && response.data !== undefined) {
      setBoardIsPublic(response.data);
    }
  };

  useEffect(() => {
    handleGetShareableUrl();
  }, [boardId]);

  useEffect(() => {
    handleGetPublicStatus();
    if (!props.modalIsOpen) {
      setUsersToInviteList([
        {
          id: generateRandomId(10),
          email: "",
          role: UserType.member,
        },
      ]);
    }
  }, [props.modalIsOpen]);

  const bigScreen = useMediaQuery("(min-width: 40rem)");

  return (
    <ModalTemplate {...props} width={bigScreen ? "50%" : "99%"}>
      {activeBoardState.billingPlan !== BillingPlan.free && (
        <>
          <h2 className={styles.sectionTitle}>Utilisateurs & équipe</h2>
          <AdminsListSection />
        </>
      )}
      {activeBoardState.billingPlan !== BillingPlan.free && (
        <>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionTitleText}>
              Inviter de nouveaux utilisateurs
            </div>
            <QuestionMarkWithTooltip
              message={
                <>
                  <p>
                    Les admins peuvent changer l'aspect du board, et modifier
                    les paramètres critiques
                  </p>
                  <br />
                  <p>
                    Les membres peuvent voter sur toutes les fonctionnalités
                  </p>
                  <br />
                  <p>
                    Les membres externes peuvent accéder au board, mais pas
                    voter (utile si votre board est privé)
                  </p>
                </>
              }
            />
          </div>
          <div className={styles.adminInviteSection}>
            <div className={styles.adminInputsContainer}>
              {usersToInviteList.map((userToInvite) => (
                <UserWithRoleInput
                  key={userToInvite.id}
                  id={userToInvite.id}
                  setUsersToInviteList={setUsersToInviteList}
                  usersToInviteList={usersToInviteList}
                  handleAddNewUserToInvite={handleAddNewUserToInvite}
                />
              ))}
            </div>
            <div className={styles.btnContainer}>
              <Button variant="contained" onClick={sendAdminInvitations}>
                Envoyer les invitations
              </Button>
            </div>
          </div>
        </>
      )}

      <div className={styles.sectionTitle}>
        Partager votre board avec le monde
      </div>
      {activeBoardState.billingPlan === BillingPlan.business && (
        <BoardIsPublicBtn
          handleChangeBoardStatus={handleChangeBoardStatus}
          boardIsPublic={boardIsPublic}
          isLoading={isLoading}
        />
      )}
      <OutlinedInput
        value={boardUrl}
        fullWidth
        onChange={handleSetBoardUrl}
        size="small"
        readOnly={true}
        className={styles.outlinedInput}
        endAdornment={
          <div className={styles.CopyToClipboardButtonContainer}>
            <CopyToClipboardButton textToCopy={boardUrl} />
          </div>
        }
      />
    </ModalTemplate>
  );
};

export default ShareBoardModal;
