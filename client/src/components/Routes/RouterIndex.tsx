
import React, { useEffect, useState } from 'react';
import Home from '../../pages/Home';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import SignInPage from '../Log/SignInPage/SignInPage';
import SignUpPage from '../Log/SignUpPage/SignUpPage';
import { RoadMap } from '../../pages/RoadMap';
import { MenuChoiceNavBar } from '../MenuChoiceNavBarSection/MenuChoiceNavBar/MenuChoiceNavBar/MenuChoiceNavBar';
import SiteHeader from '../SiteHeader/SiteHeader';
import UserFeatureRequests from '../../pages/UserFeatureRequests';
import CompanyFeatureRequests from '../../pages/CompanyFeatureRequests';

type RouterIndexProps = { 

}

const RouterIndex: React.FC<RouterIndexProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState('Feature requests');
  const handleCurrentPage = (currentPageParam) => {
    setCurrentPage(() => currentPageParam)
  }

  return (
    <Router>
        <SiteHeader />
        <MenuChoiceNavBar currentPage={currentPage} />
        <Routes>
             <Route path="/" element = {<UserFeatureRequests />}/>
             <Route path="/company-feature-requests" element = {<CompanyFeatureRequests />}/>
             <Route path="/roadmap" element = {<RoadMap handleCurrentPage={handleCurrentPage} />}/>
             <Route path="/login" element = {<SignInPage />} />
             <Route path="/signUp" element = {<SignUpPage />} />
            <Route path="*" element = {<Navigate to="/" replace />} />
        </Routes>
    </Router>
  )
}

export default RouterIndex