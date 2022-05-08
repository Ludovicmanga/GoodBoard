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
                    <h2 className='roadmap-column--title'>Planned</h2>
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
                                    />
                                )
                            } 
                        })
                    }
                </div>
                <div className='roadmap--in-progress-column roadmap-column'>
                    <h2 className='roadmap-column--title'>In progress</h2>
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
                                    />
                                )
                            } 
                        })
                    }
                </div>
                <div className='roadmap--done-column roadmap-column'>
                    <h2 className='roadmap-column--title'>Done</h2>
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
                                    />
                                )
                            } 
                        })
                    }
                </div>
            </div>
        );
}