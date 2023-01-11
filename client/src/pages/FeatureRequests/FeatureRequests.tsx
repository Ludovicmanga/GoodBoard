import NewFeatureRequestsButton from "../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FeatureRequestBox from "../../components/FeatureRequestBox/FeatureRequestBox";
import { EmptyPageType, MenuSelected, UserType } from "../../helpers/types";
import React, { useEffect } from "react";
import SiteMainHeader from "../../components/Sections/SiteMainHeader/SiteMainHeader";
import EmptyData from "../../components/EmptyData/EmptyData";
import styles from "./FeatureRequests.module.scss";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";

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

  return (
    <>
      <SiteMainHeader />
        {featureRequestsWithCorrespondingPropsType.length > 0 ? (
          <div className={styles.container}>
            {featureRequestsWithCorrespondingPropsType.map((featureRequest) => (
              <FeatureRequestBox
                key={featureRequest._id}
                featureRequestProperties={featureRequest}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyDataContainer}>
            <EmptyData
              text="No feature request yet"
              type={EmptyPageType.featureRequests}
            />
          </div>
        )}
      <NewFeatureRequestsButton />
    </>
  );
};

export default FeatureRequests;
