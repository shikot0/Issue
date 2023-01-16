import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { registerRoute, loginRoute, setProfilePictureRoute } from '../../utils/APIRoutes';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterPage.css';

function RegisterPage() {
    const [currentUserImage, setCurrentUserImage] = useState();
    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "", 
        confirmPassword: "",
        profilePicture: {}
    });
    
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    
    const navigate = useNavigate();
    
    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
     

    useEffect(() => {
        if(document.cookie.split('=')[1]) {
            navigate('/home')
        }
    }, [navigate])


        
    function handleSignUp(e) {
        setSignUpData({...signUpData, [e.target.name]: e.target.value})
    }

    function handleLogin(e) {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }
    
    function handleShowUserImage(e) {
        if(e.target.files[0].size < 400000) {
            setCurrentUserImage(e.target.files[0]);
        }else {
            toast.error('Please choose a smaller image', toastOptions)
        }
    }

    async function handleSignUpValidation() {
        const {password, confirmPassword, email, username} = signUpData;
        if(password !== confirmPassword) {
            toast.error("The two passwords do not match", toastOptions);
        }else if(password.length < 8) {
            toast.error("Your password should be 8 characters or longer", toastOptions);
        }else if(username.length < 3) {
            toast.error("Your username should be 3 characters or longer", toastOptions);
        }else if(email === "") {
            toast.error("Please add your email", toastOptions);
        }else {
            document.querySelectorAll('form').forEach(form => {
                form.style.translate = `-200%`
            })        
        }
    }

    async function handleSetUserImage(e) {
        e.preventDefault();
        const {password, email, username} = signUpData;
        if(currentUserImage) {
            const formData = new FormData();
            formData.append('fileupload', currentUserImage);

            fetch(registerRoute, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username.toLowerCase(),
                    email,
                    password   
                })
            })
            .then(res => res.json()) 
              .then(data => {
                if(data.status === 200) {
                    document.cookie = `token=; expires=Thu, 01 Jan 1970T00:00:00Z;`
                    document.cookie = `token=${data.token}; Expires=${new Date(Date.now() + 1000000000000)}; Secure=true; SameSite=None`
                    fetch(`${setProfilePictureRoute}/${data.id}`, {
                        method: "POST",
                        body: formData
                    }).then(res => res.json())
                      .then(data => {
                        if(data.status === 200) {
                            console.log(data)
                            navigate('/home');
                        }
                    }).catch(err => {
                        console.error(err.message)
                    })
                }else {
                    toast.error(data.msg, toastOptions)
                }
               }).catch(err => {
                    console.error(err.message)
               })
        }else {
            toast.error('Please choose an image for your profile',toastOptions)
        }
    }

    async function handleLoginValidation() {
        const {username, password} = loginData;
        if(username === '') {
            toast.error("Please add your username", toastOptions);
        }else if(password === "") {
            toast.error("Please add your password", toastOptions);
        }else {
            const data = await fetch(loginRoute, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password    
                })
            }).catch(err => {
                console.error(err.message);
            })

            const response = await data.json();

            if(response.status === 400) {
                toast.error(response.msg, toastOptions);
            }else if(response.status === 200) {
                document.cookie = `token=; expires=Thu, 01 Jan 1970T00:00:00Z;`
                document.cookie = `token=${response.token}; Expires=${new Date(Date.now() + 1000000000000)}; Secure=true; SameSite=None`
                navigate('/home')
            }
        }
    }
    
    function handleSlideLeft() {
        document.querySelectorAll('form').forEach(form => {
            form.style.translate = `-100%`
        })
    }

    function handleSlideRight() {
        document.querySelectorAll('form').forEach(form => {
            form.style.translate = `0%`
        })
    }

    function handlePasswordVisiblity(e) {
        if(e.currentTarget.parentElement.childNodes[0].type === 'text') {
            e.currentTarget.parentElement.childNodes[0].type = 'password';
            e.currentTarget.childNodes[0].src = `${process.env.PUBLIC_URL}/icons/eye-outline.svg`;
        }else {
            e.currentTarget.parentElement.childNodes[0].type = 'text';
            e.currentTarget.childNodes[0].src = `${process.env.PUBLIC_URL}/icons/eye-off-outline.svg`;
        }
        // console.log(e.currentTarget)
    }

    return(
        <section id="register-page"> 
                <div className="form-wrapper">
                    <form>
                        <input type="text" name="username" placeholder='Username' onChange={e => {handleSignUp(e)}} aria-label='Username Input'/>
                        <input type="email" name="email" placeholder='Email' onChange={e => {handleSignUp(e)}} aria-label='Email Input'/>
                        <div className="password-input-wrapper">
                            <input type="password" name="password" placeholder='Password' onChange={e => {handleSignUp(e)}} aria-label='Password Input'/>
                            <button type='button' className='toggle-password-button' onClick={handlePasswordVisiblity}>
                                <img src={`${process.env.PUBLIC_URL}/icons/eye-outline.svg`} alt="" />
                            </button>
                        </div>
                        <div className="password-input-wrapper">
                            <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={e => {handleSignUp(e)}} aria-label='Confirm Password Input'/>
                            <button type='button' className='toggle-password-button' onClick={handlePasswordVisiblity}>
                                <img src={`${process.env.PUBLIC_URL}/icons/eye-outline.svg`} alt="" />
                            </button>
                        </div>
                        <button type="button" className="cta" onClick={handleSignUpValidation}>Next</button>
                        <p className="hint" onClick={handleSlideLeft}>Already have an account? <span>Login</span></p>
                    </form>
                    <form>
                        <input type="text" name="username" placeholder='Username' onChange={e => {handleLogin(e)}} aria-label='Username Input'/>
                        <div className="password-input-wrapper">
                            <input type="password" name="password" placeholder='Password' onChange={e => {handleLogin(e)}} aria-label='Password Input'/>
                            <button type='button' className='toggle-password-button' onClick={handlePasswordVisiblity}>
                                <img src={`${process.env.PUBLIC_URL}/icons/eye-outline.svg`} alt="" />
                            </button>
                        </div>
                        <button type="button" className="cta" onClick={handleLoginValidation}>Login</button>
                        <p className="hint" onClick={handleSlideRight}>Don't have an account? <span>Sign Up</span></p>
                    </form>
                    <form encType="multipart/form-data" className='profile-picture-form'>
                        <button type='button' className="form-back-button" onClick={handleSlideRight}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-left"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0 1 0 1.41 1 1 0 0 1-.72.29z"/></g></g></svg>
                            back
                        </button>
                        <h2>Set your profile picture</h2>
                        <div className="image-container">
                            <img className={currentUserImage ? 'profile-photo' : 'hidden'} src={currentUserImage ? URL.createObjectURL(currentUserImage) : `${process.env.PUBLIC_URL}/logos/person-outline.svg`} alt="profile" />
                        </div>
                        <input type="file" accept="image/*" onInput={handleShowUserImage}/>
                        <button type='button' className='cta' onClick={handleSetUserImage}>Submit</button>
                    </form>
                </div>
            <ToastContainer/>
        </section>
    )
}

export default RegisterPage;