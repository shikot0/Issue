import {useNavigate} from 'react-router-dom';
// import {Link} from 'react-router-dom';
import Issue from '../../Components/Issue/Issue';
import useIssues from '../../utils/useIssues';
import './IssueListPage.css';

function IssueListPage() {
    const {issues, noIssues} = useIssues();
    const navigate = useNavigate();

    function handleWrapperItemClick(e) {
        if(e.target.classList.contains('issue')) {
            navigate(`/issue/${e.target.dataset.id}`)
        }
    }
    
    return (
        <section id="issue-list-page">
            <div className="issue-grid" onClick={handleWrapperItemClick}>
                {issues.length !== 0 && !noIssues ? issues.map((issue, index) => {
                    return <Issue key={index} issue={issue}/>
                }): null}
            </div>
        </section>
    )
}

export default IssueListPage;