import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import { registerRoute, loginRoute, profilePictureRoute } from '../../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify";
import {useCookies} from 'react-cookie';
import Loader from '../../Components/Loader/Loader';
import useUsers from '../../utils/useUsers';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterPage.css';

function RegisterPage() {
    const {user, noUsers} = useUsers();
    const [cookies, setCookie] = useCookies(["token"]);
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
    const [isLoading, setIsLoading] = useState(false);
    const emailInput = useRef();
    const imageInput = useRef();
    const navigate = useNavigate();
    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    // useEffect(() => {
    //     // setCookie("token", 'test', {
    //     //     path: '/',
    //     //     httpOnly: true,
    //     //     secure: true
    //     // })
    //     setCookie("token", "test")
    //     console.log(cookies)
    // }, [])
    // function handleFocus() {
        //     imageInput.current.click();
    // }
    
    // useEffect(() => {
    //     console.log({user, noUsers})
    //     if(!noUsers) {
    //         navigate('/home')
    //     } 
    // },[noUsers, navigate])

    // useEffect(() => {
    //     console.log({user, noUsers})
    //     // if(user === "") {
    //     //     navigate('/home')
    //     // }
    // }, [user, noUsers, navigate]);

    function handleShowUserImage(e) {
        e.preventDefault();
        if(e.target.files[0].size < 400000) {
            setCurrentUserImage(e.target.files[0]);
            e.target.classList.remove('drag-over');
        }else {
            toast.error('Please choose a smaller image', toastOptions)
        }
    };
    
    function handleDragImage(e) {
        e.preventDefault();
        if(e.dataTransfer.files[0].size < 1500000) {
            setCurrentUserImage(e.dataTransfer.files[0]);
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
     
    function handleSignUpData(e) {
        setSignUpData({...signUpData, [e.target.name]: e.target.value})
    }

    function handleLoginData(e) {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    async function handleSignUpValidation() {
        const {password, confirmPassword, email, username} = signUpData;
        if(password !== confirmPassword) {
            toast.error("The two passwords do not match", toastOptions);
        }else if(password.length < 8) {
            toast.error("Your password should be 8 characters or longer", toastOptions);
        }else if(username.length < 3) {
            toast.error("Your username should be 3 characters or longer", toastOptions);
        }else if(email === "" || !emailInput.current.validity.valid) {
            toast.error("Please add a valid email", toastOptions);
        }else {
            document.querySelectorAll('form').forEach(form => {
                form.style.translate = `-200%`
            })        
        }
    }

    async function handleSignUp(e) {
        e.preventDefault();
        const {password, email, username} = signUpData;
        if(password.length >= 8 && email !== "" && emailInput.current.validity.valid && username.length >= 3 && currentUserImage) {
            const formData = new FormData();
            formData.append('fileupload', currentUserImage);
            
            setIsLoading(true);
            
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
            .then(response => {
                if(response.succeeded) {
                    setCookie("token", response.token, {
                        path: '/',
                        secure: true,
                        sameSite: 'none',
                        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10))
                    })
                    fetch(`${profilePictureRoute}/${response.id}`, {
                        headers: { "x-access-token": response.token },
                        method: "POST",
                        body: formData
                    }).then(res => res.json())
                      .then(response => {
                            setIsLoading(false);
                            if(response.succeeded) {
                                navigate('/home');
                            }else {
                                toast.error(response.msg, toastOptions)
                            }
                    }).catch(err => {
                        console.error(err.message)
                    })
                }else {
                    setIsLoading(false);
                    toast.error(response.msg, toastOptions)
                }
            }).catch(err => {
                console.error(err.message)
            })
        }else {
            toast.error('Please check that all required fields are filled.',toastOptions)
        }
    }

    async function handleLoginValidation() {
        const {username, password} = loginData;
        if(username === '') {
            toast.error("Please add your username", toastOptions);
        }else if(password === "") {
            toast.error("Please add your password", toastOptions);
        }else {
            setIsLoading(true);
            fetch(loginRoute, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password    
                })
            })
            .then(res => res.json())
            .then(response => {
                if(response.succeeded) {
                    setCookie("token", response.token, {
                        path: '/',
                        secure: true,
                        sameSite: 'none',
                        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10))
                    })
                    setIsLoading(false);
                    navigate('/home')
                }else {
                    setIsLoading(false);
                    toast.error(response.msg, toastOptions);
                }
            }).catch(err => {
                console.error(err.message);
            })


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
                        <input type="text" name="username" placeholder='Username' onChange={e => {handleSignUpData(e)}} aria-label='Username Input' required/>
                        <input ref={emailInput} type="email" pattern='[a-zA-Z0-9._+-]+@[a-zA-Z0-9 -]+\.[a-z]{2,}' name="email" placeholder='Email' onChange={e => {handleSignUpData(e)}} aria-label='Email Input' required/>
                        <div className="password-input-wrapper">
                            <input type="password" name="password" placeholder='Password' onChange={e => {handleSignUpData(e)}} aria-label='Password Input' required/>
                            <button type='button' className='toggle-password-button' onClick={handlePasswordVisiblity}>
                                <img src={`${process.env.PUBLIC_URL}/icons/eye-outline.svg`} alt="" />
                            </button>
                        </div>
                        <div className="password-input-wrapper">
                            <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={e => {handleSignUpData(e)}} aria-label='Confirm Password Input' required/>
                            <button type='button' className='toggle-password-button' onClick={handlePasswordVisiblity}>
                                <img src={`${process.env.PUBLIC_URL}/icons/eye-outline.svg`} alt="" />
                            </button>
                        </div>
                        <button type="button" className="cta" onClick={handleSignUpValidation}>Next</button>
                        <p className="hint" onClick={handleSlideLeft}>Already have an account? <span>Login</span></p>
                    </form>
                    <form>
                        <input type="text" name="username" placeholder='Username' onChange={e => {handleLoginData(e)}} aria-label='Username Input' required/>
                        <div className="password-input-wrapper">
                            <input type="password" name="password" placeholder='Password' onChange={e => {handleLoginData(e)}} aria-label='Password Input' required/>
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
                        <div ref={imageInput} className="image-container gradient-border" onDragOver={handleDragOver} onDrop={e => {handleDragImage(e)}} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave}>
                            <img className={currentUserImage ? 'profile-photo' : 'hidden'} src={currentUserImage ? URL.createObjectURL(currentUserImage) : `${process.env.PUBLIC_URL}/logos/person-outline.svg`} alt="profile" />
                        </div>
                        <input type="file" accept="image/*" onInput={handleShowUserImage} aria-label='profile-picture input' required/>
                        <button type='button' className='cta' onClick={handleSignUp}>Submit</button>
                    </form>
                </div>
                {isLoading ? 
                    <Loader/>
                : null}
                <ToastContainer/>
        </section>
    )
}

export default RegisterPage;