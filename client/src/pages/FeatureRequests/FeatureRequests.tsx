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
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import { Badge, Box, IconButton, Skeleton, useTheme } from "@mui/material";
import { FilterList, Search, SwapVert } from "@mui/icons-material";
import { FilterPopover } from "../../components/FilterPopover/FilterPopover";
import { OrderPopover } from "../../components/OrderPopover/OrderPopover";
import { orderAllFeatureRequests } from "../../redux/features/allFeatureRequestsSlice";

type Props = {};

const FeatureRequests = (props: Props) => {
  const [searchedWord, setSearchedWord] = useState<string | null>(null);
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

  const handleFilterRequests = () => {
    console.log("is it changing??", allFeatureRequests);
    const activeTopicFiltersList = activeFiltersList.filter(
      (filt) => filt.type === "topic"
    );
    const activeStatusFiltersList = activeFiltersList.filter(
      (filt) => filt.type === "status"
    );

    const filteredFR = allFeatureRequests.filter((featReq) => {
      const hasAllTheActiveTopics = featReq.topics
        .map((top) => top._id)
        .every((topId) =>
          activeTopicFiltersList.map((top) => top._id).includes(topId)
        );

      const hasTheActiveStatus =
        featReq.status.toLowerCase() ===
        activeStatusFiltersList?.[0]?.label.toLowerCase();

      if (searchedWord) {
        return (
          featReq.title.toLowerCase().includes(searchedWord.toLowerCase()) &&
          (activeFiltersList.length > 0
            ? hasAllTheActiveTopics && hasTheActiveStatus
            : true)
        );
      } else {
        return featReq;
      }
    });
    setFilteredFeatureRequests(filteredFR);
  };

  useEffect(() => {
    handleFilterRequests();
  }, [allFeatureRequests, searchedWord, activeFiltersList]);

  return (
    <>
      <MainNavBar />
      <MainHero />
      <div className={styles.container}>
        {allFeatureRequests.length > 0 ? (
          <div className={styles.featuresContainer}>
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
                  <>
                    <FeatureRequestBox
                      key={featureRequest._id}
                      featureRequestProperties={featureRequest}
                    />
                  </>
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
            <EmptyData
              title="Pas encore d'idées !"
              details="Propose des idées, et elles apparaitront ici"
              type={EmptyPageType.featureRequests}
            />
          </div>
        )}
      </div>
      {allFeatureRequests.length > 0 && (
        <NewFeatureRequestsButton
          numberOfFeatureRequests={allFeatureRequests.length}
        />
      )}
    </>
  );
};

export default FeatureRequests;

const FeaturesLoadingSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        height={150}
        sx={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        variant="rounded"
        height={150}
        sx={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        variant="rounded"
        height={150}
        sx={{
          marginBottom: "1rem",
        }}
      />
    </>
  );
};
