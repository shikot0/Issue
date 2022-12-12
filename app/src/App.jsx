import './App.css';
import Header from './Components/Header/Header.jsx';
import WebsiteListPage from './Pages/WebsiteListPage/WebsiteListPage';
import IssuePage from './Pages/IssuePage/IssuePage';

function App() {
  return (
    <>
      <Header/>
      <main>
        {/* <WebsiteListPage/> */}
        <IssuePage/>
      </main> 
    </>
  );
}

export default App;
