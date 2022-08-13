import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { downVote, upVote } from '../../../actions/featureRequest.actions';

type FeatureRequestsBoxProps = {
    title: string,
    details: string,
    votes: number,
    featureRequestId: number,
    boxType: string
}

export const FeatureRequestsBox: React.FC<FeatureRequestsBoxProps> = ({ title, details, votes, featureRequestId, boxType }) => {
        const [isVoted, setIsVoted] = useState(false);
        const userData = useSelector((state: any) => state.userReducer);
        const dispatch: any = useDispatch();

        const handleToggleVote = (e) => {
            e.preventDefault();

            if (isVoted) {
                dispatch(downVote(featureRequestId, userData._id))
            } else {
                dispatch(upVote(featureRequestId, userData._id))
            }

            setIsVoted(() => !isVoted);
        }

        return (
            <a href='#' className={boxType == "roadmap" ? "featureRequestBox featureRequestBox-roadmap" : "featureRequestBox"} onClick={(e) => {
                            e.preventDefault();
                        }}>
                <a href="#" onClick={(e) => handleToggleVote(e)} className='featureRequestBox--votesCountBoxContainer'>
                    { isVoted ? (
                        <div className='featureRequestBox--votesCountBox featureRequestBox--votesCountBox-voted'>
                            <i className="fa-solid fa-check icon"></i>
                            <div>{votes}</div>                        
                        </div>
                    ) : (
                        <div className='featureRequestBox--votesCountBox featureRequestBox--votesCountBox-notVoted'>
                            <i className="fa-solid fa-angle-up icon" />
                            <div>{votes}</div>                      
                        </div>
                    )}
                </a>
                <div className='featureRequestBox--content-wrapper'>
                    <div className='featureRequestBox--content'>
                        <h2>{title}</h2>
                        <p>{details}</p>
                    </div>
                </div>
            </a>
        );
}