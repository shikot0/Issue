import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {allUsersRoute, userRoute} from './APIRoutes';
import {getCurrentUserRoute} from './APIRoutes';

function useUsers(username) {
    const [user, setUser] = useState('');
    const [noUsers, setNoUsers] = useState(false);
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    
    useEffect(() => {
        if(username && username !== 'all') {
            fetch(`${userRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                if(data.noUser) {
                    setNoUsers(true)
                }
            }).catch(err => {
                console.error(err.message)
            })
        }else if(username === 'all') {
            fetch(`${allUsersRoute}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                // console.log(data)
                if(data.noUser) {
                    setNoUsers(true);
                }
            })
        }else{
            // let savedUser = document.cookie.split('=')[1] ? document.cookie.split('=')[1] : '';
            // let savedUser = JSON.parse(localStorage.getItem('token'));
            if(token) {
                // fetch(`${getCurrentUserRoute}/${savedUser}`, {
                fetch(`${getCurrentUserRoute}`, {
                    headers: { "x-access-token": token },
                })
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    if(data.noUser) {
                        setNoUsers(true)
                    }
                }).catch(err => {
                    console.error(err.message)
                })
            }else {
                setUser('');
            }
        }
    },[username, token]); 

    return {user, noUsers}
}

export default useUsers;