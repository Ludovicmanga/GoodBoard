import React from "react";
import BoardCreation from "../../../../pages/BoardCreation/BoardCreation";
import ModalTemplate from "../../ModalTemplate/ModalTemplate";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const SwitchBoardModal = (props: Props) => {
  return (
    <ModalTemplate {...props}>
      <BoardCreation pageMode="modal" />
    </ModalTemplate>
  );
};

export default SwitchBoardModal;
