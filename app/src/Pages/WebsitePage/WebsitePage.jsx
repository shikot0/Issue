import {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import useIssues from '../../utils/useIssues';
import useWebsites from '../../utils/useWebsites';
import IssuesWrapper from '../../Components/IssuesWrapper/IssuesWrapper';
import { websiteImageRoute } from '../../utils/APIRoutes';
import { HeaderSkeleton, ImageSkeleton } from '../../Skeletons/Skeletons';
import './WebsitePage.css';

function WebsitePage() {
    const {name} = useParams();
    const navigate = useNavigate();
    const {websites: website, noWebsites} = useWebsites(name);
    const {issues} = useIssues(null, name, null);


    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/register')
        }
    },[navigate])

    const formatter = Intl.NumberFormat('en', {notation: 'compact'});

    function formatNum(num) {
        let number = formatter.format(num);
        return number;
    }
    return (
        <section id="website-page">
        {!noWebsites ? 
            <>
            <header>
            <div className="website-image-wrapper gradient-border">
                {website ? 
                <img src={`${websiteImageRoute}/${website._id}`} alt="website" className='website-image' /> : 
                <ImageSkeleton/>}
            </div>
            <div className="website-details-wrapper">
                {website ? 
                <p className="website-name gradient-text">{website.name}</p>
                : <HeaderSkeleton/>}
                <div className="detail">
                    <h3 className='detail-value'>{website ? formatNum(website.numberOfIssues) : 0}</h3>
                    <p className='detail-name'>{website && website.numberOfIssues === 1 ? 'Issue' : 'Issues'}</p>
                </div>
            </div>
        </header>
        <IssuesWrapper issues={issues} website={website}/>  
        </>  
        : <h3 className='not-found-hint'>Sorry this website could not be found.</h3>}
        </section>
    )
}

export default WebsitePage;