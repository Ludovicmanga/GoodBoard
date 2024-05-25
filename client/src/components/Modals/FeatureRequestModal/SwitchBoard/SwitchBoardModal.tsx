import React, { useEffect, useState } from "react";
import ModalTemplate from "../../ModalTemplate/ModalTemplate";
import CreationPage from "../../../../pages/CreationPage/CreationPage";
import ChooseBoardMenu from "../../../../pages/ChooseBoard/ChooseBoard";
import { SwitchBoardForm } from "../../../../pages/ChooseBoard/SwitchBoardForm/SwitchBoardForm";
import CreateBoardModal from "../../../CreateBoardModal/CreateBoardModal";
import { useMediaQuery } from "@mui/material";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const SwitchBoardModal = (props: Props) => {
  const [mode, setMode] = useState<"choose" | "create">("choose");
  useEffect(() => {
    if (props.modalIsOpen) {
      setMode("choose");
    }
  }, [props.modalIsOpen]);
  const bigScreen = useMediaQuery("(min-width: 40rem)");

  return (
    <ModalTemplate {...props} maxHeight="98%" width={bigScreen ? "40%" : "95%"}>
      {mode === "choose" ? (
        <SwitchBoardForm handleCreate={() => setMode("create")} />
      ) : (
        <CreateBoardModal />
      )}
    </ModalTemplate>
  );
};

export default SwitchBoardModal;
