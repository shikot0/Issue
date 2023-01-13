import {websiteImageRoute} from '../../utils/APIRoutes';
import './WebsiteItem.css';

function WebsiteItem({websiteDetails}) {
    return (
        <div className="website-item">
            <div className="website-image-wrapper">
                <img className='website-image' src={`${websiteImageRoute}/${websiteDetails._id}`} alt="" />
            </div>
            <div className="website-info">
                <p className='website-name'>{websiteDetails.name}</p>
            </div>
        </div>
    )
}

export default WebsiteItem;