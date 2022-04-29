import React, { useState } from 'react'
import { FeatureRequestsContainer } from '../components/FeatureRequest/FeatureRequestContainer/FeatureRequestsContainer';
import { UserOrCompanyRequestsToggleButton } from '../components/UserOrCompanyRequestsToggleButton/UserOrCompanyRequestsToggleButton'

const Home = () => {

  const [isToggled, setIsToggled] = useState(false);
  
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
    </div>
  )
}

export default Home
