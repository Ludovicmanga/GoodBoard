import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/app.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getAllFeatureRequests } from './actions/featureRequest.actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)
store.dispatch(getAllFeatureRequests());

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);