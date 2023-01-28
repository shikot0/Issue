import {useEffect, useRef} from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import InfoPage from './Pages/InfoPage/InfoPage.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import NewIssuePage from './Pages/NewIssuePage/NewIssuePage';
import RegisterWebsitePage from './Pages/RegisterWebsitePage/RegisterWebsitePage.jsx';
import IssuePage from './Pages/IssuePage/IssuePage';
import IssueListPage from './Pages/IssueListPage/IssueListPage';
import AccountPage from './Pages/AccountPage/AccountPage';
import WebsitePage from './Pages/WebsitePage/WebsitePage';
import Footer from './Components/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  // const navigate = useNavigate();
  const header = useRef();
  const footer = useRef();
  const location = useLocation(); 
  
  useEffect(() => {
    if(location.pathname === '/' && header.current && footer.current) {
      header.current.classList.add('hide-nav');
      footer.current.classList.add('hide-nav');
    }
  },[location.pathname]);

  useEffect(() => {
    if(location.pathname !== '/' && header.current && footer.current) {
      header.current.classList.remove('hide-nav');
      footer.current.classList.remove('hide-nav');
    }
  },[location.pathname]);

  return (
    <>
        <Header header={header}/> 
        <main>
            <Routes>
              <Route path="/" element={<InfoPage/>}/>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/user/:username" element={<AccountPage/>}/>
              <Route path="/website/:name" element={<WebsitePage/>}/>
              <Route path="/newissue/:websiteName" element={<NewIssuePage/>}/>
              <Route path="/registerwebsite" element={<RegisterWebsitePage/>}/>
              <Route path="issuelist" element={<IssueListPage/>}/>
              <Route path="issue/:id" element={<IssuePage/>}/>
            </Routes>
        </main> 
        <Footer footer={footer}/>
        {/* <Analytics/> */}
    </> 
  );
}

export default App;
