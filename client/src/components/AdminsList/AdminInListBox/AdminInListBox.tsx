import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import styles from "./AdminInListBox.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { rolesList } from "../../../helpers/constants";
import { capitalizeFirstLetter } from "../../../helpers/utils";

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
    <div className={styles.container}>
      <div className={styles.emailcontainer}>{props.boardAdmin.email}</div>
      <div>
        <Select
          size="small"
          value={props.boardAdmin.role}
          label="Role"
          onChange={(e) =>
            props.handleChangeUserRole(props.boardAdmin.email, e.target.value)
          }
        >
          {rolesList.map((role) => (
            <MenuItem value={role}>{capitalizeFirstLetter(role)}</MenuItem>
          ))}
        </Select>
      </div>
      <div
        className={styles.deleteBtnContainer}
        onClick={() => props.handleDeleteAdmin(props.boardAdmin.email)}
      >
        <AiOutlineDelete size={20} />
      </div>
    </div>
  );
};

export default AdminInListBox;
