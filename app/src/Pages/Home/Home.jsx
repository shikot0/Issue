import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import LatestIssues from '../../Components/LatestIssues/LatestIssues';
import CompanyItem from '../../Components/CompanyItem/CompanyItem';
import SearchBar from '../../Components/SearchBar/SearchBar'
import './Home.css';

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!document.cookie.split('=')[1]) {
            navigate('/register')
        }
    },[navigate])
    
    return (
        <section id="home-page">
            <LatestIssues/>
            <SearchBar/>
            <h2>Click on a company to open an issue!</h2>
            <div className="companies-grid">
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
            </div>
        </section>
    )
}

export default Home;