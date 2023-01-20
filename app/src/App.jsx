import {Routes, Route, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import Header from './Components/Header/Header.jsx';
import InfoPage from './Pages/InfoPage/InfoPage.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import NewIssuePage from './Pages/NewIssuePage/NewIssuePage';
import RegisterWebsitePage from './Pages/RegisterWebsitePage/RegisterWebsitePage.jsx';
import IssuePage from './Pages/IssuePage/IssuePage';
import AccountPage from './Pages/AccountPage/AccountPage';
import WebsitePage from './Pages/WebsitePage/WebsitePage';
import Footer from './Components/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  // const navigate = useNavigate();
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  useEffect(() => {
    // if(window.location.pathname === '/') {
    //   navigate('/register')
    // }
    if(window.location.pathname === '/') {;
      document.querySelector('header').classList.add('hide-nav');
      document.querySelector('footer').classList.add('hide-nav');
    }
  },[header, footer]) 
  return (
    <>
        <Header/> 
        <main>
            <Routes>
              <Route path="/" element={<InfoPage/>}/>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/user/:username" element={<AccountPage/>}/>
              <Route path="/website/:name" element={<WebsitePage/>}/>
              <Route path="/newissue/:websiteName" element={<NewIssuePage/>}/>
              <Route path="/registerwebsite" element={<RegisterWebsitePage/>}/>
              <Route path="issue/:id" element={<IssuePage/>}/>
            </Routes>
        </main> 
        <Footer/>
        <Analytics/>
    </> 
  );
}

export default App;
