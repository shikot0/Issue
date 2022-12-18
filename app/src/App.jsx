import {useState, useEffect} from 'react';
import { getUserRoute } from './utils/APIRoutes.js';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import WebsiteListPage from './Pages/WebsiteListPage/WebsiteListPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import IssuePage from './Pages/IssuePage/IssuePage';
import AccountPage from './Pages/AccountPage/AccountPage';
import './App.css';

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<WebsiteListPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/account/:id" element={<AccountPage/>}/>
            <Route path="/issue" element={<IssuePage/>}/>
          </Routes>
        </BrowserRouter>
      </main> 
    </> 
  );
}

export default App;
