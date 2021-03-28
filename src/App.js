import './App.css';
import React from 'react';

//Creating store
 import {Provider} from 'react-redux';
 import {createStore,applyMiddleware} from 'redux';
 import appReducer from './reducer/reducer';

 // middleware thunk 
 import { apiMiddleware } from 'redux-api-middleware';
 import thunk from 'redux-thunk'; 

 import UserList from './usersList/UserList';
 
const store = createStore(appReducer, applyMiddleware(apiMiddleware, thunk)); 
 
function App(){
  return(
    <Provider store={store}>
      <UserList />
    </Provider>
  )
} 


export default App;
