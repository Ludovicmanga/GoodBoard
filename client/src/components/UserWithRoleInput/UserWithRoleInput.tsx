import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import React from "react";
import styles from "./UserWithRoleInput.module.scss";
import { UserType } from "../../helpers/types";
import { rolesList } from "../../helpers/constants";
import { Close } from "@mui/icons-material"; // Import the close icon
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
  id: string;
  usersToInviteList: {
    id: string;
    email: string;
    role: UserType;
  }[];
  setUsersToInviteList: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        email: string;
        role: UserType;
      }[]
    >
  >;
  handleAddNewUserToInvite: () => void;
};

const UserWithRoleInput = (props: Props) => {
  const handleDelete = () => {
    props.setUsersToInviteList((currArray) =>
      currArray.filter((item) => item.id !== props.id)
    );
  };
  const handleChangeAdminEmail = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    props.setUsersToInviteList((currArray) => {
      return currArray.map((userInArray) => {
        if (userInArray.id === props.id) {
          return { ...userInArray, email: e.target.value };
        }
        return userInArray;
      });
    });
  };

  const handleSelectedRole = (e: SelectChangeEvent<UserType>) => {
    props.setUsersToInviteList((currArray) => {
      return currArray.map((userInArray) => {
        if (userInArray.id === props.id) {
          return { ...userInArray, role: e.target.value as UserType };
        }
        return userInArray;
      });
    });
  };

  const foundAdmin = props.usersToInviteList.find(
    (userToInvite) => userToInvite.id === props.id
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <OutlinedInput
          placeholder="admin email"
          value={foundAdmin?.email}
          fullWidth
          onChange={handleChangeAdminEmail}
          size="small"
          className={styles.outlinedInput}
        />
        <Select
          value={foundAdmin?.role}
          fullWidth
          onChange={handleSelectedRole}
          size="small"
          className={`${styles.outlinedInput} ${styles.roleInput}`}
        >
          {rolesList.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.rightBtnContainer}>
        <IconButton
          size="small"
          onClick={props.handleAddNewUserToInvite}
          color="primary"
        >
          <AiOutlinePlusCircle size={25} />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleDelete}
          sx={{
            visibility:
              props.id === props.usersToInviteList[0].id ? "hidden" : "initial",
          }}
        >
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default UserWithRoleInput;
