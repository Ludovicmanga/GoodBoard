import React from 'react'
import { useSelector } from 'react-redux'
import { FeatureRequestsBox } from '../FeatureRequestsBox/FeatureRequestsBox'
import { isEmpty } from '../../Utils'

type FeatureRequestsContainerProps = {
    requestAuthorType: string
}

export const FeatureRequestsContainer: React.FC<FeatureRequestsContainerProps> = ({ requestAuthorType }) => {
    const allFeatureRequests = useSelector((state: any) => state.allFeatureRequestsReducer);

    return (
        <div className='featureRequestsContainer'>
            { isEmpty(allFeatureRequests) && (
                <div>Pas encore de feature request</div>
            ) }
            { allFeatureRequests.error && (
                <div>{allFeatureRequests.error}</div>
            ) }
            { !isEmpty(allFeatureRequests) && allFeatureRequests.map( featureRequest => {
                if(featureRequest.creatorType === requestAuthorType) {
                    return (
                        <FeatureRequestsBox
                            key = {featureRequest._id}
                            title = {featureRequest.title}
                            details = {featureRequest.details}
                            votes = {featureRequest.voters.length}
                            featureRequestId = {featureRequest._id}
                            boxType = "homePage"
                        />
                    )
                }
            } )}
        </div>
    )
}