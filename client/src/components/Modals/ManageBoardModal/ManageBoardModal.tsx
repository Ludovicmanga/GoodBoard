import {
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./ManageBoardModal.module.scss";
import ChooseBoardColor from "../../ChooseBoardColor/ChooseBoardColor";
import { AiOutlineDelete } from "react-icons/ai";
import { Switch } from "antd";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ManageBoardModal = (props: Props) => {
  const [boardIsPublic, setBoardIsPublic] = useState(false);
  const [role, setRole] = useState("admin");

  const generalPropertiesState = useAppSelector(state => state.generalProperties)

  const handleChangeBoardStatus = async (event: boolean) => {
    const response = await axios({
      method: "post",
      url: `${websiteUrl}/api/board/update-public-status`,
      withCredentials: true,
      data: { publicStatus: event, activeBoard: generalPropertiesState.activeBoard },
    });
    if (response.data !== null && response.data !== undefined ) {
      console.log('i set the data to ', response.data)
      setBoardIsPublic(response.data)
    }
  };

  const handleGetPublicStatus = async () => {
    const response = await axios({
      method: "post",
      url: `${websiteUrl}/api/board/get-public-status`,
      withCredentials: true,
      data: { activeBoard: generalPropertiesState.activeBoard },
    });
    console.log(response, ' is the res')
    if (response.data) {
      setBoardIsPublic(response.data)
    }
  }

  useEffect(() => {
    handleGetPublicStatus();
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
            <ChooseBoardColor mode="update" />
            <div>
              <div>Manage board users</div>
              <div className={styles.userRoleContainer}>
                <div>Ludovic@gmail.com</div>
                <FormControl size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="member">Member</MenuItem>
                  </Select>
                </FormControl>
                <div className={styles.deleteBtnContainer}>
                  <AiOutlineDelete />
                </div>
              </div>
            </div>
            <div className={styles.linkIsPublicContainer}>
              <div>
                {boardIsPublic ? "Board is public" : "Board is private"}
              </div>
              <Switch
                loading={false}
                checked={boardIsPublic}
                onChange={handleChangeBoardStatus}
              />
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ManageBoardModal;
