import {useState, useEffect} from 'react';
import {getUserRoute} from './APIRoutes';

function useUsers(username) {
    // username = username.toLowerCase();
    // let name = username.toLowerCase();
    const [user, setUser] = useState('');
    
    useEffect(() => {
        if(username) {
            fetch(`${getUserRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
            
            // console.log(username)
        }else{
            let savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
            if(savedUser) {
                fetch(`${getUserRoute}/${savedUser.username}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                })
            }
        }
    },[username]); 

    return user
}

export default useUsers;