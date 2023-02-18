import {useState, useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { profilePictureRoute, userRoute } from '../../utils/APIRoutes';
import { ProfilePictureSkeleton, UsernameSkeleton } from '../../Skeletons/Skeletons';
import {toast, ToastContainer} from 'react-toastify';
import useUsers from '../../utils/useUsers';
import useIssues from '../../utils/useIssues';
import Loader from '../../Components/Loader/Loader';
import IssuesWrapper from '../../Components/IssuesWrapper/IssuesWrapper';
import { useCookies } from 'react-cookie';
import './AccountPage.css';

function AccountPage() {
    const {username} = useParams();
    const {user, noUsers} = useUsers(username);
    const [cookies, setCookies] = useCookies(["token"]);
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedUserImage, setUpdatedUserImage] = useState('');
    const [canSaveUsername, setCanSaveUsername] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const usernameInput = useRef();
    const profilePictureInput = useRef();
    const {user: currentUser} = useUsers();
    const {issues, noIssues} = useIssues(username);
    const navigate = useNavigate();

    useEffect(() => {    
        // if(!localStorage.getItem('token')) {
        //     navigate('/register')
        // }
        if(!cookies.token) {
            navigate('/register');
        } 
    },[cookies.token, navigate]);

    function handleFocus() {
        profilePictureInput.current.click();
    }

    function logout() {
        setCookies("token", null, {
            path: '/',
        })
        navigate('/register');
    }
    // console.log(cookies)
    
    function handleShowUserImage(e) {
        e.preventDefault();
        if(e.target.files[0].size < 400000) {
            setUpdatedUserImage(e.target.files[0]);
            e.target.classList.remove('drag-over');
        }else {
            toast.error('Please choose a smaller image', toastOptions)
        }
    };
    
    function handleDragImage(e) {
        e.preventDefault();
        if(e.dataTransfer.files[0].size < 1500000) {
            setUpdatedUserImage(e.dataTransfer.files[0]);
        }else {
            toast.error('Please choose a smaller image', toastOptions)
        }
        e.target.classList.remove('drag-over');
    };
    
    function handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add('drag-over')
    };

    function handleDragLeave(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over')
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    function handleUpdateUserImage() {
        if(updatedUserImage) {
            let formData = new FormData();
            formData.append('fileupload', updatedUserImage)
            fetch(`${profilePictureRoute}/${user._id}`, {
                headers: { "x-access-token": cookies.token },
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if(response.succeded) {
                    toast.success(response.msg, toastOptions);
                    setTimeout(() => {window.location.reload()}, 2000)
                }
            }).catch(err => {
                toast.error(err.message, toastOptions)
            })
        }
    }
    
    function handleUsernameInput() {
        if(usernameInput.current) {
            setUpdatedUsername(usernameInput.current.innerText);
        }
        if(updatedUsername !== '') {
            setCanSaveUsername(true);
        }
    }

    function handleEditUsername() {
        if(usernameInput.current) {
            if(!inEditMode) {
                setInEditMode(true);
                usernameInput.current.contentEditable = true;
            }else {
                setInEditMode(false);
                usernameInput.current.contentEditable = false;
                usernameInput.current.innerText = user.username;
            }
        }
    }

    function handleUpdateUsername() {
        setIsLoading(true)
        if(updatedUsername) {
            fetch(`${userRoute}/${currentUser._id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json", "x-access-token": cookies.token },
                body: JSON.stringify({username: updatedUsername})
            })
            .then(res => res.json())
            .then(response => {
                setIsLoading(false)
                if(response.succeeded) {
                    toast.success(response.msg, toastOptions);
                    setTimeout(() => {navigate(`/user/${response.username}`)}, 1500)
                }else {
                    toast.error(response.msg, toastOptions);
                }
            })
        }
    }
    
    return( 
        <section id="account-page">
            {!noUsers ?
            <>
            <div className="user"> 
                {user ? 
                    <>
                        <div className="profile-picture-wrapper gradient-border" onDragOver={handleDragOver} onDrop={e => {handleDragImage(e)}} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave}>
                            <img src={updatedUserImage ? URL.createObjectURL(updatedUserImage) : `${profilePictureRoute}/${user._id}`} alt="profile" className="profile-picture" />
                            {user._id === currentUser._id ? 
                            <>
                                <input ref={profilePictureInput} type="file" accept="image/*" onInput={handleShowUserImage} aria-label='profile-picture input' required className='hidden-input' />
                                <button type='button' className="focus-button" onClick={handleFocus}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="camera"><rect width="24" height="24" opacity="0"/><path d="M19 7h-3V5.5A2.5 2.5 0 0 0 13.5 3h-3A2.5 2.5 0 0 0 8 5.5V7H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-9-1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V7h-4zM20 18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z"/><path d="M12 10.5a3.5 3.5 0 1 0 3.5 3.5 3.5 3.5 0 0 0-3.5-3.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/></g></g></svg>
                                    <small>Change Image</small>
                                </button> 
                            </>   
                            : null}
                            {updatedUserImage ? 
                                <button type='button' className='cta' onClick={handleUpdateUserImage}>Update</button>
                            : null}
                        </div>
                        <p ref={usernameInput} className="username gradient-text" spellCheck='false' onInput={handleUsernameInput}>
                            {user.username}
                        </p>
                        {user.username === currentUser.username && !inEditMode ? <button className='helper-button' onClick={handleEditUsername}>Edit</button> : null}
                        <div className="edit-options">
                            {user.username === currentUser.username && inEditMode ? <button className='helper-button' onClick={handleEditUsername}>Cancel</button> : null}
                            {user.username === currentUser.username && inEditMode && canSaveUsername ? <button className='cta' onClick={handleUpdateUsername}>Save</button> : null}
                        </div>
                        {user._id === currentUser._id && !inEditMode ? <button className='logout-button' onClick={logout}>logout</button> : null}
                        {isLoading ? <Loader />: null}
                    </>
                    : null
                }
                {!user ? 
                <>
                    <ProfilePictureSkeleton/>
                    <UsernameSkeleton/>
                    </>    
                : null}
            </div>
            <IssuesWrapper issues={issues} noIssues={noIssues}/>
            </>
            : <h3 className='not-found-hint'>Sorry this user could not be found.</h3>}
            <ToastContainer/>
        </section>
    )
}

export default AccountPage;