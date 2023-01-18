import {useState, useEffect} from 'react';
import {getUserRoute} from './APIRoutes';
import {getCurrentUserRoute} from './APIRoutes';

function useUsers(username) {
    const [user, setUser] = useState('');
    const [noUsers, setNoUsers] = useState(false);
    
    useEffect(() => {
        if(username) {
            fetch(`${getUserRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                if(data.noUser) {
                    setNoUsers(true)
                }
            }).catch(err => {
                console.error(err.message)
            })
        }else{
            let savedUser = document.cookie.split('=')[1] ? document.cookie.split('=')[1] : '';
            if(savedUser) {
                fetch(`${getCurrentUserRoute}/${savedUser}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    if(data.noUser) {
                        setNoUsers(true)
                    }
                }).catch(err => {
                    console.error(err.message)
                })
            }
        }
    },[username]); 

    return {user, noUsers}
}

export default useUsers;