import {useState, useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { createIssueRoute, websiteImageRoute, issueScreenshotRoute } from '../../utils/APIRoutes';
import {ToastContainer, toast} from 'react-toastify';
import useUsers from '../../utils/useUsers';
import 'react-toastify/dist/ReactToastify.css';
import './NewIssuePage.css';
import useWebsites from '../../utils/useWebsites';
import { ImageSkeleton } from '../../Skeletons/Skeletons';

function NewIssuePage() {
    const {websiteName} = useParams();
    const {user} = useUsers();
    const {websites: website} = useWebsites(websiteName);
    const [uploadedImage, setUploadedImage] = useState('');
    const imageInput = useRef();
    const linkInput = useRef();
    const [issue, setIssue] = useState({
        name: '',
        website: '',
        link: '',
        description: '',
        openedBy: '',
    });
    const navigate = useNavigate();

    function handleFocus() {
        imageInput.current.click();
    }

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/register')
        }
    },[navigate])

    useEffect(() => {
        setIssue(prev => {
            return {...prev, openedBy: {id: user?._id, username: user?.username}}
        })
    },[user])

    useEffect(() => {
        setIssue(prev => {
           return  {...prev, website: {id: website?._id, name: website?.queryName}}
        })
    },[website])

    function handleAutofill(e) {
        linkInput.current.value = e.target.innerText;
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
            e.target.classList.remove('drag-over');
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
    
    function handleIssueData(e) {
        setIssue({...issue, [e.target.name]: e.target.value})
    }
    
    function createIssue() {
        const formData = new FormData();
        formData.append('fileupload', uploadedImage);
        
        if(!issue.name) {
            toast.error('Please name your issue', toastOptions);
        }else if(!issue.link) {
            toast.error('Please add a link to the site', toastOptions);
        }else if(!issue.description) {
            toast.error('Please add a short description of the issue', toastOptions)
        }else if(!uploadedImage) {
            toast.error('Please add an image of the issue', toastOptions);
        }else if(issue.openedBy && issue.website) {
            // console.log(issue)
            fetch(`${createIssueRoute}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(issue)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status) {
                    fetch(`${issueScreenshotRoute}/${data.id}`, {
                        method: "POST",
                        body: formData
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.status) {
                            toast.success(data.msg,{...toastOptions, autoClose: 1000});
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
        <section id="new-issue-page">
            <div className="company">
                <div className="company-image-wrapper">
                    {website ? 
                    <img src={`${websiteImageRoute}/${website._id}`} alt="website" /> : 
                    <ImageSkeleton/>}
                </div>
                <div className="company-about">
                    <h2 className="name">{website ? website.name: 'website'}</h2> 
                    <div className="domain-wrapper">
                        {website && website.domains && website.domains.map((domain, index) => {
                            return <p className='domain' onClick={handleAutofill} key={index}>{domain}</p>
                        })}
                    </div>
                </div>
            </div>
            <form>
                <div className="name-and-link">
                    <input onInput={handleIssueData} type="text" name="name" placeholder='Name of issue' aria-label='issue name'/>
                    <input onInput={handleIssueData} ref={linkInput} type="url" name="link" placeholder={website ? website.domains[0] : 'issue.com'} aria-label='issue link'/>
                </div>
                <textarea onInput={handleIssueData} name="description" className='text-box' placeholder='A short description of the issue' aria-label='issue description'></textarea>
                <div className="image-input-wrapper" onDragOver={handleDragOver} onDrop={e => {handleDragImage(e)}} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='upload-hint-image'><g data-name="Layer 2"><g data-name="upload"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><rect x="4" y="4" width="16" height="2" rx="1" ry="1" transform="rotate(180 12 5)"/><rect x="17" y="5" width="4" height="2" rx="1" ry="1" transform="rotate(90 19 6)"/><rect x="3" y="5" width="4" height="2" rx="1" ry="1" transform="rotate(90 5 6)"/><path d="M8 14a1 1 0 0 1-.8-.4 1 1 0 0 1 .2-1.4l4-3a1 1 0 0 1 1.18 0l4 2.82a1 1 0 0 1 .24 1.39 1 1 0 0 1-1.4.24L12 11.24 8.6 13.8a1 1 0 0 1-.6.2z"/><path d="M12 21a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"/></g></g></svg>
                    <p className='upload-hint-text'>Drag and Drop or <button type="button" className='browse-button' onClick={handleFocus}>upload an image</button></p>
                    <input ref={imageInput} type="file" accept='image/*' className='image-input' onInput={e => {handleShowUserImage(e)}} aria-label='issue screenshot input'/>
                    <img src={uploadedImage ? URL.createObjectURL(uploadedImage) : ''} alt="profile" className={uploadedImage ? '' : 'hidden'}/>
                </div>
                <button type='button' className='cta gradient-text' onClick={createIssue}>Submit</button>
            </form>
            <ToastContainer/>
        </section>
    )
}

export default NewIssuePage;