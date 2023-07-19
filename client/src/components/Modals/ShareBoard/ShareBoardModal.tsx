import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styles from "./ShareBoardModal.module.scss";
import { Button, IconButton, OutlinedInput, Paper } from "@mui/material";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton/CopyToClipboardButton";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { UserType } from "../../../helpers/types";
import UserWithRoleInput from "../../UserWithRoleInput/UserWithRoleInput";
import { getBoardShareableUrl } from "../../../helpers/boards";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ShareBoardModal = (props: Props) => {
  const [usersToInviteList, setUsersToInviteList] = useState<
    {
      id: number;
      email: string;
      role: UserType;
    }[]
  >([
    {
      id: Math.floor(Math.random() * 10),
      email: "",
      role: UserType.member,
    },
  ]);

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
        id: Math.floor(Math.random() * 10),
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
          id: Math.floor(Math.random() * 10),
          email: "",
          role: UserType.member,
        },
      ])
    }
  }, [props.modalIsOpen])

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalIsOpen}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalIsOpen}>
          <Paper className={styles.modalContentContainer}>
            <div className={styles.sectionTitle}>
              Invite new members to your board
            </div>
            <div
              className={`${styles.sectionContainer} ${styles.adminInviteSection}`}
            >
              <div className={styles.inviteSectionLeft}>
                <div className={styles.adminInputsContainer}>
                  {usersToInviteList.map((userToInvite) => (
                    <UserWithRoleInput
                      key={userToInvite.id}
                      id={userToInvite.id}
                      setUsersToInviteList={setUsersToInviteList}
                      usersToInviteList={usersToInviteList}
                    />
                  ))}
                </div>
                <Button variant="contained" onClick={sendAdminInvitations}>
                  Send invites
                </Button>
              </div>
              <div className={styles.inviteSectionRight}>
                <IconButton aria-label="delete" onClick={handleAddNewUserToInvite} color="primary">
                  <AiOutlinePlusCircle
                    size={25}
                  />
                </IconButton>
              </div>
            </div>
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
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ShareBoardModal;
