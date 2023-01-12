import './InfoPage.css';

function InfoPage() {
    return(
        <section id="info-page">
            {/* <header>
                <button type='button' className='cta'>Sign In</button>
            </header> */}
            <section className="hero-section">
                <h1 className='gradient-text'>The new way to report bugs</h1>
                <button type='button' className='cta gradient-text'>Sign In</button>
            </section>
            <section className="features-section">
                <div className="feature">
                    <div className="feature-text">
                        <h3>Use it on any device!</h3>
                        <p className="feature-description"></p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/devices.png`} alt="devices" className='feature-image'/>
                </div>
            </section>
        </section>
    )
}

export default InfoPage;