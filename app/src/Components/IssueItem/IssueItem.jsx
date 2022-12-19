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
        }, 50)
    }

    return (
        <motion.article
        animate={{opacity: 1}} 
        initial={{opacity: 0}} 
        exit={{opacity: 0}} 
        layout className="issue" onMouseMove={handleMouseMove}>
            <small className="issue-company-name">Google</small>
            <div className="issue-main">
                <h3 className="issue-name">{issue.name}</h3>
                <p className="issue-description">{truncate(issue.description, 80)}</p>
            </div>
        </motion.article>
    )
}

export default IssueItem;