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
            <div className="company-info">
                <p className='company-name'>Google</p>
                {/* <div className="company-price-info">
                    <small className="stock-price">$50</small>
                    <small className='price-change'>+5%</small>
                </div> */}
            </div>
        </div>
    )
}

export default CompanyItem;