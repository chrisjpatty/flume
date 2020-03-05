import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Form from './pages/Form/Form'
import './index.css'


ReactDOM.render(
  <Router>
    <Route exact path="/" render={() => <App />} />
    <Route exact path="/form" render={() => (
      <React.Fragment>
        <style>
          {`
            body{
              background: rgb(198, 203, 208);
            }
          `}
        </style>
        <Form />
      </React.Fragment>
    )} />
  </Router>,
  document.getElementById('root')
)
