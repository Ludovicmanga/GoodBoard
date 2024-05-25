import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import styles from "./FilterFeatureRequestsSidebar.module.scss";
import TagIcon from "@mui/icons-material/Tag";
import { TiDelete } from "react-icons/ti";
import { useAppSelector } from "../../redux/hooks";
import { BillingPlan } from "../../helpers/types";
import { topicsList } from "../../helpers/constants";

const statusChoices = [
  {
    label: "Non assigné",
    btnColor: "#EB765D",
  },
  {
    label: "Assigné",
    btnColor: "#63C8D9",
  },
  {
    label: "Fait",
    btnColor: "#1ab856",
  },
];

type Props = {
  selectedTopic: string | null;
  setSelectedTopic: React.Dispatch<React.SetStateAction<string | null>>;
  selectedStatus: string | null;
  handleChangeSelectedStatus: (statusClicked: {
    label: string;
    btnColor: string;
  }) => void;
};

const FilterFeatureRequestsSidebar = (props: Props) => {
  const [statusListOpen, setStatusListOpen] = useState(true);
  const [topicsListOpen, setTopicsListOpen] = useState(true);
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  const handleChangeSelectedTopic = (featureCategoryChoice: string) => {
    if (props.selectedTopic === featureCategoryChoice) {
      props.setSelectedTopic(null);
    } else {
      props.setSelectedTopic(featureCategoryChoice);
    }
  };

  return (
    <List>
      {activeBoardState.billingPlan === BillingPlan.business && (
        <>
          <ListItemButton onClick={() => setStatusListOpen(!statusListOpen)}>
            <ListItemText>
              <div className={styles.listItemButton}>Status</div>
            </ListItemText>
          </ListItemButton>
          <Collapse in={statusListOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {statusChoices.map((statusChoice) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => props.handleChangeSelectedStatus(statusChoice)}
                  key={statusChoice.label}
                >
                  <ListItemIcon>
                    <PanoramaFishEyeIcon
                      sx={{
                        color: statusChoice.btnColor,
                        fontSize: 15,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <div className={styles.listItem}>{statusChoice.label}</div>
                  </ListItemText>
                  {props.selectedStatus === statusChoice.label && (
                    <TiDelete size={22} color="grey" />
                  )}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      )}
      <ListItemButton onClick={() => setTopicsListOpen(!topicsListOpen)}>
        <ListItemText>
          <div className={styles.listItemButton}>Topics</div>
        </ListItemText>
      </ListItemButton>
      <Collapse in={topicsListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {topicsList.map((topicChoice) => (
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => handleChangeSelectedTopic(topicChoice)}
              key={topicChoice}
            >
              <ListItemIcon>
                <TagIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <div className={styles.listItem}>{topicChoice}</div>
              </ListItemText>
              {props.selectedTopic === topicChoice && (
                <TiDelete size={22} color="grey" />
              )}
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default FilterFeatureRequestsSidebar;
