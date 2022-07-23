
import React, { useEffect, useState } from 'react';
import Home from '../../pages/Home';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import MainNavBar from '../MainNavBar';
import SignInPage from '../Log/SignInPage/SignInPage';
import SignUpPage from '../Log/SignUpPage/SignUpPage';
import { RoadMap } from '../../pages/RoadMap';
import { MenuChoiceNavBar } from '../MenuChoiceNavBarSection/MenuChoiceNavBar/MenuChoiceNavBar/MenuChoiceNavBar';
import Hero from '../Hero/Hero';

type RouterIndexProps = { 

}

const RouterIndex: React.FC<RouterIndexProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState('Feature requests');
  const handleCurrentPage = (currentPageParam) => {
    setCurrentPage(() => currentPageParam)
  }

  return (
    <Router>
        <MainNavBar />
        <Hero />
        <MenuChoiceNavBar currentPage={currentPage} />
        <Routes>
             <Route path="/" element = {<Home handleCurrentPage={handleCurrentPage} />}/>
             <Route path="/roadmap" element = {<RoadMap handleCurrentPage={handleCurrentPage} />}/>
             <Route path="/login" element = {<SignInPage />} />
             <Route path="/signUp" element = {<SignUpPage />} />
            <Route path="*" element = {<Navigate to="/" replace />} />
        </Routes>
    </Router>
  )
}

export default RouterIndex