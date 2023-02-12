import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import IssueItem from '../IssueItem/IssueItem';
import Loader from '../Loader/Loader';
import './IssuesWrapper.css';

function IssuesWrapper({issues, noIssues, website}) {
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();
    
    function handleFilter(e) {
        setFilter(e.target.value);
        let filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.classList.remove('selected');
        })
        e.target.classList.add('selected');
    };

    function handleWrapperItemClick(e) {
        // if(e.target.classList.contains('issue-item')) {
        //     navigate(`/issue/${e.target.dataset.id}`);
        // }
        if(e.target.classList.contains('issue-item')) {
            if(e.buttons === 4) {
                window.open(`/issue/${e.target.dataset.id}`)
            }else {
                navigate(`/issue/${e.target.dataset.id}`)
            }
        }
    }
    
    return (
        <>
        {!noIssues && issues.length !== 0 ? 
            <div className="issues-grid-wrapper">
                <div className="filter-buttons-wrapper">
                    <button type='button' className="filter-button selected" value={''} onClick={handleFilter}>All</button>
                    <button type='button' className="filter-button" value={'resolved'} onClick={handleFilter}>Resolved</button>
                    <button type='button' className="filter-button" value={'pending'} onClick={handleFilter}>Pending</button>
                </div>
                <motion.div
                layout 
                onMouseDown={handleWrapperItemClick}
                className="issues-wrapper">
                    <AnimatePresence>
                        {website ? 
                            <Link to={`/newissue/${website.name}`} className='add-issue-button gradient-bg'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
                            </Link>    
                        : null}
                        {issues.filter(issue => {
                            if(filter === 'resolved') {
                                return issue.resolved === true;
                            }else if(filter === 'pending') {
                                return issue.resolved === false;
                            }
                            else {
                                return issue;
                            }
                        }).map((issue,index) => {
                            return <IssueItem key={index} issue={issue}/>
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        : noIssues ? null : <Loader/>}

        {!website && noIssues ? <h3 className='no-issues-hint'>There are no issues</h3>: null}
        {website && noIssues ? <h3 className='no-issues-hint'>There are no issues, be the first to add one <Link to={`/newissue/${website.name.toLowerCase()}`}>here!</Link></h3> : null}
        </> 
    )
}

export default IssuesWrapper;