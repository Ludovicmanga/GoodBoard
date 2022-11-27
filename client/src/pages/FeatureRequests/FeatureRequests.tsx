import NewFeatureRequestsButton from '../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton';
import { useAppSelector } from '../../redux/hooks';
import FeatureRequestBox from '../../components/FeatureRequestBox/FeatureRequestBox';
import { UserType } from '../../helpers/types';
import React from 'react';
import SiteMainHeader from '../../components/Sections/SiteMainHeader/SiteMainHeader';

type Props = {
  type: UserType;
}

const FeatureRequests = (props: Props) => {
  const allFeatureRequests = useAppSelector(state => state.allFeatureRequests);
  
  return (
    <>
      <SiteMainHeader />
      { allFeatureRequests.map(featureRequest => {
          if (featureRequest.creatorType === props.type) {
            return (
              <FeatureRequestBox key={featureRequest._id} featureRequestProperties={featureRequest} />
            )
          } else {
            return null;
          }
        }
      )}
      <NewFeatureRequestsButton />
    </>
  )
}

export default FeatureRequests