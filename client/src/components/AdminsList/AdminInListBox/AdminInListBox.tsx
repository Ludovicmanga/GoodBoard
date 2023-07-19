import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import styles from "./AdminInListBox.module.scss";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  boardAdmin: {
    email: string;
    role: string;
  };
  handleChangeUserRole: (userEmail: string, role: string) => Promise<void>;
  handleDeleteAdmin: (userEmail: string) => Promise<void>;
};

const AdminInListBox = (props: Props) => {
  return (
    <>
      <div>{props.boardAdmin.email}</div>
      <FormControl size="small">
        <div>
          <Select
            value={props.boardAdmin.role}
            label="Role"
            onChange={(e) => props.handleChangeUserRole(props.boardAdmin.email, e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="member">Member</MenuItem>
          </Select>
        </div>
      </FormControl>
      <div className={styles.deleteBtnContainer} onClick={() => props.handleDeleteAdmin(props.boardAdmin.email)}>
        <AiOutlineDelete size={20} />
      </div>
    </>
  );
};

export default AdminInListBox;
