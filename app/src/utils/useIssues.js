import { useState, useEffect } from "react";
import { getAllIssuesRoute } from "./APIRoutes";

function useIssues(username) {
    const [issues, setIssues] = useState([]);
    useEffect(() => {
        if(username) {
            fetch(`${getAllIssuesRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
            })
        }else {
            fetch(`${getAllIssuesRoute}/all`)
            .then(res => res.json())
            .then(data => {setIssues(data)})
        }
    },[username])
    return issues; 
}

export default useIssues;