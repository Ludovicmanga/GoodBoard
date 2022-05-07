import React from 'react'
import { useSelector } from 'react-redux'
import { FeatureRequestsBox } from '../FeatureRequestsBox/FeatureRequestsBox'

type FeatureRequestsContainerProps = {
    requestAuthorType: string
}

export const FeatureRequestsContainer: React.FC<FeatureRequestsContainerProps> = ({ requestAuthorType }) => {
    const allCompanyFeatureRequests = useSelector((state: any) => state.allCompanyFeatureRequests);
    const allUserFeatureRequests = useSelector((state: any) => state.allUserFeatureRequests);

    if (requestAuthorType === 'user') {
        return (
            <FeatureRequestsBox />
        )
    } else if (requestAuthorType === 'company') {
        return (
            <FeatureRequestsBox />
        )
    }
    else return (
     <div>Problemo</div>   
    )
}