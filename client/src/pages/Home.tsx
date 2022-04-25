import React, { useState } from 'react'
import { MenuChoiceNavBar } from '../components/MenuChoiceNavBar/MenuChoiceNavBar'
import { UserOrCompanyRequestsToggleButton } from '../components/UserOrCompanyRequestsToggleButton/UserOrCompanyRequestsToggleButton'

const Home = () => {

  const [isToggled, setIsToggled] = useState(false);
  console.log(isToggled);
  
  return (
    <div>
      <UserOrCompanyRequestsToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
      <MenuChoiceNavBar />
    </div>
  )
}

export default Home
