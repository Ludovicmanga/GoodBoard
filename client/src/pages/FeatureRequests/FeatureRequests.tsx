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

type Props = {
  type: UserType;
};

const FeatureRequests = (props: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchedWord, setSearchedWord] = useState<string | null>(null);
  const [filteredFeatureRequests, setFilteredFeatureRequests] = useState<
    FeatureRequest[]
  >([]);
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  const allFeatureRequests = useAppSelector(
    (state) => state.allFeatureRequests
  );

  const dispatch = useAppDispatch();
  const menuSelectedState = useAppSelector(
    (state) => state.generalProperties.menuSelected
  );

  const handleSetCorrespondingFeatures = () => {
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
  }, [menuSelectedState]);

  useEffect(() => {
    if (allFeatureRequests.length > 0) {
      handleSetCorrespondingFeatures();
    }
  }, [allFeatureRequests, props.type]);

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

  return (
    <>
      <MainNavBar />
      <MainHero />
      <div
        className={
          activeBoardState.billingPlan === BillingPlan.free
            ? `${styles.sectionContainer} ${styles.sectionContainerWithoutNavBar}`
            : styles.sectionContainer
        }
      >
        {activeBoardState.billingPlan !== BillingPlan.free && (
          <div className={styles.sidebarContainer}>
            <FilterFeatureRequestsSidebar
              setSelectedTopic={setSelectedTopic}
              handleChangeSelectedStatus={handleChangeSelectedStatus}
              selectedTopic={selectedTopic}
              selectedStatus={selectedStatus}
            />
          </div>
        )}
        <div
          className={
            filteredFeatureRequests.length > 0
              ? styles.featuresSectionContainer
              : `${styles.featuresSectionContainer} ${styles.featuresSectionContainerEmpty}`
          }
        >
          {filteredFeatureRequests.length > 0 ? (
            <div className={styles.featuresContainer}>
              <SearchBar
                onSearch={(searchedWord) => setSearchedWord(searchedWord)}
              />

              {filteredFeatureRequests
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
      </div>
      {filteredFeatureRequests.length > 0 && (
        <NewFeatureRequestsButton
          numberOfFeatureRequests={filteredFeatureRequests.length}
        />
      )}
    </>
  );
};

export default FeatureRequests;
