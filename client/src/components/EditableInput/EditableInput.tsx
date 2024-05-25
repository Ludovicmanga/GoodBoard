import { CheckBox, Create } from "@mui/icons-material";
import { IconButton, OutlinedInput } from "@mui/material";
import styles from "./EditableInput.module.scss";
import { useState } from "react";

export const EditableInput = (props: {
  name: string;
  initialInputValue: string;
  inputIsClicked: boolean;
  setInputIsClicked: (isClicked: boolean) => void;
  onSubmit: (valueToEdit: string) => Promise<void>;
  placeholder: string;
  maxLength?: number;
}) => {
  const [inputValue, setInputValue] = useState(props.initialInputValue);

  return (
    <>
      <h2 className={styles.sectionTitle}>{props.name}</h2>
      <div className={styles.boardIdentityInfo}>
        <OutlinedInput
          placeholder={props.placeholder}
          className={styles.boardIdentityInput}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          readOnly={!props.inputIsClicked}
          sx={
            props.inputIsClicked
              ? {}
              : {
                  "& fieldset": { border: "none" },
                }
          }
          fullWidth
          inputProps={{ maxLength: props.maxLength }}
          endAdornment={
            <IconButton
              onClick={() => {
                props.setInputIsClicked(!props.inputIsClicked);
                if (props.inputIsClicked) {
                  props.onSubmit(inputValue);
                }
              }}
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
