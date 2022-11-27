import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import React from 'react';
import FeatureRequests from '../pages/FeatureRequests/FeatureRequests';
import styles from './index.module.scss';
import Roadmap from '../pages/Roadmap/Roadmap';
import { UserType } from '../helpers/types';
import Login from '../components/Login/Login';

export default function index() {
    return (
     <div className={styles.superContainer}>
       <div className={styles.container}>
        <Router>
            <Routes>
                <Route path="/user-feature-requests" element = {<FeatureRequests type={UserType.user} />}/>
                <Route path="/login" element = {<Login />}/>
                <Route path="/company-feature-requests" element = {<FeatureRequests type={UserType.admin} />}/>
                <Route path="/roadmap" element = {<Roadmap />}/>
                <Route path="*" element = {<Navigate to="/user-feature-request" replace />} />
            </Routes>
        </Router>
      </div>
     </div>
    )
  }
