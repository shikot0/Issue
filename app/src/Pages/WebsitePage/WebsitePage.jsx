import {useParams} from 'react-router-dom';
import useWebsites from '../../utils/useWebsites';
import './WebsitePage.css';
import { websiteImageRoute } from '../../utils/APIRoutes';

function WebsitePage() {
    const {name} = useParams();
    const {websites: website} = useWebsites(name);
    console.log(website);
    return (
        <section id="website-page">
            <div className="website-image-wrapper">
                {website ? <img src={`${websiteImageRoute}/${website._id}`} alt="website" className='website-image' /> : null}
            </div>
        </section>
    )
}

export default WebsitePage;