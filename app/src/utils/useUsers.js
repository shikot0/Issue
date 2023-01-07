import {useState, useEffect} from 'react';
import {getUserRoute} from './APIRoutes';
import {getCurrentUserRoute} from './APIRoutes';

function useUsers(username) {
    // username = username.toLowerCase();
    // let name = username.toLowerCase();
    const [user, setUser] = useState('');
    
    useEffect(() => {
        if(username) {
            fetch(`${getUserRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
            }).catch(err => {
                console.error(err.message)
            })
        }else{
            let savedUser = document.cookie ? document.cookie.split('=')[1] : '';
            if(savedUser) {
                fetch(`${getCurrentUserRoute}/${savedUser}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    // console.log(data)
                }).catch(err => {
                    console.error(err.message)
                })
            }
        }
    },[username]); 

    return user
}

export default useUsers;