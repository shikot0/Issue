import {useParams} from 'react-router-dom';
import {IssueSkeleton} from '../../Skeletons/Skeletons';
import useIssues from '../../utils/useIssues';
import useUsers from '../../utils/useUsers';
import Issue from '../../Components/Issue/Issue';
import { ToastContainer } from 'react-toastify';
import './IssuePage.css';

function IssuePage() {
    const {id} = useParams();
    const {issues: issue, noIssues} = useIssues(null,null,id);
    const {user} = useUsers(issue?.openedBy?.username);
    
    // const [attests, setAttests] = useState(0);
    // useEffect(() => {
    //     setAttests(issue?.attests);
    // },[issue])



    return(
        <section id="issue-page">
        {!noIssues ?
            issue && user ?
                <Issue issue={issue}/>
            : <IssueSkeleton/>
        : <h3>Sorry this issue could not be found</h3>}
        <ToastContainer/>
        </section>
    )
}

export default IssuePage;