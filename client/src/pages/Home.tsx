import React, { useState } from 'react'
import { FeatureRequestBox } from '../components/FeatureRequest/FeatureRequestBox/FeatureRequestBox';
import { MenuChoiceNavBar } from '../components/MenuChoiceButton/MenuChoiceNavBar';
import { UserOrCompanyRequestsToggleButton } from '../components/UserOrCompanyRequestsToggleButton/UserOrCompanyRequestsToggleButton'

const Home = () => {

  const [isToggled, setIsToggled] = useState(false);
  
  return (
    <div>
      <MenuChoiceNavBar />
      <h2>Vous avez des idées ? Nous vous écoutons !</h2>
      <div className='UserOrCompanyRequestsToggleButton--container'>
        <div className='contextualText'>Vos idées</div>
        <UserOrCompanyRequestsToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
        <div className='contextualText'>Nos idées</div>
      </div>
      {isToggled ? (
        <FeatureRequestBox requestAuthorType = 'company' />
      ) : (
        <FeatureRequestBox requestAuthorType = 'user' />
      )}
    </div>
  )
}

export default Home
