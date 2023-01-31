import {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import useIssues from '../../utils/useIssues';
import useWebsites from '../../utils/useWebsites';
import useUsers from '../../utils/useUsers';
import IssuesWrapper from '../../Components/IssuesWrapper/IssuesWrapper';
import { websiteImageRoute, websiteRoute } from '../../utils/APIRoutes';
import { HeaderSkeleton, ImageSkeleton } from '../../Skeletons/Skeletons';
import {toast, ToastContainer} from 'react-toastify';
import UserItem from '../../Components/UserItem/UserItem';
import './WebsitePage.css';

function WebsitePage() {
    const [query, setQuery] = useState('');
    const {name} = useParams();
    // const {websites: website, noWebsites} = useWebsites(name);
    const {websites: returnedWebsite, noWebsites} = useWebsites(name);
    const [website, setWebsite] = useState({});
    const {issues} = useIssues(null, name, null);
    const {user: currentUser} = useUsers();
    const {user: users} = useUsers('all');
    const tooltip = useRef();
    const adminInput = useRef();
    const usersWrapper = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/register')
        }
    },[navigate]);

    useEffect(() => {
        if(returnedWebsite) {
            setWebsite(returnedWebsite);
        }
    }, [returnedWebsite])

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const formatter = Intl.NumberFormat('en', {notation: 'compact'});

    function formatNum(num) {
        let number = formatter.format(num);
        return number;
    }

    function toggleTooltip(tooltip) {
        if(tooltip.classList.contains('visible')) {
            tooltip.classList.remove('visible')
        }else {
            tooltip.classList.add('visible')
        }
    }

    function handleAddAdmin(user) {
        if(user) {
            setWebsite({...website, admins: [...website.admins, user]});
            adminInput.current.value = '';
        }
    }

    function handleDeleteAdmin(user) { 
        let newAdmins = website.admins;
        let index = website.admins.indexOf(user);
        newAdmins.splice(index,1);
        setWebsite({...website, admins: [...newAdmins]}) 
    }

    function handleShowUsers() {
        usersWrapper.current.classList.add('visible');
    }

    function editWebsite() {
        fetch(`${websiteRoute}/${returnedWebsite._id}`, {
            headers: { "Content-Type": "application/json", "x-access-token": JSON.parse(localStorage.getItem('token'))},
            method: "POST",
            body: JSON.stringify({admins: website.admins})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) {
                toast.success(data.msg, toastOptions);
            }else {
                toast.error(data.msg, toastOptions);
            }
        })

    }


    return (
        <section id="website-page">
        {!noWebsites ? 
            <>
            <header>
            <div className="website-image-wrapper gradient-border">
                {website && website._id ? 
                <img src={`${websiteImageRoute}/${website._id}`} alt="website" className='website-image' /> : 
                <ImageSkeleton/>}
            </div>
            <div className="website-details-wrapper">
                {website ? 
                <p className="website-name gradient-text">{website.name}</p>
                : <HeaderSkeleton/>}
                <div className="detail">
                    {website && website.numberOfIssues ? <h3 className='detail-value'>{website ? formatNum(website.numberOfIssues) : 0}</h3> : null}
                    {website && website.numberOfIssues ? <p className='detail-name'>{website && website.numberOfIssues === 1 ? 'Issue' : 'Issues'}</p> : null}
                </div>
            </div>
            {returnedWebsite && website && returnedWebsite.registeredBy === currentUser.username && website.registeredBy === currentUser.username ? 
                <button type='button' className='open-tooltip-button' onClick={() => {toggleTooltip(tooltip.current)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="settings"><rect width="24" height="24" opacity="0"/><path d="M8.61 22a2.25 2.25 0 0 1-1.35-.46L5.19 20a2.37 2.37 0 0 1-.49-3.22 2.06 2.06 0 0 0 .23-1.86l-.06-.16a1.83 1.83 0 0 0-1.12-1.22h-.16a2.34 2.34 0 0 1-1.48-2.94L2.93 8a2.18 2.18 0 0 1 1.12-1.41 2.14 2.14 0 0 1 1.68-.12 1.93 1.93 0 0 0 1.78-.29l.13-.1a1.94 1.94 0 0 0 .73-1.51v-.24A2.32 2.32 0 0 1 10.66 2h2.55a2.26 2.26 0 0 1 1.6.67 2.37 2.37 0 0 1 .68 1.68v.28a1.76 1.76 0 0 0 .69 1.43l.11.08a1.74 1.74 0 0 0 1.59.26l.34-.11A2.26 2.26 0 0 1 21.1 7.8l.79 2.52a2.36 2.36 0 0 1-1.46 2.93l-.2.07A1.89 1.89 0 0 0 19 14.6a2 2 0 0 0 .25 1.65l.26.38a2.38 2.38 0 0 1-.5 3.23L17 21.41a2.24 2.24 0 0 1-3.22-.53l-.12-.17a1.75 1.75 0 0 0-1.5-.78 1.8 1.8 0 0 0-1.43.77l-.23.33A2.25 2.25 0 0 1 9 22a2 2 0 0 1-.39 0zM4.4 11.62a3.83 3.83 0 0 1 2.38 2.5v.12a4 4 0 0 1-.46 3.62.38.38 0 0 0 0 .51L8.47 20a.25.25 0 0 0 .37-.07l.23-.33a3.77 3.77 0 0 1 6.2 0l.12.18a.3.3 0 0 0 .18.12.25.25 0 0 0 .19-.05l2.06-1.56a.36.36 0 0 0 .07-.49l-.26-.38A4 4 0 0 1 17.1 14a3.92 3.92 0 0 1 2.49-2.61l.2-.07a.34.34 0 0 0 .19-.44l-.78-2.49a.35.35 0 0 0-.2-.19.21.21 0 0 0-.19 0l-.34.11a3.74 3.74 0 0 1-3.43-.57L15 7.65a3.76 3.76 0 0 1-1.49-3v-.31a.37.37 0 0 0-.1-.26.31.31 0 0 0-.21-.08h-2.54a.31.31 0 0 0-.29.33v.25a3.9 3.9 0 0 1-1.52 3.09l-.13.1a3.91 3.91 0 0 1-3.63.59.22.22 0 0 0-.14 0 .28.28 0 0 0-.12.15L4 11.12a.36.36 0 0 0 .22.45z" data-name="&lt;Group&gt;"/><path d="M12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5zm0-5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z"/></g></g></svg>
                </button> 
            : null}
            <div ref={tooltip} className="admins-tooltip">
                <div className="admins-wrapper">
                    {website && website.admins ? website.admins.map((admin, index) => {
                        return <UserItem key={index} user={admin} handleClick={handleDeleteAdmin}/>
                    }): null}
                </div>
                <button  className='save-button gradient-bg' onClick={editWebsite}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg> */}
                    Save
                </button>  
                <div className="input-wrapper">
                    <input ref={adminInput} value={query} onInput={e => {setQuery(e.target.value)}} className='admin-input' onFocus={handleShowUsers} type="text" name='admins' placeholder='e.g shikoto' aria-label='admins'/>
                    <div ref={usersWrapper} className="users-wrapper">
                        {users ? users.filter(user => {
                            if(user._id !== currentUser._id && website.admins && !website.admins.some(admin => admin.username === user.username) && user.username.includes(query)) {
                                return user;
                            }else {
                                return false
                            }
                        }).map((user, index) => {
                            return <UserItem key={index} user={user} handleClick={handleAddAdmin}/>
                        }) : null}
                    </div>
                </div>
            </div>
        </header>
        {website && website.name ? <IssuesWrapper issues={issues} website={website}/> : null}  
        </>  
        : <h3 className='not-found-hint'>Sorry this website could not be found.</h3>}
        <ToastContainer/>
        </section>
    )
}

export default WebsitePage;