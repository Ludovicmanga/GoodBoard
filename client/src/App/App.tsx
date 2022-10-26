import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { AxiosInst } from '../helpers/axiosinstance';
import Routes from '../Routes';
import './App.module.scss';

function App() {
  const getAllUserFeatureRequests = async () => {
    const allUsersFeatureRequests = await axios.get('http://localhost:8080/feature-request/get/all');
    console.log(allUsersFeatureRequests, ' is all the feature requests')
  }
  useEffect(() => {
    getAllUserFeatureRequests();
  }, []);

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
