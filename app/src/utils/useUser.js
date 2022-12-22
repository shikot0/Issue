import {useState, useEffect} from 'react';
import {getUserRoute} from './APIRoutes';

function useUser(username) {
    const [user, setUser] = useState('');
    let savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
  
    useEffect(() => {
        if(username) {
            fetch(`${getUserRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
        }else if(savedUser) {
            fetch(`${getUserRoute}/${savedUser.username}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
        }
    },[username,savedUser]); 

    return user
}

export default useUser;