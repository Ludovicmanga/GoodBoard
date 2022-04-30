import React from 'react'
import { FeatureRequestsBox } from '../FeatureRequestsBox/FeatureRequestsBox'

type FeatureRequestsContainerProps = {
    requestAuthorType: string
}

export const FeatureRequestsContainer: React.FC<FeatureRequestsContainerProps> = ({ requestAuthorType }) => {
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