import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { getAllRegisteredWebsitesRoute } from '../../utils/APIRoutes';
import LatestIssues from '../../Components/LatestIssues/LatestIssues';
import WebsiteItem from '../../Components/WebsiteItem/WebsiteItem';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { WebsiteItemSkeleton } from '../../Skeletons/Skeletons';
import './HomePage.css';

function HomePage() {
    const [websites, setWebsites] = useState([]);
    const [noWebsites, setNoWebsites] = useState(false);
    const [query, setQuery] = useState([]);

    useEffect(() => {
        fetch(getAllRegisteredWebsitesRoute)
        .then(res => res.json())
        .then(data => {
            if(data.length !== 0) {
                setWebsites(data);
                console.log(data)
            }else {
                setNoWebsites(true);
            }
        }).catch(error => {
            console.log(error.message)
        })
    }, [])

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
                <div className="companies-grid">
                {websites.length !== 0 ? websites.filter(website => {
                    if(!query) {
                        return website;
                    }else {
                        if(website.name.toLowerCase().includes(query) || website.domain.toLowerCase().includes(query)) {
                            return website;
                        }else {
                            return false;
                        }
                    }
                    // return website;
                }).map((websiteDetails,index) => {
                    return <WebsiteItem key={index} websiteDetails={websiteDetails}/>
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