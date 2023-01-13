import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import useUsers from '../../utils/useUsers';
import {toast, ToastContainer} from 'react-toastify';
import { registerWebsiteRoute, setWebsiteImageRoute } from '../../utils/APIRoutes';
import './RegisterWebsitePage.css';

function RegisterWebsitePage() {
    const imageInput = useRef();
    const [uploadedImage, setUploadedImage] = useState('');
    const navigate = useNavigate();
    const user = useUsers();
    const domainInput = useRef();
    const newDomainButton = useRef();
    const domainsWrapper = useRef();
    const [website, setWebsite] = useState({
        registeredBy: '',
        websiteName: '',
        domains: [],
        primaryContact: '',
        secondaryContact: ''
    });
    
    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        setWebsite(prev => {
            return {...prev, registeredBy: user.username}
        })
    },[user])

    function handleFocus() {
        imageInput.current.click();
    }

    function handleShowUserImage(e) {
        e.preventDefault();
        if(e.target.files[0].size < 400000) {
            setUploadedImage(e.target.files[0]);
        }else {
            toast.error('Please choose a smaller image', toastOptions)
        }
    };
    
    function handleDragImage(e) {
        e.preventDefault();
        if(e.dataTransfer.files[0].size < 1000000) {
            setUploadedImage(e.dataTransfer.files[0]);
        }else {
            toast.error('Please choose a smaller image', toastOptions)
        }
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add('drag-over')
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over')
    }

    function handleWebsiteData(e) {
        setWebsite({...website, [e.target.name]: e.target.value});
    }
    
    function handleDeleteDomain(index) { 
        let newDomains = website.domains;
        newDomains.splice(index,1);
        setWebsite({...website, domains: [...newDomains]}) 
        console.log(website)  
    }

    function handleAddDomain() {
        console.log(domainInput.current.value)
        if(domainInput.current.value !== '') {
            setWebsite({...website, domains: [...website.domains, domainInput.current.value]});
            domainInput.current.value = '';
        }
        console.log(website)
    }

    function handleEnterButton(e) {
        if(e.key === 'Enter') {
            newDomainButton.current.click();
        }
    }

    function registerWebsite() {
        // console.log(website)
        const formData = new FormData();
        formData.append('fileupload', uploadedImage);
        if(!website.websiteName) {
            toast.error('Please name your website', toastOptions);
        }else if(website.domains.length === 0) {
            toast.error('Please provide at least one valid domain', toastOptions);
        }else if(!website.primaryContact) {
            toast.error('Please add your primary contact for this website', toastOptions)
        }else if(!website.secondaryContact) {
            toast.error('Please add your secondary contact for this website', toastOptions)
        }else if(!uploadedImage) {
            toast.error('Please add an image for your website', toastOptions);
        }else if(website.registeredBy){
            fetch(`${registerWebsiteRoute}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(website)
            })
            .then(res => res.json())
            .then(data => {
                const message = data.msg;
                if(data.status) {
                    fetch(`${setWebsiteImageRoute}/${data.id}`, {
                        method: "POST",
                        body: formData
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.status) {
                            toast.success(message, {...toastOptions, autoClose: 1000});
                            setTimeout(() => {navigate('/home')}, 2000)
                        }
                    }).catch(err => {
                        console.error(err.message)
                    })
                }
            }).catch(err => {
                console.error(err.message);
            })
        }
    }
    return (
        <section id="register-website-page">
            <form>
                <section className="website-image-section">
                    <label htmlFor="image-input">Website Image</label>
                    <div className="website-image-wrapper" onDragOver={handleDragOver} onDrop={e => {handleDragImage(e)}} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave}>
                        <input ref={imageInput} type="file" name='image-input' accept='image/*' className='image-input' onInput={e => {handleShowUserImage(e)}}/>
                        <img src={uploadedImage ? URL.createObjectURL(uploadedImage) : ''} alt="profile" className={uploadedImage ? '' : 'hidden'}/>
                    </div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='upload-hint-image'><g data-name="Layer 2"><g data-name="upload"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><rect x="4" y="4" width="16" height="2" rx="1" ry="1" transform="rotate(180 12 5)"/><rect x="17" y="5" width="4" height="2" rx="1" ry="1" transform="rotate(90 19 6)"/><rect x="3" y="5" width="4" height="2" rx="1" ry="1" transform="rotate(90 5 6)"/><path d="M8 14a1 1 0 0 1-.8-.4 1 1 0 0 1 .2-1.4l4-3a1 1 0 0 1 1.18 0l4 2.82a1 1 0 0 1 .24 1.39 1 1 0 0 1-1.4.24L12 11.24 8.6 13.8a1 1 0 0 1-.6.2z"/><path d="M12 21a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"/></g></g></svg> */}
                    <p className='upload-hint-text'>Drag and Drop or <button type="button" className='browse-button' onClick={handleFocus}>upload an image</button></p>
                </section>
                <section className="website-details-section">
                    <div className="input-wrapper">
                        <label htmlFor="websiteName">Website Name</label>
                        <input onInput={handleWebsiteData} type="text" name='websiteName' placeholder='e.g Issue'/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="primaryContact">Primary Contact</label>
                        <input onInput={handleWebsiteData} type="text" name='primaryContact' placeholder='e.g issue@gmail.com'/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="secondaryContact">Secondary Contact</label>
                        <input onInput={handleWebsiteData} type="text" name='secondaryContact' placeholder='e.g issuehelp@gmail.com'/>
                    </div>
                    {/* <div className="input-wrapper">
                        <label htmlFor="domain">Example Domain</label>
                        <input onInput={handleWebsiteData} type="text" name='domain' placeholder='e.g issue.com'/>
                    </div> */}
                    <div className="input-wrapper">
                        <label htmlFor="domain">Domains:</label>
                        <input ref={domainInput} className='domain-input' onKeyDown={handleEnterButton} type="text" name='domain' placeholder='e.g issue.com'/>
                        <button type='button' ref={newDomainButton} className='helper-button' onClick={handleAddDomain}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
                        </button>
                    </div>
                    <div ref={domainsWrapper} className="domains-wrapper">
                        {website.domains.length !== 0 ? website.domains.map((domain,index) => {
                            return <p key={index} onClick={() => {handleDeleteDomain(index)}} className="domain deletable">{domain}</p>
                        }): null}
                    </div>
                </section>
            </form>
            <button type='button' className='cta' onClick={registerWebsite}>Submit</button>
            <ToastContainer/>
        </section>
    )
}

export default RegisterWebsitePage;