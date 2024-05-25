import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./TrelloBoardsListModal.module.scss";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppDispatch } from "../../../redux/hooks";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
import ModalTemplate from "../ModalTemplate/ModalTemplate";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
  trelloBoardsList: {
    id: string;
    name: string;
    url: string;
    lists: {
      id: string;
      name: string;
      closed: boolean;
      idBoard: string;
      pos: number;
      subscribed: boolean;
      softLimit: null;
      status: null;
    }[];
    prefs: {
      backgroundImageScaled: {
        width: number;
        height: number;
        url: string;
      }[];
    };
  }[];
  cardTitle: string;
  cardDescription: string;
};

const TrelloBoardsListModal = (props: Props) => {
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [importIsLoading, setImportIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleCreateCard = async () => {
    setImportIsLoading(true);
    await axios({
      method: "POST",
      url: `${websiteUrl}/api/integration/createTrelloCards`,
      withCredentials: true,
      data: {
        listIds: selectedLists,
        cardTitle: props.cardTitle,
        cardDescription: props.cardDescription,
      },
    });
    setImportIsLoading(false);
    props.handleClose();
    dispatch(
      setGeneralProperties({
        mainSnackBar: {
          isOpen: true,
          message: "The cards were created successfully",
        },
      })
    );
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLists((currArray) => [...currArray, e.target.value]);
    } else {
      setSelectedLists((currArray) =>
        currArray.filter((listId) => listId !== e.target.value)
      );
    }
  };

  return (
    <ModalTemplate {...props}>
      {props.trelloBoardsList.length > 0 &&
        props.trelloBoardsList.map((board) => (
          <Accordion className={styles.boardBox}>
            <AccordionSummary>
              <div className={styles.AccordionSummaryContainer}>
                <div>
                  <img
                    className={styles.boardImg}
                    alt="img"
                    width="120px"
                    height="60px"
                    src={
                      board.prefs.backgroundImageScaled?.[7]?.url ||
                      "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/ce93429aac87cc055c860d77deaf6ef3/photo-1564603246466-2e05759d2753.jpg"
                    }
                  ></img>
                </div>
                <div className={styles.boardNameContainer}>{board.name}</div>
              </div>
            </AccordionSummary>
            {board.lists.map((listElement) => (
              <AccordionDetails>
                <div className={styles.detailBoxContainer}>
                  <div className={styles.checkBox}>
                    <Checkbox
                      onChange={(e) => handleCheck(e)}
                      value={listElement.id}
                    />
                  </div>
                  <div className={styles.detailBoxName}>{listElement.name}</div>
                </div>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      <LoadingButton
        loading={importIsLoading}
        onClick={handleCreateCard}
        variant="contained"
      >
        Import
      </LoadingButton>
    </ModalTemplate>
  );
};

export default TrelloBoardsListModal;
