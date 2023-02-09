import {useRef} from 'react';
import {useParams} from 'react-router-dom';
import {IssueSkeleton} from '../../Skeletons/Skeletons';
import { issueScreenshotRoute } from '../../utils/APIRoutes';
import { ToastContainer } from 'react-toastify';
import useIssues from '../../utils/useIssues';
import useUsers from '../../utils/useUsers';
import Issue from '../../Components/Issue/Issue';
import './IssuePage.css';

function IssuePage() {
    const {id} = useParams();
    const {issues: issue, noIssues} = useIssues(null,null,id);
    const {user} = useUsers(issue?.openedBy?.username);
    const lightbox = useRef();
    const lightboxImage = useRef();
    
    // const [attests, setAttests] = useState(0);
    // useEffect(() => {
    //     setAttests(issue?.attests);
    // },[issue])

    function handleOpenLightbox() {
        if(lightbox.current && lightboxImage.current) {
            document.querySelector('#issue-page').style.minHeight = `${lightboxImage.current.clientHeight}px`;
            // document.querySelector('#issue-page').style.maxHeight = `${lightboxImage.current.clientHeight}px`;
            document.querySelector('.issue').style.display = 'none';
            lightbox.current.classList.add('visible');
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
        console.log(lightboxImage.current)
        if(lightbox.current && lightboxImage.current && lightbox.current.classList.contains('visible')) {
            // console.log(lightboxImage.current.clientHeight)
            // console.log(document.querySelector('#issue-page'));
            document.querySelector('#issue-page').scrollTop = `${0}px`;
            document.querySelector('#issue-page').style.minHeight = `${lightboxImage.current.clientHeight}px`;
        }
    })

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
                    <img ref={lightboxImage} src={`${issueScreenshotRoute}/${issue._id}`} alt="issue" />
                </div>
            </>
            : <IssueSkeleton/>
        : <h3>Sorry this issue could not be found</h3>}
        <ToastContainer/>
        </section>
    )
}

export default IssuePage;