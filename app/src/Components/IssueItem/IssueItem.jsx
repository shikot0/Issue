import './IssueItem.css'
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
    return (
        <article className="issue">
            <small className="issue-company-name">Google</small>
            <div className="issue-main">
                <h3 className="issue-name">{issue.name}</h3>
                <p className="issue-description">{truncate(issue.description, 80)}</p>
            </div>
        </article>
    )
}

export default IssueItem;