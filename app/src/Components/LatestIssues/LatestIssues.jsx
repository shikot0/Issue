import {useState, useRef} from 'react';
import IssueItem from "../IssueItem/IssueItem";
import useIssues from "../../utils/useIssues";
import {IssueSkeleton} from '../../Skeletons/Skeletons';
import './LatestIssues.css';
import { useEffect } from 'react';
function LatestIssues() {
    const issues = useIssues();
    const slider = useRef();
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [noIssues, setNoIssues] = useState(false);

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
        <div ref={slider} className="latest-issues-wrapper"
         onMouseDown={handleMouseDown}
         onMouseLeave={handleMouseUp}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         >
            {issues.length !== 0 ? issues.map((issue,index) => {
                return <IssueItem key={index} issue={issue}/>
            }): null}
            {issues.length === 0 ? 
                <>
                <IssueSkeleton/>
                <IssueSkeleton/>
                <IssueSkeleton/>
                </>
            : null}
        </div>
    )
}

export default LatestIssues;