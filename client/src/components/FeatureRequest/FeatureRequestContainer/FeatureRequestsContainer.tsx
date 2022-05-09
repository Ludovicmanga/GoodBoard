import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FeatureRequestsBox } from '../FeatureRequestsBox/FeatureRequestsBox'
import { isEmpty } from '../../Utils'

type FeatureRequestsContainerProps = {
    requestAuthorType: string
}

export const FeatureRequestsContainer: React.FC<FeatureRequestsContainerProps> = ({ requestAuthorType }) => {
    const allFeatureRequests = useSelector((state: any) => state.allFeatureRequestsReducer);

    if (isEmpty(allFeatureRequests)) {
        return <div>Pas encore de feature request</div>
    }

    if (requestAuthorType === 'user') {
        return allFeatureRequests.map((featureRequest) => {
            if(featureRequest.creatorType === 'user') {
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
        })

    } else if (requestAuthorType === "admin") {
        return allFeatureRequests.map((featureRequest) => {
            if (featureRequest.creatorType == "admin") {
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
        })
    }
    
    return null
}