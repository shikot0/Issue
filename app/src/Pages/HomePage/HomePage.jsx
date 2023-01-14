import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { getAllRegisteredWebsitesRoute } from '../../utils/APIRoutes';
import LatestIssues from '../../Components/LatestIssues/LatestIssues';
import WebsiteItem from '../../Components/WebsiteItem/WebsiteItem';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { WebsiteItemSkeleton } from '../../Skeletons/Skeletons';
import useWebsites from '../../utils/useWebsites';
import './HomePage.css';

function HomePage() {
    // const [websites, setWebsites] = useState([]);
    const [query, setQuery] = useState([]);
    const {websites, noWebsites} = useWebsites();

    const navigate = useNavigate();
    useEffect(() => {
        if(!document.cookie.split('=')[1]) {
            navigate('/register')
        }
    },[navigate])
    
    return (
        <section id="home-page">
            <LatestIssues/>
            <SearchBar query={query} setQuery={setQuery}/> 
            <h2>Click on a website to open an issue!</h2>
            {!noWebsites ?
                <div className="websites-grid">
                {websites && websites.length !== 0 ? websites.filter(website => {
                    if(!query) {
                        return website;
                    }else {
                        if(website.name.toLowerCase().includes(query)) {
                            return website;
                        }else if(website.domains.some(domain => domain.toLowerCase().includes(query))) {
                            return website;
                        }else {
                            return false;
                        }
                    }
                    // return website;
                }).map((websiteDetails,index) => {
                    return <Link key={index} to={`/newissue/${websiteDetails.name.toLowerCase()}`}><WebsiteItem websiteDetails={websiteDetails}/></Link>
                    // return <Link to={`/issue/${issue._id}`} key={index}><IssueItem issue={issue}/></Link>
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
                </>}
            </div> 
            : null}
        </section>
    )
}

export default HomePage;