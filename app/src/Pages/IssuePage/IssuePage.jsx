import {useState, useEffect, useRef} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { IssueScreenshotRoute, getProfilePictureRoute } from '../../utils/APIRoutes';
import {editIssueRoute} from '../../utils/APIRoutes';
import {IssueSkeleton} from '../../Skeletons/Skeletons';
import useIssues from '../../utils/useIssues';
import useUsers from '../../utils/useUsers';
import './IssuePage.css';
import { toast, ToastContainer } from 'react-toastify';

function IssuePage() {
    const [inEditMode, setInEditMode] = useState(false);
    const {id} = useParams();
    const issue = useIssues(null,id);
    const user = useUsers(issue.openedBy);
    const [editedValues, setEditedValues] = useState({
        id: id,
        name: '',
        link: '',
        description: '',
    })
    const currentUser = useUsers(); 
    const name = useRef();
    const status = useRef();
    const link = useRef(); 
    const description = useRef();
    const navigate = useNavigate();

    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        setEditedValues({
            id: id,
            name: issue.name,
            link: issue.link,
            description: issue.description,
        })
    },[id, issue])
    
    useEffect(() => {
        if(name.current && status.current && link.current && description.current) {
            if(inEditMode === true) {
                name.current.contentEditable = true;
                // status.current.contentEditable = true;
                link.current.contentEditable = true;
                description.current.contentEditable = true;
            }else {
                name.current.contentEditable = false;
                // status.current.contentEditable = false;
                link.current.contentEditable = false;
                description.current.contentEditable = false;
            }
        }
    },[inEditMode])

    function handleEditIssue() {
        console.log(editedValues)
        if(editedValues.id && editedValues.name && editedValues.link && editedValues.description) {
            fetch(editIssueRoute, {
                headers: {"Content-Type": "application/json"},
                method: 'PUT',
                body: JSON.stringify(editedValues)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 200) {
                    toast.success(data.msg, toastOptions);
                    // navigate(`/user/${user.username}`); 
                    setTimeout(() => {navigate(`/user/${user.username}`)}, 2000)
                    setInEditMode(false);
                }else {
                    toast.error('There was an error', toastOptions);
                }
            })
        }
    }

    function handleInput(e) {
        // console.log(e.target.attributes.name)
        setEditedValues({...editedValues, [e.target.attributes.name.value]: e.target.innerText})
        // console.log(e.target.innerText)
    }

    return(
        <section id="issue-page">
        {issue && user ?
                <div className="issue">
                    <header>
                        <h2 ref={name} name='name' onKeyUp={handleInput} className="issue-name">{issue.name}</h2>
                        {issue.openedBy === currentUser.username && !inEditMode ? <button type='button' className='cta gradient-text' onClick={() => {setInEditMode(true)}}>Edit</button> : null}
                        <div className="user">
                            <div className="profile-picture-wrapper">
                                <img src={`${getProfilePictureRoute}/${user._id}`} className="profile-picture" alt='user'/>
                            </div>
                            <Link to={`/u/${issue.openedBy}`} className="issue-creator gradient-text">{issue.openedBy}</Link>
                        </div>
                    </header>
                    <div className="issue-screenshot-wrapper">
                        <img src={`${IssueScreenshotRoute}/${id}`} className="issue-screenshot" alt='issue'/>
                    </div>
                    <p ref={status} className='issue-status'>Status: <span className={issue.resolved ? 'resolved' : 'pending'}>{issue.resolved ? 'Resolved' : 'Pending'}</span></p>
                    <p className="link-hint">Link: <a ref={link} name='link' onKeyUp={handleInput} className='issue-link gradient-text' href={issue.link ? issue.link.slice(0,7) === 'http://' || issue.link.slice(0,8) ==='https://' ? issue.link : `http://${issue.link}` : ''} spellCheck='false'>{issue.link}</a></p>
                    <p ref={description} name='description' onKeyUp={handleInput} className="issue-description">{issue.description}</p>
                    {issue.openedBy === currentUser.username && inEditMode ? 
                        <div className="edit-buttons-wrapper">
                            <button type='button' className='cta danger' onClick={handleEditIssue}>Submit</button>
                            <button type='button' className='cta' onClick={() => {setInEditMode(false)}}>Cancel</button>
                        </div>
                    : null}
                </div>
        : <IssueSkeleton/>}
        {/* <IssueSkeleton/> */}
        <ToastContainer/>
        </section> 
    )
}

export default IssuePage;