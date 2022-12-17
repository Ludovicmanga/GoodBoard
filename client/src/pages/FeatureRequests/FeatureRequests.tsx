import NewFeatureRequestsButton from "../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton";
import { useAppSelector } from "../../redux/hooks";
import FeatureRequestBox from "../../components/FeatureRequestBox/FeatureRequestBox";
import { EmptyPageType, UserType } from "../../helpers/types";
import React from "react";
import SiteMainHeader from "../../components/Sections/SiteMainHeader/SiteMainHeader";
import EmptyData from "../../components/EmptyData/EmptyData";
import styles from "./FeatureRequests.module.scss";

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

  return (
    <div className={styles.container}>
      <SiteMainHeader />
      <div className={styles.mainContent}>
        {featureRequestsWithCorrespondingPropsType.length > 0 ? (
          featureRequestsWithCorrespondingPropsType.map((featureRequest) => (
            <FeatureRequestBox
              key={featureRequest._id}
              featureRequestProperties={featureRequest}
            />
          ))
        ) : (
          <div className={styles.emptyDataContainer}>
            <EmptyData
              text="No feature request yet"
              type={EmptyPageType.featureRequests}
            />
          </div>
        )}
        <NewFeatureRequestsButton />
      </div>
    </div>
  );
};

export default FeatureRequests;
