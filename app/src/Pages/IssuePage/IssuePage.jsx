import {useState, useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import useIssues from '../../utils/useIssues';
import useUsers from '../../utils/useUsers';
import { IssueScreenshotRoute, getProfilePictureRoute } from '../../utils/APIRoutes';
import {editIssueRoute} from '../../utils/APIRoutes';
import {IssueSkeleton} from '../../Skeletons/Skeletons';
import './IssuePage.css';

function IssuePage() {
    const [inEditMode, setInEditMode] = useState(false);
    const {id} = useParams();
    const [editedValues, setEditedValues] = useState({
        id: id,
        name: '',
        link: '',
        description: '',
    })
    const issue = useIssues(null,id);
    const user = useUsers(issue.openedBy);
    const currentUser = useUsers(); 
    const name = useRef();
    const status = useRef();
    const link = useRef(); 
    const description = useRef();

    
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
    // contentEditable={inEditMode ? 'true' : 'false'}
    function handleEditIssue() {
        console.log(editedValues)
        if(editedValues.id && editedValues.name && editedValues.link && editedValues.description) {
            fetch(editIssueRoute, {
                method: 'PUT',
                body: JSON.stringify(editedValues)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        }
    }
    function handleInput(e) {
        setEditedValues({...editedValues, [e.target.name]: e.target.value})
        // function handleIssueData(e) {
        //     setIssue({...issue, [e.target.name]: e.target.value})
        // }
    }
    return(
        <section id="issue-page">
        {issue && user ?
                <div className="issue">
                    <header>
                        <h2 ref={name} name='name' onChange={handleInput} className="issue-name">{issue.name}</h2>
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
                    <p className="link-hint">Link: <a ref={link} name='link' onChange={handleInput} className='issue-link gradient-text' href={issue.link ? issue.link.slice(0,7) === 'http://' || issue.link.slice(0,8) ==='https://' ? issue.link : `http://${issue.link}` : ''}>{issue.link}</a></p>
                    <p ref={description} name='description' onChange={handleInput} className="issue-description">{issue.description}</p>
                    {issue.openedBy === currentUser.username && inEditMode ? 
                        <div className="edit-buttons-wrapper">
                            <button type='button' className='cta danger' onClick={handleEditIssue}>Submit</button>
                            <button type='button' className='cta' onClick={() => {setInEditMode(false)}}>Cancel</button>
                        </div>
                    : null}
                </div>
        : <IssueSkeleton/>}
        {/* <IssueSkeleton/> */}
        </section> 
    )
}

export default IssuePage;