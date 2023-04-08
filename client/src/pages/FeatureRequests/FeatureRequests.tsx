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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget, " is clicked");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PanoramaFishEyeIcon  sx={{
                      color: "#EB765D",
                      fontSize: 15,
                    }} />
                  </ListItemIcon>
                  <ListItemText>
                    <div className={styles.listItem}>Unassigned</div>
                  </ListItemText>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                  <PanoramaFishEyeIcon  sx={{
                      color: "#63C8D9",
                      fontSize: 15,
                    }} />
                  </ListItemIcon>
                  <ListItemText>
                    <div className={styles.listItem}>Assigned</div>
                  </ListItemText>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PanoramaFishEyeIcon  sx={{
                      color: "#1ab856",
                      fontSize: 15,
                    }} />
                    
                  </ListItemIcon>
                  <ListItemText>
                    <div className={styles.listItem}>Done</div>
                  </ListItemText>
                  <TiDelete size={22} color='grey' />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={() => setTopicsListOpen(!topicsListOpen)}>
              <ListItemText>
                <div className={styles.listItemButton}>Topics</div>
              </ListItemText>
            </ListItemButton>
            <Collapse in={topicsListOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <TagIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <div className={styles.listItem}>Change font</div>
                  </ListItemText>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <TagIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <div className={styles.listItem}>Faster website</div>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </div>
        <div className={styles.featuresSectionContainer}>
          <div className={styles.filterSectionContainer}>
            <div className={styles.filtersContainer}>
              <Button
                variant="outlined"
                onClick={handleClick}
                startIcon={<BiFilter size={27} />}
              >
                Filter
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <TextField fullWidth placeholder='Filter by value or topic' />
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <TagIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      <div className={styles.listItem}>Change font</div>
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <TagIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      <div className={styles.listItem}>Faster website</div>
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Popover>
            </div>
          </div>
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
