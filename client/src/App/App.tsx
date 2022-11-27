import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { setAllFeatureRequests } from '../redux/features/allFeatureRequestsSlice';
import { useAppDispatch } from '../redux/hooks';
import Routes from '../Routes';
import './App.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const getAllUserFeatureRequests = async () => {
    const allUsersFeatureRequests = await axios({
      url: 'http://localhost:8080/feature-request/get/all'
    });
    return allUsersFeatureRequests.data;
  }

  useEffect(() => {
    const getAll = async () => {
      const allFeatureRequests = await getAllUserFeatureRequests();
      dispatch(setAllFeatureRequests(allFeatureRequests))
    }
    getAll();
  }, [])


  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
