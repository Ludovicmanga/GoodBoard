import NewFeatureRequestsButton from "../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FeatureRequestBox from "../../components/FeatureRequestBox/FeatureRequestBox";
import { EmptyPageType, MenuSelected, UserType } from "../../helpers/types";
import React, { useEffect, useState } from "react";
import EmptyData from "../../components/EmptyData/EmptyData";
import styles from "./FeatureRequests.module.scss";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import MainHero from "../../components/MainHero/MainHero";
import TagIcon from "@mui/icons-material/Tag";
import { BiFilter } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";

type Props = {
  type: UserType;
};

const FeatureRequests = (props: Props) => {
  const allFeatureRequests = useAppSelector(
    (state) => state.allFeatureRequests
  );
  const featureRequestsWithCorrespondingPropsType = allFeatureRequests.filter(
    (featureRequest) => featureRequest.creatorType === props.type
  );
  const dispatch = useAppDispatch();
  const menuSelectedState = useAppSelector(
    (state) => state.generalProperties.menuSelected
  );

  const [statusListOpen, setStatusListOpen] = useState(true);
  const [topicsListOpen, setTopicsListOpen] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    if (props.type === UserType.user) {
      dispatch(
        setGeneralProperties({
          menuSelected: MenuSelected.yourIdeas,
        })
      );
    } else {
      dispatch(
        setGeneralProperties({
          menuSelected: MenuSelected.ourIdeas,
        })
      );
    }
  }, [menuSelectedState]);

  const statusChoices = [
    {
      label: "Unassigned",
      btnColor: "#EB765D",
    },
    {
      label: "Assigned",
      btnColor: "#63C8D9",
    },
    {
      label: "Done",
      btnColor: "#1ab856",
    },
  ];

  const featureCategoriesChoices = ["Change font", "Faster website"];

  return (
    <>
      <MainNavBar />
      <MainHero />
      <div className={styles.sectionContainer}>
        <div className={styles.sidebarContainer}>
          <List>
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
                    onClick={() => setSelectedStatus(statusChoice.label)}
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
                      <div className={styles.listItem}>
                        {statusChoice.label}
                      </div>
                    </ListItemText>
                    {selectedStatus === statusChoice.label && (
                      <TiDelete
                        size={22}
                        color="grey"
                        onClick={() => console.log("i was clicked")}
                      />
                    )}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            <ListItemButton onClick={() => setTopicsListOpen(!topicsListOpen)}>
              <ListItemText>
                <div className={styles.listItemButton}>Topics</div>
              </ListItemText>
            </ListItemButton>
            <Collapse in={topicsListOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {featureCategoriesChoices.map((featureCategoryChoice) => (
                  <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedTopic(featureCategoryChoice)}>
                    <ListItemIcon>
                      <TagIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      <div className={styles.listItem}>{featureCategoryChoice}</div>
                    </ListItemText>
                    {selectedTopic === featureCategoryChoice && (
                      <TiDelete
                        size={22}
                        color="grey"
                        onClick={() => console.log("i was clicked")}
                      />
                    )}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </div>
        <div className={styles.featuresSectionContainer}>
          {featureRequestsWithCorrespondingPropsType.length > 0 ? (
            <div className={styles.featuresContainer}>
              {featureRequestsWithCorrespondingPropsType.map(
                (featureRequest) => (
                  <FeatureRequestBox
                    key={featureRequest._id}
                    featureRequestProperties={featureRequest}
                  />
                )
              )}
            </div>
          ) : (
            <div className={styles.emptyDataContainer}>
              <EmptyData
                text="No feature request yet"
                type={EmptyPageType.featureRequests}
              />
            </div>
          )}
        </div>
      </div>
      <NewFeatureRequestsButton />
    </>
  );
};

export default FeatureRequests;
