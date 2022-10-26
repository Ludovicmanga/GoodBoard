import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import React from 'react';
import Login from '../components/Login/Login';
import MainHero from '../components/MainHero/MainHero';
import MainNavBar from '../components/MainNavBar/MainNavBar';
import MenuChoiceNavBar from '../components/MenuChoiceNavBar/MenuChoiceNavBar';
import FeatureRequests from '../pages/FeatureRequests/FeatureRequests';
import styles from './index.module.scss';
import Roadmap from '../pages/Roadmap/Roadmap';

export default function index() {
    return (
     <div className={styles.superContainer}>
       <div className={styles.container}>
        <Router>
            <MainNavBar />
            <MainHero />
            <MenuChoiceNavBar />
            <Routes>
                <Route path="/" element = {<FeatureRequests />}/>
                <Route path="/roadmap" element = {<Roadmap />}/>
                <Route path="/login" element = {<Login />} />
                <Route path="*" element = {<Navigate to="/" replace />} />
            </Routes>
        </Router>
      </div>
     </div>
    )
  }