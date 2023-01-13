import {useState, useEffect, useRef} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import { createIssueRoute, setIssueScreenshotRoute } from '../../utils/APIRoutes';
import {useNavigate} from 'react-router-dom';
import useUsers from '../../utils/useUsers';
import 'react-toastify/dist/ReactToastify.css';
import './NewIssuePage.css';

function NewIssuePage() {
    const user = useUsers();
    const [issue, setIssue] = useState({
        name: '',
        link: '',
        description: '',
        openedBy: '',
    })
    const [uploadedImage, setUploadedImage] = useState('');
    const imageInput = useRef();
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
        if(!document.cookie) {
            navigate('/register')
        }
    },[navigate])

    useEffect(() => {
        setIssue(prev => {
            return {...prev, openedBy: user.username}
        })
    },[user])

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
        }else if(issue.openedBy){
            fetch(`${createIssueRoute}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(issue)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status) {
                    fetch(`${setIssueScreenshotRoute}/${data.id}`, {
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
                    <img src={`${process.env.PUBLIC_URL}/logo-google.svg`} alt="" />
                </div>
                <div className="company-about">
                    <h2 className="name">Google</h2>
                    <div className="domain-wrapper">
                        <p className='domain'>google.com</p>
                        <p className='domain'>google.uk</p>
                    </div>
                </div>
            </div>
            <form>
                <div className="name-and-link">
                    <input onInput={handleIssueData} type="text" name="name" placeholder='Name of issue'/>
                    <input onInput={handleIssueData} type="url" name="link" placeholder="Link to the site" />
                </div>
                <textarea onInput={handleIssueData} name="description" className='text-box' placeholder='A short description of the issue'></textarea>
                <div className="image-input-wrapper" onDragOver={handleDragOver} onDrop={e => {handleDragImage(e)}} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='upload-hint-image'><g data-name="Layer 2"><g data-name="upload"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><rect x="4" y="4" width="16" height="2" rx="1" ry="1" transform="rotate(180 12 5)"/><rect x="17" y="5" width="4" height="2" rx="1" ry="1" transform="rotate(90 19 6)"/><rect x="3" y="5" width="4" height="2" rx="1" ry="1" transform="rotate(90 5 6)"/><path d="M8 14a1 1 0 0 1-.8-.4 1 1 0 0 1 .2-1.4l4-3a1 1 0 0 1 1.18 0l4 2.82a1 1 0 0 1 .24 1.39 1 1 0 0 1-1.4.24L12 11.24 8.6 13.8a1 1 0 0 1-.6.2z"/><path d="M12 21a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"/></g></g></svg>
                    <p className='upload-hint-text'>Drag and Drop or <button type="button" className='browse-button' onClick={handleFocus}>upload an image</button></p>
                    <input ref={imageInput} type="file" accept='image/*' className='image-input' onInput={e => {handleShowUserImage(e)}}/>
                    <img src={uploadedImage ? URL.createObjectURL(uploadedImage) : ''} alt="profile" className={uploadedImage ? '' : 'hidden'}/>
                </div>
                <button type='button' className='cta gradient-text' onClick={createIssue}>Submit</button>
            </form>
            <ToastContainer/>
        </section>
    )
}

export default NewIssuePage;