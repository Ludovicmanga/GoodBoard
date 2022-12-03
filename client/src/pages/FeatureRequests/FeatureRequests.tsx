import NewFeatureRequestsButton from '../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton';
import { useAppSelector } from '../../redux/hooks';
import FeatureRequestBox from '../../components/FeatureRequestBox/FeatureRequestBox';
import { UserType } from '../../helpers/types';
import React from 'react';
import SiteMainHeader from '../../components/Sections/SiteMainHeader/SiteMainHeader';
import EmptyData from '../../components/EmptyData/EmptyData';

type Props = {
  type: UserType;
}

const FeatureRequests = (props: Props) => {
  const allFeatureRequests = useAppSelector(state => state.allFeatureRequests);
  const featureRequestsWithCorrespondingPropsType = allFeatureRequests.filter(featureRequest => featureRequest.creatorType === props.type);
  
  
  return (
    <>
      <SiteMainHeader />
      { featureRequestsWithCorrespondingPropsType.length > 1 ? featureRequestsWithCorrespondingPropsType.map(featureRequest => 
        <FeatureRequestBox
          key={featureRequest._id}
          featureRequestProperties={featureRequest}
        />
      ) : (
        <EmptyData />
      )}
      <NewFeatureRequestsButton />
    </>
  )
}

export default FeatureRequests