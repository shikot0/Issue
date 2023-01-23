import {Link} from 'react-router-dom';
import Issue from '../../Components/Issue/Issue';
import useIssues from '../../utils/useIssues';
import './IssueListPage.css';

function IssueListPage() {
    const {issues, noIssues} = useIssues();
    console.log(issues)
    return (
        <section id="issue-list-page">
            <div className="issue-grid">
                {issues.length !== 0 && !noIssues ? issues.map((issue, index) => {
                    return <Link key={index} to={`/issue/${issue._id}`}><Issue issue={issue} /></Link>
                }): null}
            </div>
        </section>
    )
}

export default IssueListPage;