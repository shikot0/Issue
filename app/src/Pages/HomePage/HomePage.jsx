import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import LatestIssues from '../../Components/LatestIssues/LatestIssues';
import WebsiteItem from '../../Components/WebsiteItem/WebsiteItem';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { WebsiteItemSkeleton } from '../../Skeletons/Skeletons';
import useWebsites from '../../utils/useWebsites';
import './HomePage.css';
import { useCookies } from 'react-cookie';

function HomePage() {
    const [query, setQuery] = useState('');
    const [cookies] = useCookies(["token"]);
    const {websites, noWebsites} = useWebsites();
    const navigate = useNavigate();

    useEffect(() => {    
        // if(!localStorage.getItem('token')) {
        //     navigate('/register')
        // }
        if(!cookies.token) {
            navigate('/register');
        } 
    },[cookies.token, navigate]);
    
    return (
        <section id="home-page">
            <LatestIssues/>
            <SearchBar query={query} setQuery={setQuery}/> 
            <h2>Click on a website to open an issue!</h2>
            {!noWebsites ?
                <div className="websites-grid">
                {!noWebsites && websites ? websites.filter(website => {
                    if(!query) {
                        return website;
                    }else {
                        if(website.name.toLowerCase().includes(query.toLowerCase())) {
                            return website;
                        }else if(website.domains.some(domain => domain.toLowerCase().includes(query.toLowerCase()))) {
                            return website;
                        }else {
                            return false;
                        }
                    }
                }).map((websiteDetails,index) => {
                    return <Link key={index} to={`/website/${websiteDetails.name.toLowerCase()}`}><WebsiteItem websiteDetails={websiteDetails}/></Link>
                }):
                <>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                    <WebsiteItemSkeleton/>
                </>}
            </div> 
            : null}
        </section>
    )
}

export default HomePage;