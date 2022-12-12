import './IssuePage.css';

function IssuePage() {
    return (
        <section id="issue-page">
            <div className="company">
                <div className="company-image-wrapper">
                    <img src={`${process.env.PUBLIC_URL}/logo-google.svg`} alt="" />
                </div>
                <div className="company-about">
                    <h2 className="name">Google</h2>
                    <div className="domain-wrapper">
                        <p className='domain'>Google.com</p>
                        <p className='domain'>Google.uk</p>
                    </div>
                </div>
            </div>
            <div className="name-and-link">
                <input type="text" id="" placeholder='Name of bug'/>
                <input type="url" id="" placeholder="Link to the site" />
            </div>
            <div className="image-input-wrapper">
                <input type="file" name="" id="" accept='image/*'/>
            </div>
        </section>
    )
}

export default IssuePage;