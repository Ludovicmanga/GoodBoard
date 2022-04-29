import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type FeatureRequestBoxProps = {
    requestAuthorType: string
}

export const FeatureRequestBox: React.FC<FeatureRequestBoxProps> = ({ requestAuthorType }) => {
    return (
        <div className='featureRequestBox'>
            <div className='badge'>
                <FontAwesomeIcon icon={['fas', 'crown']} />
            </div>
            <div className='featureRequestBox--content'>
                <h2>Changer la taille du bouton</h2>
                <p>J'aimerais clairement que le bouton soit beaucoup, mais alors beaucoup plus gros... Ce serait génial</p>
                <p>Internet</p>
            </div>
            <div className='featureRequestBox--votesCountBox'>
                <a href='#'>
                <i className="fa-solid fa-angle-up icon" />
                </a>
                    <div>255</div>
                <a href='#'>
                    <i className="fa-solid fa-angle-down icon" />
                </a>
                
            </div>
        </div>
    )
}