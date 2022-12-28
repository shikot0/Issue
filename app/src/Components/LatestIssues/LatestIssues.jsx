import {useState, useRef} from 'react';
import IssueItem from "../IssueItem/IssueItem";
import {IssueSkeleton} from '../../Skeletons/Skeletons';
import './LatestIssues.css';
import { useEffect } from 'react';
import { getLatestIssuesRoute } from '../../utils/APIRoutes';
function LatestIssues() {
    const [issues, setIssues] = useState([]);
    const slider = useRef();
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [noIssues, setNoIssues] = useState(false);

    useEffect(() => {
        fetch(getLatestIssuesRoute).then(res => res.json())
        .then(data => {
            if(data.length !== 0) {
                setIssues(data);
            }else {
                setNoIssues(true);
            }
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
        {!noIssues ? <div ref={slider} className="latest-issues-wrapper"
         onMouseDown={handleMouseDown}
         onMouseLeave={handleMouseUp}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         >
            {issues.length !== 0 ? issues.map((issue,index) => {
                return <IssueItem key={index} issue={issue}/>
            }): null}
            {issues.length && !noIssues === 0 ? 
                <>
                <IssueSkeleton/>
                <IssueSkeleton/>
                <IssueSkeleton/>
                <IssueSkeleton/>
                </>
            : null}
        </div> : null}
        {noIssues ? 
            <h2>There have been no issues reported today.</h2>
        : null}
        </>
    )
}

export default LatestIssues;