import React from 'react'
import Hero from '../Hero/Hero'
import MainNavBar from '../MainNavBar'

type Props = {}

const SiteHeader = (props: Props) => {
  return (
    <div className='siteHeader'>
        <MainNavBar />
        <Hero />
    </div>
  )
}

export default SiteHeader