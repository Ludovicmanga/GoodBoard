import NewFeatureRequestsButton from "../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FeatureRequestBox from "../../components/FeatureRequestBox/FeatureRequestBox";
import { EmptyPageType, FeatureRequest, FilterType } from "../../helpers/types";
import React, { useEffect, useState } from "react";
import EmptyData from "../../components/EmptyData/EmptyData";
import styles from "./FeatureRequests.module.scss";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import MainHero from "../../components/MainHero/MainHero";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  Badge,
  IconButton,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterList, Search, SwapVert } from "@mui/icons-material";
import { FilterPopover } from "../../components/FilterPopover/FilterPopover";
import { OrderPopover } from "../../components/OrderPopover/OrderPopover";
import { SexyBtn3 } from "../../components/SexyBtn3/SexyBtn3";
import { FeaturesLoadingSkeleton } from "../../components/FeaturesLoadingSkeleton/FeaturesLoadingSkeleton";
import { ContainerWIthThemeLinearGradient } from "../../components/ContainerWIthThemeLinearGradient/ContainerWIthThemeLinearGradient";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { SidebarNavBar } from "../../components/SidebarNavBar/SidebarNavBar";
import { ContentWithSidebar } from "../../components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

const FeatureRequests = (props: Props) => {
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [filteredFeatureRequests, setFilteredFeatureRequests] = useState<
    FeatureRequest[]
  >([]);

  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const allFeatureRequests = useAppSelector(
    (state) => state.allFeatureRequests
  );

  const [filterBtnAnchorEl, setFilterBtnAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const [orderBtnAnchorEl, setOrderBtnAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const [activeFiltersList, setActiveFiltersList] = useState<FilterType[]>([]);

  const [searchBtnIsClicked, setSearchBtnIsClicked] = useState(false);

  const bigScreen = useMediaQuery("(min-width: 40rem)");

  const handleFilterRequests = () => {
    const activeTopicFiltersList = activeFiltersList.filter(
      (filt) => filt.type === "topic"
    );
    const activeStatusFiltersList = activeFiltersList.filter(
      (filt) => filt.type === "status"
    );

    const filteredFR = allFeatureRequests.filter((featReq) => {
      const hasAllTheActiveTopics =
        activeTopicFiltersList.length > 0
          ? featReq.topics.length > 0 &&
            activeTopicFiltersList
              .map((top) => top._id)
              .every((topId) =>
                featReq.topics.map((top) => top._id).includes(topId)
              )
          : true;

      const hasTheActiveStatus =
        activeStatusFiltersList.length > 0
          ? featReq.status.toLowerCase() ===
            activeStatusFiltersList?.[0]?.label.toLowerCase()
          : true;

      return (
        featReq.title.toLowerCase().includes(searchedWord.toLowerCase()) &&
        (activeFiltersList.length > 0
          ? hasAllTheActiveTopics && hasTheActiveStatus
          : true)
      );
    });
    setFilteredFeatureRequests(filteredFR);
  };

  useEffect(() => {
    handleFilterRequests();
  }, [allFeatureRequests, searchedWord, activeFiltersList]);

  return (
    <ContentWithSidebar>
      <div
        className={
          filteredFeatureRequests.length > 0
            ? `${styles.container}`
            : `${styles.container} ${styles.emptyContainer}`
        }
      >
        {allFeatureRequests.length > 0 ? (
          <div className={styles.featuresSectionContainer}>
            <div className={styles.filterSectionContainer}>
              <Badge
                badgeContent={activeFiltersList.length}
                color="primary"
                overlap="circular"
              >
                <IconButton
                  size="small"
                  className={styles.filterIconBtn}
                  onClick={(e) => setFilterBtnAnchorEl(e.currentTarget)}
                  sx={{
                    bgcolor: activeFiltersList.length > 0 ? "#f7f9fd" : "",
                  }}
                >
                  <FilterList />
                  <div className={styles.filterIconText}>Filtrer</div>
                </IconButton>
              </Badge>
              <IconButton
                size="small"
                className={styles.filterIconBtn}
                onClick={(e) => setOrderBtnAnchorEl(e.currentTarget)}
              >
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
            <FilterPopover
              anchorEl={filterBtnAnchorEl}
              setAnchorEl={setFilterBtnAnchorEl}
              activeFiltersList={activeFiltersList}
              setActiveFiltersList={setActiveFiltersList}
            />
            <OrderPopover
              anchorEl={orderBtnAnchorEl}
              setAnchorEl={setOrderBtnAnchorEl}
            />

            {generalPropertiesState.featuresAreLoading ? (
              <FeaturesLoadingSkeleton />
            ) : filteredFeatureRequests.length > 0 ? (
              filteredFeatureRequests.map((featureRequest) => {
                return (
                  <div className={styles.featuresContainer}>
                    <FeatureRequestBox
                      key={featureRequest._id}
                      featureRequestProperties={featureRequest}
                    />
                  </div>
                );
              })
            ) : (
              <EmptyData
                title="Rien pour cette recherche"
                details="Change les critères de ta recherche"
                type={EmptyPageType.featureRequestsSearch}
              />
            )}
          </div>
        ) : (
          <div className={styles.emptyDataContainer}>
            <SexyBtn3 />
          </div>
        )}
        {allFeatureRequests.length > 0 && <NewFeatureRequestsButton />}
      </div>
    </ContentWithSidebar>
  );
};

export default FeatureRequests;
