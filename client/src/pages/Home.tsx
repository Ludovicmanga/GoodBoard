import { getUser } from '../actions/user.actions';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FeatureRequestsContainer } from '../components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer';
import { NewFeatureRequestModal } from '../components/NewFeatureRequest/NewFeatureRequestModal/NewFeatureRequestModal';

type HomeProps = {
  handleCurrentPage: (page: string) => void
}

export const Home: React.FC<HomeProps> = ({ handleCurrentPage }) => {
  handleCurrentPage('Feature requests');

  const [isToggled, setIsToggled] = useState(false);
  
  const [newFeatureRequestModalisOpen, setNewFeatureRequestModalisOpen] = useState(false);
  const handleCloseModal = (newFeatureRequestModalState) => {
    setNewFeatureRequestModalisOpen(() => newFeatureRequestModalState);
  }

  return (
    <div>
      <div className='UserOrCompanyRequestsToggleButton--container'>
      </div>
      {isToggled ? (
        <FeatureRequestsContainer requestAuthorType = 'admin' />
      ) : (
        <FeatureRequestsContainer requestAuthorType = 'user' />
      )}
      { newFeatureRequestModalisOpen && (
        <NewFeatureRequestModal handleCloseModal = {handleCloseModal} />
      ) }
      <div className='newFeatureRequestModalOpenButton--container'>
        <button className='newFeatureRequestModalOpenButton'
          onClick={() => setNewFeatureRequestModalisOpen(!newFeatureRequestModalisOpen)}>
          <i className="fa-solid fa-plus newFeatureRequestModalOpenButton--icon"></i>
          <div className='newFeatureRequestModalOpenButton--text'>Faire une proposition</div>
        </button>
      </div>
    </div>
  )
}

export default Home;