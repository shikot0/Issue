import {useState, useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Issue from '../../Components/Issue/Issue';
import useIssues from '../../utils/useIssues';
import { IssueSkeleton } from '../../Skeletons/Skeletons';
import Loader from '../../Components/Loader/Loader';
import './IssueListPage.css';
import { useCookies } from 'react-cookie';

function IssueListPage() { 
    const [page, setPage] = useState(1);
    const [cookies] = useCookies(["token"]);
    // const [noIssues, setNoIssues] = useState(false);
    const {issues: returnedIssues, noIssues} = useIssues(null, null, null, page);
    const [issues, setIssues] = useState(returnedIssues);
    const intObserver = useRef();
    const navigate = useNavigate();

    useEffect(() => {    
        // if(!localStorage.getItem('token')) {
        //     navigate('/register')
        // }
        if(!cookies.token) {
            navigate('/register');
        } 
    },[cookies.token, navigate]);

    const lastPostRef = useCallback(issue => {
        if(intObserver.current) {
            intObserver.current.disconnect();
        }

        intObserver.current = new IntersectionObserver(issues => {
            if(issues[0].isIntersecting) {
                setPage(prev => prev+1);
            }
        })

        if(issue) {
            intObserver.current.observe(issue);
        }
    }, []);

    function handleWrapperItemClick(e) {
        if(e.target.classList.contains('issue')) {
            if(e.buttons === 4) {
                window.open(`/issue/${e.target.dataset.id}`)
            }else {
                navigate(`/issue/${e.target.dataset.id}`)
            }
        }else if(e.target.parentElement.parentElement.classList.contains('issue')) {
            if(e.buttons === 4) {
                window.open(`/issue/${e.target.parentElement.parentElement.dataset.id}`)
            }else {
                navigate(`/issue/${e.target.parentElement.parentElement.dataset.id}`)
            }
        }else if(e.target.parentElement.parentElement.parentElement.classList.contains('issue')) {
            if(e.buttons === 4) {
                window.open(`/issue/${e.target.parentElement.parentElement.parentElement.dataset.id}`)
            }else {
                navigate(`/issue/${e.target.parentElement.parentElement.parentElement.dataset.id}`)
            }
        }
    }

    useEffect(() => {
        setIssues(prev => {
            return [...prev, ...returnedIssues];
        });
    }, [returnedIssues])

    return (
        <section id="issue-list-page">
            <div className="issue-grid" onMouseDown={handleWrapperItemClick}>
                {!noIssues ? issues.length !== 0 ? 
                    // <Loader /> 
                    issues.map((issue, index) => {
                        if(index === issues.length-1) {
                            return <Issue key={index} issue={issue} lastPostRef={lastPostRef}/>
                        }
                        return <Issue key={index} issue={issue}/>
                    })
                    : <>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                        <IssueSkeleton/>
                    </>
                : <h2 className='not-found-hint'>No issues have been opened, please check back later.</h2>}
                {returnedIssues.length !== 0 && !noIssues ? <Loader/>: null}
            </div>
            <ToastContainer/>
        </section>
    )
}

export default IssueListPage;