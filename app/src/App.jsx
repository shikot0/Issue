import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import WebsiteListPage from './Pages/WebsiteListPage/WebsiteListPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import IssuePage from './Pages/IssuePage/IssuePage';
import './App.css';

function App() {
  return (
    <>
      <Header/>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WebsiteListPage/>}/>
            <Route path="/issue" element={<IssuePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </BrowserRouter>
      </main> 
    </> 
  );
}

export default App;
