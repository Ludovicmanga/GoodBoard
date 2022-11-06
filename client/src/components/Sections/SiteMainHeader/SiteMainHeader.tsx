import React from 'react'
import MainHero from '../../MainHero/MainHero'
import MainNavBar from '../../MainNavBar/MainNavBar'
import MenuChoiceNavBar from '../../MenuChoiceNavBar/MenuChoiceNavBar'

type Props = {}

const SiteMainHeader = (props: Props) => {
  return (
    <>
        <MainNavBar />
        <MainHero />
        <MenuChoiceNavBar />
    </>
  )
}

export default SiteMainHeader