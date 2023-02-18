import {useState, useEffect, useRef} from 'react';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { issueRoute /*, issueScreenshotRoute*/, profilePictureRoute } from '../../utils/APIRoutes';
import useUsers from '../../utils/useUsers';
import useWebsites from '../../utils/useWebsites';
import AttestButton from '../AttestButton/AttestButton';
import {toast} from 'react-toastify';
import {useCookies} from 'react-cookie';
import './Issue.css';

function Issue ({issue, handleOpenLightbox, lastPostRef}) {
    const [inEditMode, setInEditMode] = useState(false);
    const {user} = useUsers(issue?.openedBy?.username);
    const {user: currentUser} = useUsers(); 
    const [screenshotArray, setScreenshotArray] = useState([]);
    const name = useRef();
    const status = useRef();
    const link = useRef(); 
    const description = useRef();
    const {websites: website} = useWebsites(issue?.website?.name);
    const tooltip = useRef();
    const modal = useRef();
    const image = useRef();
    const navigate = useNavigate();
    const [cookies] = useCookies(["token"]);
    const [attests, setAttests] = useState();

    useEffect(() => {
        setAttests(issue?.attests);
    },[issue])

    const [editedValues, setEditedValues] = useState({
        id: issue._id,
        name: '',
        link: '',
        description: '',
    })

    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        let array = [];
        for(let i = 0; i<issue.numberOfScreenshots; i++) {
            array.push('screenshot');
        }
        setScreenshotArray(array)
    }, [issue])

    useEffect(() => {
        setEditedValues({
            id: issue._id,
            name: issue?.name,
            link: issue?.link,
            description: issue?.description,
        })
    },[issue, setEditedValues])

    useEffect(() => {
        if(name.current && status.current && link.current && description.current) {
            if(inEditMode === true) {
                name.current.contentEditable = true;
                link.current.contentEditable = true;
                description.current.contentEditable = true;
            }else {
                name.current.contentEditable = false;
                link.current.contentEditable = false;
                description.current.contentEditable = false;
            }
        }
    },[inEditMode])

    useEffect(() => {
        if(name.current && status.current && link.current && description.current) {
            if(inEditMode === true) {
                name.current.contentEditable = true;
                link.current.contentEditable = true;
                description.current.contentEditable = true;
            }else {
                name.current.contentEditable = false;
                link.current.contentEditable = false;
                description.current.contentEditable = false;
            }
        }
    }, [inEditMode])

    function toggleTooltip(tooltip) {
        if(tooltip.classList.contains('visible')) {
            tooltip.classList.remove('visible')
        }else {
            tooltip.classList.add('visible')
        }
    }

    function toggleModal(modal) {
        if(modal.classList.contains('visible')) {
            modal.classList.remove('visible')
        }else {
            modal.classList.add('visible')
        }
    }

    function handleEditIssue() {
        if(editedValues.id && editedValues.name && editedValues.link && editedValues.description) {
            fetch(issueRoute, {
                headers: {"Content-Type": "application/json", 'x-access-token': cookies.token},
                method: 'PATCH',
                body: JSON.stringify(editedValues)
            })
            .then(res => res.json())
            .then(data => {
                if(data.succeeded) {
                    toast.success(data.msg, toastOptions);
                    // setTimeout(() => {navigate(`/user/${user.username}`)}, 2000)
                    setInEditMode(false);
                }else {
                    toast.error(data.msg, toastOptions);
                }
            })
        }
    }

    function deleteIssue() {
        fetch(`${issueRoute}/${issue._id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.succeeded) {
                toast.success(data.msg, toastOptions);
                setTimeout(() => {navigate(`/user/${user.username}`)}, 2000)
            }else {
                toast.error(data.msg, toastOptions);
            }
        })
    }

    function handleInput(e) {
        setEditedValues({...editedValues, [e.target.attributes.name.value]: e.target.innerText})
    }

    function handleResolveIssue() {
        if(website?.admins.some(admin => admin.username === currentUser.username)) {
            fetch(`${issueRoute}/${issue._id}`, {
                method: 'PATCH',
                headers: {"x-access-token": cookies.token}
            })
            .then(res => res.json())
            .then(data => {
                if(data.succeeded && data.resolved) {
                    status.current.classList.remove('pending');
                    status.current.classList.add('resolved');
                    status.current.innerText = 'Resolved';
                    toast.success(data.msg, toastOptions);
                }else if(data.succeeded) {
                    status.current.classList.remove('resolved');
                    status.current.classList.add('pending');
                    status.current.innerText = 'Pending';
                    toast.success(data.msg, toastOptions);
                }else {
                    toast.error(data.msg, toastOptions);
                }
            })
        }
    }

    function convertDate(date) {
        const formatter = Intl.DateTimeFormat('en', {
            dateStyle: 'full',
        });
        let numDate = new Date(date.slice(0, 10));
        let returnedDate = formatter.format(numDate);
        return returnedDate;
    }

    function truncateText(text, maxLength) {
        let newText;
        if(text && text.length > maxLength) {
            newText = `${text.slice(0, maxLength)}...`;
        }else if(text) {
            newText = text.slice(0, maxLength)
        }
        return newText;
    }
    
    function cancelEdit() {
        setInEditMode(false);
        name.current.innerText = issue.name;
        link.current.innerText = issue.link;
        description.current.innerText = issue.description;
    }
    
    // console.log(`${issueRoute}/${issue._id}/screenshot/1`) 
    return (
        <div className="issue" data-id={`${issue._id}`} ref={lastPostRef}>
        {issue && issue.website && issue.website.name ? 
            <Link to={`/website/${issue.website.name}`}><small className='website-link gradient-text'>{issue.website.name}</small></Link>
        : null}
        <header>
            {issue && issue.name ? 
                <>
                <h2 className="issue-name-truncated">{truncateText(issue.name, 15)}</h2>
                <h2 ref={name} name='name' onKeyUp={handleInput} className="issue-name">{issue.name}</h2>
                </>
            : null}
            <div className="user">
                {user && user._id && issue && issue.openedBy? 
                    <Link to={`/user/${issue.openedBy.username}`} className="user">
                        <div className="profile-picture-wrapper gradient-border">
                            <img src={`${profilePictureRoute}/${user._id}`} className="profile-picture" alt='user'/>
                        </div>   
                        <p className='issue-creator gradient-text'>{issue.openedBy.username}</p> 
                    </Link>
                : null}
            </div>
        </header>
        <div className={`issue-screenshots-wrapper ${issue.numberOfScreenshots === 3 ? 'three-screenshots' : ''} ${issue.numberOfScreenshots === 2 ? 'two-screenshots' : ''} ${issue.numberOfScreenshots === 1 ? 'one-screenshot' : ''}`}>
            {issue && issue.name && issue._id && issue.numberOfScreenshots && screenshotArray ? 
                screenshotArray.map((screenshot, index) => {
                    return (
                    <div key={index} className="issue-screenshot-wrapper">                            
                            <img ref={image} src={`${issueRoute}/${issue._id}/screenshot/${index}`} className="issue-screenshot" alt='Issue' onClick={handleOpenLightbox}/>
                            {/* <a href={`${issueRoute}/${issue._id}/screenshot/${index}`} download={`${issue.name}.png`} className='screenshot-download-button'>Download</a> */}
                    </div>
                )})
                : null
                } 
        </div>
            {/* <img ref={image} src={`${issueRoute}/${issue._id}/screenshot/1`} className="issue-screenshot" alt='Issue' onClick={handleOpenLightbox}/>
            <a href={`${issueRoute}/${issue._id}/screenshot/1`} download={`${issue.name}.png`} className='screenshot-download-button'>Download</a> */}
        <div className="issue-info">
            <p className='issue-status'>Status: <span ref={status} onClick={handleResolveIssue} className={issue.resolved ? 'resolved' : 'pending'}>{issue.resolved ? 'Resolved' : 'Pending'}</span></p>
            <p className="link-hint">Link: <a ref={link} name='link' onKeyUp={handleInput} className='issue-link gradient-text' href={issue.link ? issue.link.slice(0,7) === 'http://' || issue.link.slice(0,8) ==='https://' ? issue.link : `http://${issue.link}` : ''} spellCheck='false'>{issue.link}</a></p>
            <p ref={description} name='description' onKeyUp={handleInput} className="issue-description">{issue.description}</p>
            <p className="issue-description-truncated">{truncateText(issue.description, 35)}</p>
        </div>
        <AttestButton issueId={issue._id} attests={attests} setAttests={setAttests}/>
        {issue && issue.openedBy && issue.openedBy.username === currentUser.username && inEditMode ? 
            <div className="edit-buttons-wrapper">
                <button type='button' className='cta danger' onClick={handleEditIssue}>Save</button>
                <button type='button' className='cta' onClick={cancelEdit}>Cancel</button>
            </div>
        : null}

        {issue && issue.openedBy && issue.openedBy.username === currentUser.username && !inEditMode ? 
            <>
            <div className="tooltip-section">
                <div ref={tooltip} className="issue-tooltip">
                    {issue.openedBy.username === currentUser.username && !inEditMode ? <button type='button' className='edit-button helper-button' onClick={() => {setInEditMode(true)}}>Edit</button> : null}
                    {issue.openedBy.username === currentUser.username && !inEditMode ? <button type='button' className='delete-button cta danger' onClick={() => {toggleModal(modal.current)}}>Delete Issue</button> : null}
                </div>
                <button type='button' className='open-tooltip-button' onClick={() => {toggleTooltip(tooltip.current)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="settings"><rect width="24" height="24" opacity="0"/><path d="M8.61 22a2.25 2.25 0 0 1-1.35-.46L5.19 20a2.37 2.37 0 0 1-.49-3.22 2.06 2.06 0 0 0 .23-1.86l-.06-.16a1.83 1.83 0 0 0-1.12-1.22h-.16a2.34 2.34 0 0 1-1.48-2.94L2.93 8a2.18 2.18 0 0 1 1.12-1.41 2.14 2.14 0 0 1 1.68-.12 1.93 1.93 0 0 0 1.78-.29l.13-.1a1.94 1.94 0 0 0 .73-1.51v-.24A2.32 2.32 0 0 1 10.66 2h2.55a2.26 2.26 0 0 1 1.6.67 2.37 2.37 0 0 1 .68 1.68v.28a1.76 1.76 0 0 0 .69 1.43l.11.08a1.74 1.74 0 0 0 1.59.26l.34-.11A2.26 2.26 0 0 1 21.1 7.8l.79 2.52a2.36 2.36 0 0 1-1.46 2.93l-.2.07A1.89 1.89 0 0 0 19 14.6a2 2 0 0 0 .25 1.65l.26.38a2.38 2.38 0 0 1-.5 3.23L17 21.41a2.24 2.24 0 0 1-3.22-.53l-.12-.17a1.75 1.75 0 0 0-1.5-.78 1.8 1.8 0 0 0-1.43.77l-.23.33A2.25 2.25 0 0 1 9 22a2 2 0 0 1-.39 0zM4.4 11.62a3.83 3.83 0 0 1 2.38 2.5v.12a4 4 0 0 1-.46 3.62.38.38 0 0 0 0 .51L8.47 20a.25.25 0 0 0 .37-.07l.23-.33a3.77 3.77 0 0 1 6.2 0l.12.18a.3.3 0 0 0 .18.12.25.25 0 0 0 .19-.05l2.06-1.56a.36.36 0 0 0 .07-.49l-.26-.38A4 4 0 0 1 17.1 14a3.92 3.92 0 0 1 2.49-2.61l.2-.07a.34.34 0 0 0 .19-.44l-.78-2.49a.35.35 0 0 0-.2-.19.21.21 0 0 0-.19 0l-.34.11a3.74 3.74 0 0 1-3.43-.57L15 7.65a3.76 3.76 0 0 1-1.49-3v-.31a.37.37 0 0 0-.1-.26.31.31 0 0 0-.21-.08h-2.54a.31.31 0 0 0-.29.33v.25a3.9 3.9 0 0 1-1.52 3.09l-.13.1a3.91 3.91 0 0 1-3.63.59.22.22 0 0 0-.14 0 .28.28 0 0 0-.12.15L4 11.12a.36.36 0 0 0 .22.45z" data-name="&lt;Group&gt;"/><path d="M12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5zm0-5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z"/></g></g></svg>
                </button>
            </div>
            <dialog ref={modal} open className="delete-issue-modal-wrapper">
                <div className="delete-issue-modal">
                    <h3>Are you sure you want to permanently delete this issue?</h3>
                    <div className="modal-buttons-section">
                        <button type='button' className='cta danger' onClick={() => {deleteIssue()}}>Yes</button>
                        <button type='button' className='helper-button' onClick={() => {toggleModal(modal.current)}}>No</button>
                    </div>
                </div>
            </dialog>
            </>
        : null}
        {issue && issue.dateOfCreation ? 
        <time className='issue-time'>{convertDate(issue.dateOfCreation)}</time> 
        : null}
    </div>
    )
}

export default Issue;