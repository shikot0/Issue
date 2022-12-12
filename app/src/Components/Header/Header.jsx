import './Header.css'
function Header() {
    let user;
    return (
        <header>
            <div className="logo">
                {/* <img src="" alt="" /> */}
                <a href="issue.com" className='logo'>ISSUE</a>
            </div>
            <nav>
                <div className="user">
                    <div className="profile-picture-div">
                        <img className='profile-picture' src={`${process.env.PUBLIC_URL}/pfp.jpg`} alt="" />
                    </div>
                    <p className="username">{user ? user.username : 'shikoto'}</p>
                </div>
            </nav>
        </header>
    )
}

export default Header;