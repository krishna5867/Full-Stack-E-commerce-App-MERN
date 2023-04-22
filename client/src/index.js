import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Redux/store';
import 'react-toastify/dist/ReactToastify.css';
import Context from './Context/authContext';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
        <Context>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Context>
    </Provider>

);
