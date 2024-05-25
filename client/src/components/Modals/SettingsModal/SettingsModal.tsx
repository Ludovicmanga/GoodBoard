import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AiOutlineMail, AiFillBank } from "react-icons/ai";
import { Avatar, Button, Card, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
import {
  setEmail as setEmailRedux,
  setProfilePic,
} from "../../../redux/features/loggedUserSlice";
import { validateEmail } from "../../../helpers/utils";
import styles from "./SettingsModal.module.scss";
import {
  deleteUserProfilePictureApiCall,
  updateUserProfilePictureApiCall,
} from "../../../helpers/users";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import { EditableInput } from "../../EditableInput/EditableInput";
import { EditablePicture } from "../../EditablePicture/EditablePicture";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

export const SettingsModal = (props: Props) => {
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const [email, setEmail] = useState(loggedUser?.user?.email);
  const [wrongFormatEmail, setWrongFormatEmail] = useState<boolean>(false);
  const [emailErrorHelperText, setEmailErrorHelperText] = useState<string>("");
  const dispatch = useAppDispatch();

  const [emailInputIsClicked, setEmailInputIsClicked] = useState(false);

  const bigScreen = useMediaQuery("(min-width:40rem)");

  const handleOpenConfirmationEmailModifAlertDialog = async (
    newEmail: string
  ) => {
    dispatch(
      setGeneralProperties({
        dialogAlert: {
          isOpen: true,
          title: "Mettre à jour votre email",
          textDetails:
            "Êtes-vous sûr de vouloir mettre à jour votre adresse email ?",
          handleClose: () =>
            dispatch(
              setGeneralProperties({
                dialogAlert: null,
              })
            ),
          handleSubmit: () => handleChangeUserEmail(newEmail),
          submitBtnText: "mettre à jour email",
          submitBtnColor: "success",
        },
      })
    );
  };

  const handleChangeUserEmail = async (newEmail: string) => {
    if (newEmail) {
      const updatedEmailResponse = await axios({
        method: "post",
        url: `${websiteUrl}/api/users/update-email`,
        data: {
          updatedEmail: newEmail,
        },
        withCredentials: true,
      });
      if (updatedEmailResponse.data.updatedEmail) {
        if (newEmail) {
          dispatch(setEmailRedux(newEmail));
        }
        dispatch(
          setGeneralProperties({
            mainSnackBar: {
              isOpen: true,
              message: `Votre adresse mail a été mise à jour`,
            },
          })
        );
      }
    }
  };

  const handleUpdateProfilePic = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await updateUserProfilePictureApiCall(selectedFile, dispatch);
    }
  };

  const handleDeleteProfilePic = async () => {
    const res = await deleteUserProfilePictureApiCall();
    if (res) {
      dispatch(setProfilePic(""));
    }
  };

  useEffect(() => {
    if (props.modalIsOpen) {
      setEmail(loggedUser?.user?.email);
      setEmailInputIsClicked(false);
    }
  }, [props.modalIsOpen]);

  return (
    <ModalTemplate {...props} width={bigScreen ? "60%" : "95%"}>
      <EditableInput
        name="Adresse email"
        initialInputValue={email!}
        setInputIsClicked={setEmailInputIsClicked}
        inputIsClicked={emailInputIsClicked}
        placeholder="Ex: elon-musk@tesla.com"
        onSubmit={handleOpenConfirmationEmailModifAlertDialog}
      />
      <EditablePicture
        handleUpdate={handleUpdateProfilePic}
        handleDelete={handleDeleteProfilePic}
        name="Photo de profil"
        src={loggedUser?.user?.picture!}
        tooltipMessage="Taille conseillée : 300px sur 300px"
      />
    </ModalTemplate>
  );
};
