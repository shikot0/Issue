import { useState, useEffect } from "react";
import { allIssuesRoute, issueRoute,  getIssuesFromWebsiteRoute } from "./APIRoutes";

function useIssues(username,website,id) {
    const [issues, setIssues] = useState([]);
    const [noIssues, setNoIssues] = useState(false);
    useEffect(() => {
        if(username) {
            fetch(`${allIssuesRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
                if(data.length === 0) {
                    setNoIssues(true);
                }
            })
        }else if(!username && website) {
            fetch(`${getIssuesFromWebsiteRoute}/${website}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
                if(data.length === 0) {
                    setNoIssues(true);
                }
            console.log(data)
        })
        }else if(!username && id) {
            fetch(`${issueRoute}/${id}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
                if(data.length === 0) {
                    setNoIssues(true);
                }
            })
        }else {
            fetch(`${allIssuesRoute}/all`)
            .then(res => res.json())
            .then(data => {
                setIssues(data)
            })
        }
    },[username, website, id])
    return {issues, noIssues}; 
}

export default useIssues;