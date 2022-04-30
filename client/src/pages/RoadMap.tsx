import React from 'react'

type RoadMapProps = {
    handleCurrentPage: (page: string) => void
}

export const RoadMap: React.FC<RoadMapProps> = ({ handleCurrentPage }) => {
        handleCurrentPage('Roadmap')
        
        return (
            <div>Roadmap</div>
        );
}