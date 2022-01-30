import  'bootstrap/dist/css/bootstrap.min.css';
import  'bootstrap/dist/js/bootstrap.min';
import  './index.css';
import  '../src/assets/css/css.css';
import  '../src/assets/css/myStyle.css';
import  '../src/assets/fontawesome/css/pro.min.css';
import  '../src/assets/css/dashboard.css';
import $ from 'jquery';

import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppLayout from './App';
import {ConnectionContext} from './MyContext';
import { HubConnectionBuilder } from '@microsoft/signalr';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;


const Start = () =>{

  const [connection, setConnection] = useState(null);
 
  useEffect(()=>{
    const connection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_HUB_URL)
      .withAutomaticReconnect()
      .build();

      connection.start()
      .catch(e => console.log('Connection failed: ', e));

      setConnection(connection);

  },[])

  return(
     <Router>
        <ConnectionContext.Provider value={connection}>
          <Switch>
              <Route path="/" component={()=> <AppLayout/>}/>
          </Switch>
        </ConnectionContext.Provider>
     </Router>
  
  );
}


ReactDOM.render(
  <Start/>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
