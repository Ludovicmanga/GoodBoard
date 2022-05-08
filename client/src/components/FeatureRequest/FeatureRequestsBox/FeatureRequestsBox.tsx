import React, { useState } from 'react'

type FeatureRequestsBoxProps = {
    title: string,
    details: string,
    votes: number
}

export const FeatureRequestsBox: React.FC<FeatureRequestsBoxProps> = ({ title, details, votes }) => {
        const [isVotted, setIsVotted] = useState(false);
        const handleToggleVote = (e) => {
            e.preventDefault();
            setIsVotted(() => !isVotted);
        }

        return (
            <div className='featureRequestBox'>
                <div className='badge'>
                    <i className="fa-solid fa-crown"></i>
                </div>
                <div className='featureRequestBox--content'>
                    <h2>{title}</h2>
                    <p>{details}</p>
                </div>
                <a href="#" onClick={(e) => handleToggleVote(e)} className='featureRequestBox--votesCountBoxContainer'>
                    <div className='featureRequestBox--votesCountBox'>
                        <div>5</div>                        
                        { isVotted ? (
                            <i className="fa-solid fa-check icon"></i>
                        ) : (
                            <i className="fa-solid fa-angle-up icon" />
                        ) }
                    </div>
                </a>
            </div>
        );
}