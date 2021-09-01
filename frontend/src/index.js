import React from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from "react-helmet";
import './index.css';
import NavigationBar from './componets/NavigationBar'
import { BrowserRouter as Router,} from "react-router-dom";


ReactDOM.render(

  <Router>
    <div>
        <div>
          <Helmet bodyAttributes={{style: 'background-color: #24252a', paddingTop:"5em"}}/>
          <NavigationBar />
        </div>
    </div>
  </Router>,
  document.getElementById('root')
);
