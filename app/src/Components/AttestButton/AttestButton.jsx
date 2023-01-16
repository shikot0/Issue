import { attestIssueRoute } from '../../utils/APIRoutes';
import {useState, useRef} from 'react';
import './AttestButton.css';

function AttestButton({issueId, attests, setAttests}) {
    const [attested, setAttested] = useState(false);
    const attestsWrapper = useRef();
    function handleAttest() {
        if(!attested) {
            setAttested(true);
            setAttests(prev => prev+1);
            attestsWrapper.current.classList.add('gradient-text');
            fetch(`${attestIssueRoute}/${issueId}/attest`, {
                method: 'PUT'
            })
        }else {
            setAttested(false);
            setAttests(prev => prev-1);
            attestsWrapper.current.classList.remove('gradient-text');
            fetch(`${attestIssueRoute}/${issueId}/removeattest`, {
                method: 'PUT'
            })
        }
    }

    return(
        <div className="attest-wrapper">
            <h3 ref={attestsWrapper} className='attests'>{attests}</h3>
            <button type='button' className='attest-button' onClick={handleAttest}>Attest</button>
        </div>
    )
}
export default AttestButton;