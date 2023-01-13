import { useState, useEffect } from "react";
import { allIssuesRoute } from "./APIRoutes";
import { issueRoute } from "./APIRoutes";

function useIssues(username,id) {
    const [issues, setIssues] = useState([]);
    useEffect(() => {
        if(username) {
            fetch(`${allIssuesRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
            })
        }else if(!username && id) {
            fetch(`${issueRoute}/${id}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
            })
        }else {
            fetch(`${allIssuesRoute}/all`)
            .then(res => res.json())
            .then(data => {setIssues(data)})
        }
    },[id, username])
    return issues; 
}

export default useIssues;