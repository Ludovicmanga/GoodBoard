import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import React from 'react';
import FeatureRequests from '../pages/FeatureRequests/FeatureRequests';
import styles from './index.module.scss';
import Roadmap from '../pages/Roadmap/Roadmap';
import { AuthPageType, UserType } from '../helpers/types';
import Login from '../components/Login/Login';

export default function index() {
    return (
       <div className={styles.container}>
        <Router>
            <Routes>
                <Route path="/login" element = {<Login authType={AuthPageType.login} />}/>
                <Route path="/sign-up" element = {<Login authType={AuthPageType.signUp} />}/>
                <Route path="/company-feature-requests" element = {<FeatureRequests type={UserType.admin} />}/>
                <Route path="/user-feature-requests" element = {<FeatureRequests type={UserType.user} />}/>
                <Route path="/roadmap" element = {<Roadmap />}/>
                <Route path="*" element = {<Navigate to="/user-feature-requests" replace />} />
            </Routes>
        </Router>
      </div>
    )
  }
