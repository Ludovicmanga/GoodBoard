import axios from 'axios';
import React, { useState } from 'react'
import { FeatureRequestsContainer } from '../components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer';
import { NewFeatureRequestModal } from '../components/NewFeatureRequest/NewFeatureRequestModal/NewFeatureRequestModal';
import { UserOrCompanyRequestsToggleButton } from '../components/UserOrCompanyRequestsToggleButton/UserOrCompanyRequestsToggleButton'

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
      <h2>Vous avez des idées ? Nous vous écoutons !</h2>
      <div className='UserOrCompanyRequestsToggleButton--container'>
        <div className='contextualText'>Vos idées</div>
        <UserOrCompanyRequestsToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
        <div className='contextualText'>Nos idées</div>
      </div>
      {isToggled ? (
        <FeatureRequestsContainer requestAuthorType = 'company' />
      ) : (
        <FeatureRequestsContainer requestAuthorType = 'user' />
      )}
      { newFeatureRequestModalisOpen && (
        <NewFeatureRequestModal handleCloseModal = {handleCloseModal} />
      ) }
      <button className='newFeatureRequestModalOpenButton' onClick={() => setNewFeatureRequestModalisOpen(!newFeatureRequestModalisOpen)}>Nouvelle feature request</button>
    </div>
  )
}

export default Home;