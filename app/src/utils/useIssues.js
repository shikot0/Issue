import { useState, useEffect } from "react";
import { allIssuesRoute, allIssuesFromUserRoute, issueRoute, getIssuesFromWebsiteRoute } from "./APIRoutes";

function useIssues(username, website, id, page=1) {
    const [issues, setIssues] = useState([]);
    const [noIssues, setNoIssues] = useState(false);

    useEffect(() => {
        if(username) {
            fetch(`${allIssuesFromUserRoute}/${username}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
                if(data.noIssues) {
                    setNoIssues(true);
                }
            }).catch(err => {
                console.log(err)
            })
        }else if(!username && website) {
            fetch(`${getIssuesFromWebsiteRoute}/${website}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
                if(data.noIssues) {
                    setNoIssues(true);
                }
            // console.log(data)
            }).catch(err => {
                console.log(err)
            })
        }else if(!username && id) {
            fetch(`${issueRoute}/${id}`)
            .then(res => {
                if(res.status === 500) {
                    setNoIssues(true);
                }else {
                    return res.json()
                }
            })
            .then(data => {
                setIssues(data);
                // console.log(data);
                if(data.noIssue) {
                    setNoIssues(true);
                }
            }).catch(err => {
                console.log(err)
            })
        }else {
            fetch(`${allIssuesRoute}/${page}`)
            .then(res => res.json()) 
            .then(data => {
                setIssues(data);
                if(data.noIssues) {
                    setIssues([]);
                }
                if(data.noIssues && page === 1) {
                    setNoIssues(true);
                }
            }).catch(err => {    
                console.log(err)
            })
        }
    },[username, website, id, page]);

    return {issues, noIssues}; 
}

export default useIssues;