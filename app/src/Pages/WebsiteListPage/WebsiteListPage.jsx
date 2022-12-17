import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import CompanyItem from '../../Components/CompanyItem/CompanyItem';
import SearchBar from '../../Components/SearchBar/SearchBar'
import './WebsiteListPage.css';

function WebsiteListPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('user')) {
            navigate('/register')
        }
    },[navigate])
    return (
        <section id="website-list-page">
            <SearchBar/>
            <div className="companies-grid">
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                {/* <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/>
                <CompanyItem/> */}
            </div>
        </section>
    )
}

export default WebsiteListPage;