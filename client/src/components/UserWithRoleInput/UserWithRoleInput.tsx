import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./UserWithRoleInput.module.scss";
import { UserType } from "../../helpers/types";
import { rolesList } from "../../helpers/constants";

type Props = {
  id: number;
  usersToInviteList: {
    id: number;
    email: string;
    role: UserType;
  }[];
  setUsersToInviteList: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        email: string;
        role: UserType;
      }[]
    >
  >;
};

const UserWithRoleInput = (props: Props) => {
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
          <MenuItem value={role}>{role}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default UserWithRoleInput;
