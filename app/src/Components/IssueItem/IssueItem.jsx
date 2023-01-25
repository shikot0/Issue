import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import './IssueItem.css';
function IssueItem({issue}) {
    function truncate(text, maxLength) {
        let newText;
        if(text.length > maxLength) {
            newText = `${text.slice(0, maxLength)}...`;
        }else {
            newText = text.slice(0, maxLength)
        }
        return newText;
    }

    function handleMouseMove(e) {
        const target = e.target;
        const rect = target.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;;
        setTimeout(() => {
            target.style.setProperty('--mouse-x', `${x}px`);
            target.style.setProperty('--mouse-y', `${y}px`);
        }, 25)
    }

    return (
        <motion.div  
        animate={{opacity: 1}}
        initial={{opacity: 0}}
        exit={{opacity: 0}}
        layout 
        onMouseMove={handleMouseMove}
        data-id={`${issue._id}`}
        className="issue-item">
            <small className="issue-website-name">{issue.website && issue.website.name ? issue.website.name: 'unknown name'}</small>
            <div className="issue-main">
                <h3 className="issue-name">{issue.name}</h3>
                <p className="issue-description">{truncate(issue.description, 50)}</p>
                <Link to={`/user/${issue.openedBy.username}`} className='issue-creator gradient-text'>{issue.openedBy.username}</Link>
                {/* <Link to={`/u/${issue.openedBy}`} className='issue-creator gradient-text'>{issue.openedBy}</Link> */}
            </div>
            <small className='issue-attests'>{issue.attests} {issue.attests === 1 ? 'attest' : 'attests'}</small>
            <div className={issue.resolved ? 'status resolved' : 'status pending'}></div>
        </motion.div>
    )
}

export default IssueItem;