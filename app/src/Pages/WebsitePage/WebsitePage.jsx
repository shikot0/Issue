import {useParams} from 'react-router-dom';
import useWebsites from '../../utils/useWebsites';
import useIssues from '../../utils/useIssues';
import { websiteImageRoute } from '../../utils/APIRoutes';
import IssuesWrapper from '../../Components/IssuesWrapper/IssuesWrapper';
import { HeaderSkeleton, ImageSkeleton } from '../../Skeletons/Skeletons';
import './WebsitePage.css';

function WebsitePage() {
    const {name} = useParams();
    const {websites: website} = useWebsites(name);
    const {issues, noIssues} = useIssues(null, name, null);
    return (
        <section id="website-page">
            <header>
                <div className="website-image-wrapper gradient-border">
                    {website ? 
                    <img src={`${websiteImageRoute}/${website._id}`} alt="website" className='website-image' /> : 
                    <ImageSkeleton/>}
                </div>
                {website ? 
                <p className="website-name gradient-text">{website.name}</p>
                : <HeaderSkeleton/>}
                <div className="website-details-wrapper">
                    <div className="detail">
                        <h3 className='detail-value'>{website ? website.numberOfIssues: 0}</h3>
                        <p className='detail-name'>{website && website.numberOfIssues === 1 ? 'Issue' : 'Issues'}</p>
                    </div>
                </div>
            </header>
            {!noIssues ? 
            <IssuesWrapper issues={issues} website={website}/>
            : <h2>There are no issues</h2> }
        </section>
    )
}

export default WebsitePage;