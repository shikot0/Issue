import {useEffect, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {IssueSkeleton} from '../../Skeletons/Skeletons';
// import { issueScreenshotRoute } from '../../utils/APIRoutes';
import { ToastContainer } from 'react-toastify';
import useIssues from '../../utils/useIssues';
import useUsers from '../../utils/useUsers';
import Issue from '../../Components/Issue/Issue';
import './IssuePage.css';
import { useCookies } from 'react-cookie';

function IssuePage() {
    const {id} = useParams();
    const {issues: issue, noIssues} = useIssues(null,null,id);
    const {user} = useUsers(issue?.openedBy?.username);
    const [cookies] = useCookies(["token"]);
    const lightbox = useRef();
    const lightboxImage = useRef();
    const imageDownloadButton = useRef();
    const navigate = useNavigate();
    
    // const [attests, setAttests] = useState(0);
    // useEffect(() => {
    //     setAttests(issue?.attests);
    // },[issue])

    useEffect(() => {    
        // if(!localStorage.getItem('token')) {
        //     navigate('/register')
        // }
        if(!cookies.token) {
            navigate('/register')
        } 
    },[cookies.token, navigate]);

    function handleOpenLightbox(e) {
        const link = e.target.src;
        // console.log(e.target)
        if(lightbox.current && lightboxImage.current) {
            document.querySelector('#issue-page').style.minHeight = `${lightboxImage.current.clientHeight}px`;
            // document.querySelector('#issue-page').style.maxHeight = `${lightboxImage.current.clientHeight}px`;
            document.querySelector('.issue').style.display = 'none';
            lightbox.current.classList.add('visible');
            imageDownloadButton.current.href = link;
            lightboxImage.current.src = link;
            // console.log(lightbox.current)
        }
    }
    
    function handleCloseLightbox() {
        if(lightbox.current && lightboxImage.current) {
            document.querySelector('#issue-page').style.minHeight = '100vh';
            document.querySelector('.issue').style.display = 'flex';
            lightbox.current.classList.remove('visible');
        }
    }
    
    window.addEventListener('resize', () => {
        // console.log('resize')
        if(lightbox.current && lightboxImage.current && lightbox.current.classList.contains('visible')) {
            // console.log(lightboxImage.current.clientHeight)
            // console.log(document.querySelector('#issue-page'));
            document.querySelector('#issue-page').scrollTop = `${0}px`;
            document.querySelector('#issue-page').style.minHeight = `${lightboxImage.current.clientHeight}px`;
        }
    })

    // if(imageDownloadButton.current) {
    //     imageDownloadButton.current.addEventListener('click', e => {
    //         console.log(e)
    //         e.preventDefault();
    //     })
    // }
    return(
        <section id="issue-page">
        {!noIssues ?
            issue && user ?
            <>
                <Issue issue={issue} handleOpenLightbox={handleOpenLightbox}/>
                <div ref={lightbox} className="image-lightbox">
                    <button type='button' className='close-button' onClick={handleCloseLightbox}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
                    </button>
                    <img ref={lightboxImage} alt="issue" />
                    <a ref={imageDownloadButton} download={`${issue.name}`} href={`#issue-page`} className='screenshot-download-button'>Download</a>
                </div>
            </>
            : <IssueSkeleton/>
        : <h3>Sorry this issue could not be found</h3>}
        <ToastContainer/>
        </section>
    )
}

export default IssuePage;