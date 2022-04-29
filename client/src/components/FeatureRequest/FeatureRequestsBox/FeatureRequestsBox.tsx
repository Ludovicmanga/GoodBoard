import React, { useState } from 'react'

type FeatureRequestsBoxProps = {

}

export const FeatureRequestsBox: React.FC<FeatureRequestsBoxProps> = ({}) => {
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
                    <h2>Changer la taille du bouton</h2>
                    <p>J'aimerais clairement que le bouton soit beaucoup, mais alors beaucoup plus gros... Ce serait génial</p>
                    <p>Internet</p>
                </div>
                <a href="#" onClick={(e) => handleToggleVote(e)} className='featureRequestBox--votesCountBoxContainer'>
                    <div className='featureRequestBox--votesCountBox'>
                        <div>255</div>                        
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