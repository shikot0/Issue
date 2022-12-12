import './CompanyItem.css';

function CompanyItem({companyDetails}) {
    return (
        // <div className="company-item">
        //     <div className="company-image-wrapper">
        //         <img className='company-image' src={companyDetails.image} alt="" />
        //     </div>
        //     <p className='company-name'>{companyDetails.name}</p>
        // </div>
        <div className="company-item">
            <div className="company-image-wrapper">
                <img className='company-image' src={`${process.env.PUBLIC_URL}/logo-google.svg`} alt="" />
            </div>
            <p className='company-name'>Google</p>
        </div>
    )
}

export default CompanyItem;