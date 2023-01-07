import {Routes, Route, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import Header from './Components/Header/Header.jsx';
import Home from './Pages/Home/Home';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import NewIssuePage from './Pages/NewIssuePage/NewIssuePage';
import IssuePage from './Pages/IssuePage/IssuePage';
import AccountPage from './Pages/AccountPage/AccountPage';
import Footer from './Components/Footer/Footer';
// import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if(window.location.pathname === '/') {
      navigate('/register')
    }
  },[navigate]) 
  return (
    <>
        <Header/>
        <main>
            <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/u/:username" element={<AccountPage/>}/>
              <Route path="/newissue" element={<NewIssuePage/>}/>
              <Route path="issue/:id" element={<IssuePage/>}/>
            </Routes>
        </main> 
        <Footer/>
      {/* <Analytics/> */}
    </> 
  );
}

export default App;
