
import React from 'react';
import Home from '../../pages/Home';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import MainNavBar from '../MainNavBar';
import SignInPage from '../Log/SignInPage/SignInPage';
import SignUpPage from '../Log/SignUpPage/SignUpPage';

export default function index() {
  return (
    <Router>
        <MainNavBar />
        <Routes>
             <Route path="/" element = {<Home />}/>
             <Route path="/login" element = {<SignInPage />} />
             <Route path="/signUp" element = {<SignUpPage />} />
            <Route path="*" element = {<Navigate to="/" replace />} />
        </Routes>
    </Router>
  )
}