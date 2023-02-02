import { issueRoute } from '../../utils/APIRoutes';
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
            fetch(`${issueRoute}/${issueId}/attest`, {
                method: 'PUT'
            })
        }else {
            setAttested(false);
            setAttests(prev => prev-1);
            attestsWrapper.current.classList.remove('gradient-text');
            fetch(`${issueRoute}/${issueId}/removeattest`, {
                method: 'PUT'
            })
        }
    }

    return(
        <button type='button' className='attest-button' onClick={handleAttest}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-up"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1 2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1zM8 14h7.9L12 9.18z"/></g></g></svg>
            <h3 ref={attestsWrapper} className='attests'>{attests}</h3>
            {/* <button type='button' className='attest-button' onClick={handleAttest}>Attest</button> */}
        </button>
    )
}
export default AttestButton;