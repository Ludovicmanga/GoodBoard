import RouterIndex from './components/Routes/RouterIndex';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from 'actions/user.actions';

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        "url": "http://localhost:5000/jwtid",
        withCredentials: true
      })
        .then(res => 
          {
            if (res.data.error) {
              console.log(res.data.error);
            } else {
              setUid(res.data);
            }
          })
        .catch(error => console.log("no token"))
      ;
    }
    fetchToken();
    if(uid)
      dispatch(getUser(uid))
  }, [uid, dispatch]);


  return (
    <>
      <RouterIndex />
    </>
  )
}

export default App