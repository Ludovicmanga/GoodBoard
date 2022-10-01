import { FeatureRequestsContainer } from '../components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer';
import React from 'react'

type Props = {}

const UserFeatureRequests = (props: Props) => {
  return (
    <FeatureRequestsContainer requestAuthorType = 'user' />
  )
}

export default UserFeatureRequests