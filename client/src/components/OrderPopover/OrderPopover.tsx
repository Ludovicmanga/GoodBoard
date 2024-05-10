import { IconButton, List, ListItemButton, useTheme } from "@mui/material";
import { StyledPopover } from "../StyledPopover/StyledPopover";
import styles from "./OrderPopover.module.scss";
import { FaStar } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { ReactNode, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { orderAllFeatureRequests } from "../../redux/features/allFeatureRequestsSlice";

export const OrderPopover = (props: {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}) => {
  const theme = useTheme();
  return (
    <StyledPopover anchorEl={props.anchorEl} setAnchorEl={props.setAnchorEl}>
      <List
        sx={{
          "&& .Mui-selected": {
            bgcolor: theme.palette.secondary.light,
          },
        }}
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItemBtn sortMode="votes" icon={<FaStar />} text="Plus votées" />
        <ListItemBtn
          sortMode="time"
          icon={<AiFillClockCircle />}
          text="Plus récentes"
        />
      </List>
    </StyledPopover>
  );
};

const ListItemBtn = (props: {
  sortMode: "time" | "votes";
  icon: ReactNode;
  text: string;
}) => {
  const dispatch = useAppDispatch();

  const handleSortFeatureRequests = (mode: "time" | "votes") => {
    dispatch(
      orderAllFeatureRequests({
        mode,
      })
    );
  };
  const [selected, setSelected] = useState(false);
  const handleSetSelected = () => {
    setSelected(true);
    handleSortFeatureRequests(props.sortMode);
    setTimeout(() => {
      setSelected(false);
    }, 1000);
  };

  return (
    <ListItemButton
      selected={selected}
      className={styles.listItemBtn}
      onClick={handleSetSelected}
    >
      <IconButton className={styles.iconBtn}>{props.icon}</IconButton>
      <div>{props.text}</div>
    </ListItemButton>
  );
};
