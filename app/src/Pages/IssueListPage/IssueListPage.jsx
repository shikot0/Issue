import {useState, useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import Issue from '../../Components/Issue/Issue';
import useIssues from '../../utils/useIssues';
import { IssueSkeleton } from '../../Skeletons/Skeletons';
import './IssueListPage.css';

function IssueListPage() { 
    const [page, setPage] = useState(1);
    const {issues: returnedIssues} = useIssues(null, null, null, page);
    const [issues, setIssues] = useState(returnedIssues);
    const navigate = useNavigate();
    const intObserver = useRef();


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
            navigate(`/issue/${e.target.dataset.id}`)
        }
    }

    useEffect(() => {
        setIssues(prev => {
            return [...prev, ...returnedIssues];
        });
    }, [returnedIssues])

    
    return (
        <section id="issue-list-page">
            <div className="issue-grid" onClick={handleWrapperItemClick}>
                {issues.length !== 0 ? issues.map((issue, index) => {
                    if(index === issues.length-1) {
                        return <Issue key={index} issue={issue} lastPostRef={lastPostRef}/>
                    }
                    return <Issue key={index} issue={issue}/>
                }): 
                <>
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
                </>}
            </div>
        </section>
    )
}

export default IssueListPage;