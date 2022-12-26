import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Home from './Pages/Home/Home';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import IssuePage from './Pages/IssuePage/IssuePage';
import AccountPage from './Pages/AccountPage/AccountPage';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
      <main>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/u/:username" element={<AccountPage/>}/>
            <Route path="/issue" element={<IssuePage/>}/>
          </Routes>
      </main> 
      </BrowserRouter>
    </> 
  );
}

export default App;
