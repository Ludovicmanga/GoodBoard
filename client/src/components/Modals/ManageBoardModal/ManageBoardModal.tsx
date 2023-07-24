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
import BoardIsPublicBtn from "../../BoardIsPublicBtn/BoardIsPublicBtn";
import AdminsListSection from "../../AdminsList/AdminsListSection/AdminsListSection";
import { BillingPlan } from "../../../helpers/types";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ManageBoardModal = (props: Props) => {
  const [boardIsPublic, setBoardIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const activeBoardState = useAppSelector((state) => state.activeBoard);

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

  useEffect(() => {
    handleGetPublicStatus();
  }, [props.modalIsOpen]);

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
            {activeBoardState.billingPlan !== BillingPlan.free && (
              <>
                <h2 className={styles.sectionTitle}>Manage board users</h2>
                <AdminsListSection />
              </>
            )}
            {activeBoardState.billingPlan === BillingPlan.business && (
              <>
                <h2 className={styles.sectionTitle}>Manage board privacy</h2>
                <BoardIsPublicBtn
                  handleChangeBoardStatus={handleChangeBoardStatus}
                  boardIsPublic={boardIsPublic}
                  isLoading={isLoading}
                />
              </>
            )}

            <h2 className={styles.sectionTitle}>Choose your board color</h2>
            <ChooseBoardColor mode="update" />
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ManageBoardModal;
