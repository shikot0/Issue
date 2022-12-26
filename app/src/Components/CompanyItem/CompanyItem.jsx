import './CompanyItem.css';

function CompanyItem({companyDetails}) {
    return (
        <div className="company-item">
            <div className="company-image-wrapper">
                <img className='company-image' src={`${process.env.PUBLIC_URL}/icons/logo-google.svg`} alt="" />
            </div>
            <div className="company-info">
                <p className='company-name'>Google</p>
            </div>
        </div>
    )
}

export default CompanyItem;