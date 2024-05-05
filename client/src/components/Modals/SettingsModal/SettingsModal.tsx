import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AiOutlineMail, AiFillBank } from "react-icons/ai";
import { Avatar, Button, Card, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
import {
  setEmail as setEmailRedux,
  setLoggedUserState,
} from "../../../redux/features/loggedUserSlice";
import { validateEmail } from "../../../helpers/utils";
import styles from "./SettingsModal.module.scss";
import { FaPortrait } from "react-icons/fa";
import EmptyImage from "../../EmptyImage/EmptyImage";
import { updateUserProfilePictureApiCall } from "../../../helpers/users";
import { BsPencilFill } from "react-icons/bs";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import LikeBtn from "../../LikeBtn/LikeBtn";

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

  const handleChangeUserEmail = async () => {
    if (email) {
      if (validateEmail(email)) {
        const updatedEmailResponse = await axios({
          method: "post",
          url: `${websiteUrl}/api/users/update-email`,
          data: {
            updatedEmail: email,
          },
          withCredentials: true,
        });
        if (updatedEmailResponse.data.updatedEmail) {
          if (email) {
            dispatch(setEmailRedux(email));
          }
          dispatch(
            setGeneralProperties({
              mainSnackBar: {
                isOpen: true,
                message: `Email successfully updated`,
              },
            })
          );
        }
      } else {
        setWrongFormatEmail(true);
        setEmailErrorHelperText("Wrong email format");

        setTimeout(() => {
          setWrongFormatEmail(false);
          setEmailErrorHelperText("");
        }, 3000);
      }
    }
  };

  const handleUpdateProfilePic = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleChangeProfilePicture(selectedFile);
    }
  };

  const handleChangeProfilePicture = async (selectedFile: File) => {
    const response = await updateUserProfilePictureApiCall(selectedFile);
    if (response.data) {
      dispatch(
        setLoggedUserState({
          user: response.data,
        })
      );
    }
  };

  useEffect(() => {
    if (props.modalIsOpen) {
      setEmail(loggedUser?.user?.email);
    }
  }, [props.modalIsOpen]);

  return (
    <ModalTemplate {...props}>
      <div className={styles.settingSection}>
        <Card className={styles.settingIllustrationContainer}>
          <div className={styles.iconContainer}>
            <AiOutlineMail />
          </div>
          <div className={styles.iconSubtext}>Email</div>
        </Card>
        <TextField
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={wrongFormatEmail}
          helperText={emailErrorHelperText}
          fullWidth
          placeholder="Ex: elon-musk@tesla.com"
        />
      </div>
      <div className={styles.settingSection}>
        <Card className={styles.settingIllustrationContainer}>
          <div className={styles.iconContainer}>
            <FaPortrait />
          </div>
          <div className={styles.iconSubtext}>Picture</div>
        </Card>
        <div className={styles.changePictureBtn}>
          {loggedUser?.user?.picture ? (
            <div className={styles.userPicContainer}>
              <IconButton
                className={styles.penIconContainer}
                aria-label="upload picture"
                component="label"
              >
                <input
                  onChange={handleUpdateProfilePic}
                  hidden
                  accept="image/*"
                  type="file"
                />
                <BsPencilFill className={styles.penIcon} size={16} />
              </IconButton>
              <Avatar src={loggedUser?.user?.picture} variant="rounded" />
            </div>
          ) : (
            <EmptyImage
              handleUploadedImage={handleChangeProfilePicture}
              height={30}
              width={30}
            />
          )}
        </div>
      </div>
      <Button
        className={styles.submitButton}
        onClick={handleChangeUserEmail}
        variant="contained"
      >
        Save
      </Button>
    </ModalTemplate>
  );
};
