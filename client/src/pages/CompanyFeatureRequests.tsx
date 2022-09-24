import { FeatureRequestsContainer } from 'components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer'
import React from 'react'

type Props = {}

const CompanyFeatureRequests = (props: Props) => {
  return (
    <FeatureRequestsContainer requestAuthorType = 'admin' />
  )
}

export default CompanyFeatureRequests