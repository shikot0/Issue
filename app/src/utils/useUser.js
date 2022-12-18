import {useState, useEffect} from 'react';
import {getUserRoute} from './APIRoutes';

function useUser(id) {
    const [user, setUser] = useState('');
    let userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '';
  
    useEffect(() => {
        if(id) {
            fetch(`${getUserRoute}/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })

        }else if(userId) {
            fetch(`${getUserRoute}/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
        }
    },[id,userId]); 

    return user
}

export default useUser;