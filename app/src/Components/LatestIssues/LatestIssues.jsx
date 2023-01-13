import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
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

    useEffect(() => {
        if(issues.length === 0) {
            setNoIssues(true);
        }else {
            setNoIssues(false);
        }
    },[issues])


    return (
        <>
        {!noIssues ? 
            <div ref={slider} className="latest-issues-wrapper"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {issues.length !== 0 ? issues.map((issue,index) => {
                    // return <IssueItem key={index} issue={issue} onClick={handleNavigate(issue)}/>
                    return <Link to={`/issue/${issue._id}`} key={index}><IssueItem issue={issue}/></Link>
                }):
                <>
                    <IssueItemSkeleton/>
                    <IssueItemSkeleton/>
                    <IssueItemSkeleton/>
                    <IssueItemSkeleton/>
                    <IssueItemSkeleton/>
                </>}
            </div> : null}
        {noIssues ? 
            <h2>There have been no issues reported today.</h2>
        : null}
        </>
    )
}

export default LatestIssues;