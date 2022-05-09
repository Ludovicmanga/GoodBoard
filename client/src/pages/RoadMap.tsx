import React from 'react'
import { useSelector } from 'react-redux'
import { FeatureRequestsBox } from '../components/FeatureRequest/FeatureRequestsBox/FeatureRequestsBox'

type RoadMapProps = {
    handleCurrentPage: (page: string) => void
}

export const RoadMap: React.FC<RoadMapProps> = ({ handleCurrentPage }) => {
        handleCurrentPage('Roadmap')
        const allFeatureRequests = useSelector((state: any) => state.allFeatureRequestsReducer);
        
        return (
            <div className='roadmap--container'>
                <div className='roadmap--planned-column roadmap-column'>
                <div className='roadmap-column--title-container roadmap--planned-column--title-container'>
                        <h2 className='roadmap-column--title'>Prévu</h2>
                        {
                            allFeatureRequests.map((featureRequest) => {
                                if (featureRequest.status === "planned") {
                                    return (
                                        <FeatureRequestsBox
                                            key = {featureRequest._id}
                                            title = {featureRequest.title}
                                            details = {featureRequest.details}
                                            votes = {featureRequest.voters.length}
                                            featureRequestId = {featureRequest._id}
                                            boxType = "roadmap"
                                        />
                                    )
                                }
                            })
                        }
                    </div>  
                </div>
                <div className='roadmap--in-progress-column roadmap-column'>
                    <div className='roadmap-column--title-container roadmap--in-progress-column--title-container'>
                        <h2 className='roadmap-column--title'>En cours</h2>
                    </div>
                    {
                        allFeatureRequests.map((featureRequest) => {
                            if (featureRequest.status === "in-progress") {
                                return (
                                    <FeatureRequestsBox
                                        key = {featureRequest._id}
                                        title = {featureRequest.title}
                                        details = {featureRequest.details}
                                        votes = {featureRequest.voters.length}
                                        featureRequestId = {featureRequest._id}
                                        boxType = "roadmap"
                                    />
                                )
                            } 
                        })
                    }
                </div>
                <div className='roadmap--done-column roadmap-column'>
                    <div className='roadmap-column--title-container roadmap--done-column--title-container'>
                        <h2 className='roadmap-column--title'>Terminé</h2>
                    </div>  
                    {
                        allFeatureRequests.map((featureRequest) => {
                            if (featureRequest.status === "done") {
                                return (
                                    <FeatureRequestsBox
                                        key = {featureRequest._id}
                                        title = {featureRequest.title}
                                        details = {featureRequest.details}
                                        votes = {featureRequest.voters.length}
                                        featureRequestId = {featureRequest._id}
                                        boxType = "roadmap"
                                    />
                                )
                            } 
                        })
                    }
                </div>
            </div>
        );
}