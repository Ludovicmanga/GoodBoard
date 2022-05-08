import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { downVote, upVote } from '../../../actions/featureRequest.actions';

type FeatureRequestsBoxProps = {
    title: string,
    details: string,
    votes: number,
    featureRequestId: number
}

export const FeatureRequestsBox: React.FC<FeatureRequestsBoxProps> = ({ title, details, votes, featureRequestId }) => {
        const [isVoted, setIsVoted] = useState(false);
        const userData = useSelector((state: any) => state.userReducer);
        const dispatch: any = useDispatch();

        const handleToggleVote = (e) => {
            e.preventDefault();

            if (isVoted) {
                console.log('downvote')
                dispatch(downVote(featureRequestId, userData._id))
            } else {
                console.log('upvote')
                dispatch(upVote(featureRequestId, userData._id))
            }

            setIsVoted(() => !isVoted);
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
                        <div>{votes}</div>                        
                        { isVoted ? (
                            <i className="fa-solid fa-check icon"></i>
                        ) : (
                            <i className="fa-solid fa-angle-up icon" />
                        ) }
                    </div>
                </a>
            </div>
        );
}