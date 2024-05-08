import {
  Button,
  ButtonGroup,
  IconButton,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./ManageBoardModal.module.scss";
import ChooseBoardColor from "../../ChooseBoardColor/ChooseBoardColor";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import BoardIsPublicBtn from "../../BoardIsPublicBtn/BoardIsPublicBtn";
import AdminsListSection from "../../AdminsList/AdminsListSection/AdminsListSection";
import { BillingPlan, UserType } from "../../../helpers/types";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import { setActiveBoardData } from "../../../redux/features/activeBoardSlice";
import { PricingContainer } from "../../PricingContainer/PricingContainer";
import { capitalizeFirstLetter } from "../../../helpers/utils";
import { CheckBox, Create, Fingerprint } from "@mui/icons-material";
import { SexyCheckbox } from "../../SexyCheckbox/SexyCheckbox";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ManageBoardModal = (props: Props) => {
  const [boardNameInputClicked, setBoardNameInputClicked] = useState(false);
  const [boardDescriptionInputClicked, setBoardDescriptionInputClicked] =
    useState(false);
  const [websiteUrlInputClicked, setWebsiteUrlInputClicked] = useState(false);
  const [pricingBtnIsClicked, setPricingBtnIsClicked] = useState(false);

  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setBoardNameInputClicked(false);
    setBoardDescriptionInputClicked(false);
  }, [props.modalIsOpen]);

  return (
    <ModalTemplate
      modalIsOpen={props.modalIsOpen}
      handleClose={props.handleClose}
    >
      {pricingBtnIsClicked ? (
        <>
          <div onClick={() => setPricingBtnIsClicked(false)}>Return</div>
          <div>
            <PricingContainer />
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.sectionTitle}>Souscription actuelle</h2>
          <div className={styles.pricingSection}>
            <div className={styles.pricingText}>
              Votre souscription actuelle est le plan{" "}
              <span className={styles.currentPlan}>
                {activeBoardState.billingPlan === BillingPlan.free
                  ? "Gratuit"
                  : activeBoardState.billingPlan
                  ? capitalizeFirstLetter(activeBoardState.billingPlan)
                  : ""}
              </span>
            </div>
            <Button
              onClick={() => {
                setPricingBtnIsClicked(true);
              }}
              className={styles.choosePlanBtn}
              variant="contained"
            >
              Changer mon plan
            </Button>
          </div>
          <EditableInput
            name="Nom"
            inputValue={activeBoardState.name}
            inputIsClicked={boardNameInputClicked}
            setInputIsClicked={setBoardNameInputClicked}
            handleDispatchAction={(e) =>
              dispatch(
                setActiveBoardData({
                  name: e.target.value,
                })
              )
            }
          />
          <EditableInput
            name="Description"
            inputValue={activeBoardState.description}
            inputIsClicked={boardDescriptionInputClicked}
            setInputIsClicked={setBoardDescriptionInputClicked}
            handleDispatchAction={(e) =>
              dispatch(
                setActiveBoardData({
                  description: e.target.value,
                })
              )
            }
          />
          <EditableInput
            name="Site internet"
            inputValue={activeBoardState.websiteUrl}
            inputIsClicked={websiteUrlInputClicked}
            setInputIsClicked={setWebsiteUrlInputClicked}
            handleDispatchAction={(e) =>
              dispatch(
                setActiveBoardData({
                  websiteUrl: e.target.value,
                })
              )
            }
          />
          <h2 className={styles.sectionTitle}>Couleur du board</h2>
          <ChooseBoardColor mode="update" />
        </>
      )}
    </ModalTemplate>
  );
};

export default ManageBoardModal;

const EditableInput = (props: {
  name: string;
  inputValue: string;
  inputIsClicked: boolean;
  setInputIsClicked: (isClicked: boolean) => void;
  handleDispatchAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <h2 className={styles.sectionTitle}>{props.name}</h2>
      <div className={styles.boardIdentityInfo}>
        {/* {props.inputIsClicked ? (
          <TextField
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
            className={styles.boardIdentityInput}
            onChange={props.handleDispatchAction}
            value={props.inputValue}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => props.setInputIsClicked(false)}>
                  <CheckBox
                    sx={{
                      color: "#8ce99a",
                      fontSize: "2rem",
                    }}
                  />
                </IconButton>
              ),
            }}
          />
        ) : (
          <>
            <div>{props.inputValue}</div>
            <IconButton
              onClick={() => {
                props.setInputIsClicked(true);
              }}
            >
              <Create />
            </IconButton>
          </>
        )} */}
        <OutlinedInput
          autoFocus
          onFocus={(e) => e.currentTarget.select()}
          className={styles.boardIdentityInput}
          onChange={props.handleDispatchAction}
          value={props.inputValue}
          readOnly={!props.inputIsClicked}
          sx={
            props.inputIsClicked
              ? {}
              : {
                  "& fieldset": { border: "none" },
                }
          }
          fullWidth
          endAdornment={
            <IconButton
              onClick={() => props.setInputIsClicked(!props.inputIsClicked)}
            >
              {props.inputIsClicked ? (
                <CheckBox
                  sx={{
                    color: "#8ce99a",
                    fontSize: "2rem",
                  }}
                />
              ) : (
                <Create />
              )}
            </IconButton>
          }
        />
      </div>
    </>
  );
};
