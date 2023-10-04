import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from "./app/store"
import { App } from './components'
import './assets/styles/index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { generateRandomUserId } from './assets/JS'
const userID = generateRandomUserId();


console.log(store, store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App userID={userID}/>
    </Router> 
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      theme="light"
    />
  </Provider>
  // </React.StrictMode>,
,)
