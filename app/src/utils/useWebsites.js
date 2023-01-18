import { useState, useEffect } from "react";
import { getWebsiteRoute, getAllRegisteredWebsitesRoute } from "./APIRoutes";

function useWebsites(name) {
    const [websites, setWebsites] = useState();
    const [noWebsites, setNoWebsites] = useState(false);

    useEffect(() => {
        if(name) {
            fetch(`${getWebsiteRoute}/${name}`)
            .then(res => res.json())
            .then(data => {
                setWebsites(data);
                if(data.noWebsite) {
                    setNoWebsites(true);
                }
            })
        }else if(!name) {
            fetch(`${getAllRegisteredWebsitesRoute}`)
            .then(res => res.json())
            .then(data => {
                setWebsites(data);
                if(data.noWebsites) {
                    setNoWebsites(true);
                }
            })
        }
    }, [name])
    return {websites, noWebsites}
}

export default useWebsites;