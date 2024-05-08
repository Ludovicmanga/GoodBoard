import NewFeatureRequestsButton from "../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FeatureRequestBox from "../../components/FeatureRequestBox/FeatureRequestBox";
import {
  BillingPlan,
  EmptyPageType,
  FeatureRequest,
  MenuSelected,
  UserType,
} from "../../helpers/types";
import React, { useEffect, useState } from "react";
import EmptyData from "../../components/EmptyData/EmptyData";
import styles from "./FeatureRequests.module.scss";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import MainHero from "../../components/MainHero/MainHero";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterFeatureRequestsSidebar from "../../components/FilterFeatureRequestsSidebar/FilterFeatureRequestsSidebar";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import { Chip, IconButton, ListItem, Popover } from "@mui/material";
import { Filter1, FilterList, Search, SwapVert } from "@mui/icons-material";
import { FilterPopover } from "../../components/FilterPopover/FilterPopover";

type Props = {};

const FeatureRequests = (props: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchedWord, setSearchedWord] = useState<string | null>(null);
  /*   const [filteredFeatureRequests, setFilteredFeatureRequests] = useState<
    FeatureRequest[]
  >([]); */
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const allFeatureRequests = useAppSelector(
    (state) => state.allFeatureRequests
  );
  /* 
  const dispatch = useAppDispatch();
  const menuSelectedState = useAppSelector(
    (state) => state.generalProperties.menuSelected
  ); */

  /*   const handleSetCorrespondingFeatures = () => {
    if (props.type === UserType.externalUser) {
      const featureRequestsWithCorrespondingPropsType =
        allFeatureRequests.filter(
          (featureRequest) =>
            featureRequest.creatorType === UserType.externalUser
        );
      setFilteredFeatureRequests(featureRequestsWithCorrespondingPropsType);
    } else {
      const featureRequestsWithCorrespondingPropsType =
        allFeatureRequests.filter(
          (featureRequest) =>
            featureRequest.creatorType !== UserType.externalUser
        );
      setFilteredFeatureRequests(featureRequestsWithCorrespondingPropsType);
    }
  };

  useEffect(() => {
    if (props.type === UserType.externalUser) {
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
  }, [menuSelectedState]); */
  /* 
  useEffect(() => {
    handleSetCorrespondingFeatures();
  }, [allFeatureRequests, props.type]); */

  const handleChangeSelectedStatus = (statusClicked: {
    label: string;
    btnColor: string;
  }) => {
    if (selectedStatus === statusClicked.label) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(statusClicked.label);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [searchBtnIsClicked, setSearchBtnIsClicked] = useState(false);

  return (
    <>
      <MainNavBar />
      <MainHero />
      {generalPropertiesState.featuresAreLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className={styles.container}>
          {allFeatureRequests.length > 0 ? (
            <div className={styles.featuresContainer}>
              <div className={styles.filterSectionContainer}>
                <IconButton
                  size="small"
                  className={styles.filterIconBtn}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <FilterList />
                  <div className={styles.filterIconText}>Filtrer</div>
                </IconButton>
                <IconButton size="small" className={styles.filterIconBtn}>
                  <SwapVert />
                  <div className={styles.filterIconText}>Trier</div>
                </IconButton>
                {searchBtnIsClicked ? (
                  <SearchBar
                    searchedWord={searchedWord}
                    setSearchBtnIsClicked={setSearchBtnIsClicked}
                    onSearch={(searchedWord) => setSearchedWord(searchedWord)}
                    placeholder="Chercher une idée..."
                  />
                ) : (
                  <IconButton
                    size="small"
                    className={styles.filterIconBtn}
                    onClick={() => setSearchBtnIsClicked(true)}
                  >
                    <Search />
                    <div className={styles.filterIconText}>Recherche</div>
                  </IconButton>
                )}
              </div>
              <FilterPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
              {allFeatureRequests
                .filter((featReq) => {
                  if (selectedTopic) {
                    return featReq.topics.includes(selectedTopic!);
                  } else {
                    return featReq;
                  }
                })
                .filter((featReq) => {
                  if (selectedStatus) {
                    return (
                      featReq.status.toLowerCase() ===
                      selectedStatus.toLowerCase()
                    );
                  } else {
                    return featReq;
                  }
                })
                .filter((featReq) => {
                  if (searchedWord) {
                    return featReq.title
                      .toLowerCase()
                      .includes(searchedWord.toLowerCase());
                  } else {
                    return featReq;
                  }
                })
                .map((featureRequest) => {
                  return (
                    <FeatureRequestBox
                      key={featureRequest._id}
                      featureRequestProperties={featureRequest}
                    />
                  );
                })}
            </div>
          ) : (
            <div className={styles.emptyDataContainer}>
              <EmptyData
                title="No feature request yet !"
                details="Setup your board with creative ideas"
                type={EmptyPageType.featureRequests}
              />
            </div>
          )}
        </div>
      )}
      {allFeatureRequests.length > 0 && (
        <NewFeatureRequestsButton
          numberOfFeatureRequests={allFeatureRequests.length}
        />
      )}
    </>
  );
};

export default FeatureRequests;
