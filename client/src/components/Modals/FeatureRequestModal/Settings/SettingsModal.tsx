import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useAppSelector } from "../../../../redux/hooks";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

export const SettingsModal = (props: Props) => {
  const loggedUser = useAppSelector(state => state.loggedUser);

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
          <Box sx={style}>
            <div>
                Email :
            </div>
            {loggedUser?.user?.email}
            <div>
                Company
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
