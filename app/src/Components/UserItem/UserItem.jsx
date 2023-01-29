import { profilePictureRoute } from '../../utils/APIRoutes';
import './UserItem.css';

function UserItem({user, handleClick}) {
    return (
    <div className="user-item" onClick={() => {handleClick(user)}}>
        <div className="profile-picture-wrapper">
            {user && user._id ? <img src={`${profilePictureRoute}/${user._id}`} className='profile-picture' alt="profile" /> :
            <img src={`${process.env.PUBLIC_URL}/icons/person-outline.svg`} className='profile-picture' alt='profile' />}
        </div>
        {user ? <p className="username">{user.username}</p> : null}
    </div>
    )
}

export default UserItem;