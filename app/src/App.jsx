import {useState, useEffect} from 'react';
import { getUserRoute } from './utils/APIRoutes.js';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import WebsiteListPage from './Pages/WebsiteListPage/WebsiteListPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import IssuePage from './Pages/IssuePage/IssuePage';
import './App.css';

function App() {
  const [user, setUser] = useState('');
  let userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '';

  useEffect(() => {
      if(userId) {
          fetch(`${getUserRoute}/${userId}`)
          .then(res => res.json())
          .then(data => {
              setUser(data)
          })
      }
  },[userId]);
  return (
    <>
      <main>
        <BrowserRouter>
          <Header user={user} userId={userId}/>
          <Routes>
            <Route path="/" element={<WebsiteListPage/>}/>
            <Route path="/issue" element={<IssuePage user={user}/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </BrowserRouter>
      </main> 
    </> 
  );
}

export default App;
