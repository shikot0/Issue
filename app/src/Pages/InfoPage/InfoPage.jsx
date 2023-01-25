import {useNavigate} from 'react-router-dom';
import './InfoPage.css';

function InfoPage() {
    const navigate = useNavigate();

    function handleNavigate() {
        navigate('/register')
    }
    return(
        <section id="info-page">
            {/* <header>
                <button type='button' className='cta'>Sign In</button>
            </header> */}
            <section className="hero-section">
                <h1 className='gradient-text'>The new way to report bugs</h1>
                <button type='button' className='cta gradient-text' onClick={handleNavigate}>Sign In</button>
            </section>
            <section className="features-section"> 
                <div className="feature">
                    <div className="feature-text">
                        <h2>Use it on any device!</h2>
                        <p className="feature-description">
                            Issue can be used on any device with an internet connection which allows you to report issues from wherever you are in the World!
                        </p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/devices.svg`} alt="devices" className='feature-image' />
                </div>
                <div className="feature">
                    <div className="feature-text">
                        <h2>Use it on any device!</h2>
                        <p className="feature-description">
                            Report any issue not matter how trivial and wait for a fix.
                        </p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/devices.svg`} alt="devices" className='feature-image' />
                </div>
            </section>
        </section>
    )
}

export default InfoPage;