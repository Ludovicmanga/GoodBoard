import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import FeatureRequests from '../pages/FeatureRequests/FeatureRequests';

export default function index() {
    return (
      <Router>
          <Routes>
              <Route path="/" element = {<FeatureRequests />}/>
              <Route path="/login" element = {<Login />} />
              <Route path="*" element = {<Navigate to="/" replace />} />
          </Routes>
      </Router>
    )
  }