import React, { useEffect, useState } from "react";
import styles from "./ShareBoardModal.module.scss";
import { Button, IconButton, OutlinedInput, Paper } from "@mui/material";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton/CopyToClipboardButton";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";
import { BillingPlan, UserType } from "../../../helpers/types";
import UserWithRoleInput from "../../UserWithRoleInput/UserWithRoleInput";
import { getBoardShareableUrl } from "../../../helpers/boards";
import { generateRandomId } from "../../../helpers/utils";
import ModalTemplate from "../ModalTemplate/ModalTemplate";

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

  const boardId = useAppSelector(
    (state) => state.generalProperties.activeBoard
  );
  const [boardUrl, setBoardUrl] = useState("");

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

  useEffect(() => {
    handleGetShareableUrl();
  }, [boardId]);

  useEffect(() => {
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

  return (
    <ModalTemplate {...props}>
      {activeBoardState.billingPlan !== BillingPlan.free && (
        <>
          <div className={styles.sectionTitle}>
            Invite new members to your board
          </div>
          <div
            className={`${styles.sectionContainer} ${styles.adminInviteSection}`}
          >
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
              <Button
                variant="contained"
                onClick={sendAdminInvitations}
                sx={{
                  width: "85%",
                }}
              >
                Send invites
              </Button>
            </div>
          </div>
        </>
      )}

      <div
        className={`${styles.sectionTitle} ${styles.shareBoardSectionTitle}`}
      >
        Share your board with the world
      </div>
      <div className={styles.sectionContainer}>
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
      </div>
    </ModalTemplate>
  );
};

export default ShareBoardModal;
