import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import IssueItem from "../IssueItem/IssueItem";
import {IssueItemSkeleton} from '../../Skeletons/Skeletons';
import { latestIssuesRoute } from '../../utils/APIRoutes';
import './LatestIssues.css';

function LatestIssues() {
    const [issues, setIssues] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [noIssues, setNoIssues] = useState(false);
    const navigate = useNavigate();
    const slider = useRef();

    useEffect(() => {
        fetch(latestIssuesRoute).then(res => res.json())
        .then(data => {
            if(data.length !== 0) {
                setIssues(data);
            }else {
                setNoIssues(true);
            }
        }).catch(err => {
            console.error(err.message)
        })
    },[])

    function handleMouseDown(e) {
        e.preventDefault();
        if(e.target.classList.contains('issue-item')) {
            if(e.buttons === 4) {
                window.open(`/issue/${e.target.dataset.id}`, '_blank');
            }
        }
        setIsMouseDown(true);
        setStartX(e.pageX - slider.current.offsetLeft);
        setScrollLeft(slider.current.scrollLeft);
    }

    function handleMouseUp() {
        setIsMouseDown(false)
    }

    function handleMouseMove(e) {
        e.preventDefault();
        if(!isMouseDown) return;
        const x = e.clientX;
        const walk = (x - startX) * 1.25;
        slider.current.scrollLeft = scrollLeft - walk;
    }


    function handleWrapperItemClick(e) {
        if(e.target.classList.contains('issue-item')) {
            navigate(`/issue/${e.target.dataset.id}`);
        }
    }

    return (
        <>
        {!noIssues ? 
            <div ref={slider} className="latest-issues-wrapper"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onClick={handleWrapperItemClick}
            >
                {issues.length !== 0 ? issues.map((issue,index) => {
                    // return <IssueItem key={index} issue={issue} onClick={handleNavigate(issue)}/>
                    // return <Link to={`/issue/${issue._id}`} key={index}><IssueItem issue={issue}/></Link>
                    return <IssueItem key={index} issue={issue}/>
                }):
                <>
                    <IssueItemSkeleton/>
                    <IssueItemSkeleton/>
                    <IssueItemSkeleton/>
                    <IssueItemSkeleton/>
                    <IssueItemSkeleton/>
                </>}
            </div>
            : <h2>There have been no issues reported today.</h2>}
        </>
    )
}

export default LatestIssues;