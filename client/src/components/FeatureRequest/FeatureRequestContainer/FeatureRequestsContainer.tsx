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
    const allCompanyFeatureRequests = useSelector((state: any) => state.allCompanyFeatureRequests);
    const allUserFeatureRequests = useSelector((state: any) => state.allUserFeatureRequests);

    if (allCompanyFeatureRequests.error | allUserFeatureRequests.error) {
        return <div>erreur</div>
    }

    if (isEmpty(allCompanyFeatureRequests)) {
        return <div>erreur</div>
    }

    if (isEmpty(allUserFeatureRequests)) {
        return <div>erreur</div>
    }

    if (requestAuthorType === 'user') {
        return allUserFeatureRequests.map((userFeatureRequest) => {
            return (
                <FeatureRequestsBox
                    key = {userFeatureRequest._id}
                    title = {userFeatureRequest.title}
                    details = {userFeatureRequest.details}
                    votes = {userFeatureRequest.voters.length}
                />
            )
        })

    } else if (requestAuthorType === 'company') {
        return allCompanyFeatureRequests.map((companyFeatureRequest) => {
            return (
                <FeatureRequestsBox
                    key = {companyFeatureRequest._id}
                    title = {companyFeatureRequest.title}
                    details = {companyFeatureRequest.details}
                    votes = {companyFeatureRequest.voters.length}
                />
            )
        })
    }
    
    return null
}