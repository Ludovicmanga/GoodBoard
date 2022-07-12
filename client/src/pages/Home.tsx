import { getUser } from '../actions/user.actions';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FeatureRequestsContainer } from '../components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer';
import { NewFeatureRequestModal } from '../components/NewFeatureRequest/NewFeatureRequestModal/NewFeatureRequestModal';
import { UserOrCompanyRequestsToggleButton } from '../components/UserOrCompanyRequestsToggleButton/UserOrCompanyRequestsToggleButton';

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
      <div className='site_catch_title_container'>
        <div className='site_catch_title_wrapper'>
          <p>
            <span className='site_catch_title_wrapper--text'>Vous avez des idées ?</span><i className="fa-regular fa-lightbulb site_catch_title_wrapper--icon site_catch_title_wrapper--bulbIcon"></i><br />
            <span className='site_catch_title_wrapper--text'>Nous vous écoutons ! </span><i className="fa-solid fa-ear-listen site_catch_title_wrapper--icon site_catch_title_wrapper--earIcon"></i>
          </p>
        </div>
      </div>
      
      <div className='UserOrCompanyRequestsToggleButton--container'>
        <div className='contextualText'>Vos idées</div>
        <UserOrCompanyRequestsToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
        <div className='contextualText'>Nos idées</div>
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