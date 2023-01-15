// export const host = 'http://localhost:5000';  
export const host  = 'https://issue-j83z.onrender.com';

//          USER ROUTES
export const loginRoute = `${host}/api/user/login`;
export const registerRoute = `${host}/api/user/register`;
export const getUserRoute = `${host}/api/user/user`;
export const getCurrentUserRoute = `${host}/api/user/currentuser`;
export const setProfilePictureRoute = `${host}/api/user/setprofilepicture`;
export const getProfilePictureRoute = `${host}/api/user/profilepicture`;

//          ISSUE ROUTES
export const createIssueRoute = `${host}/api/issue/createissue`;
export const setIssueScreenshotRoute = `${host}/api/issue/setissuescreenshot`;
export const editIssueRoute = `${host}/api/issue/editissue`;
export const IssueScreenshotRoute = `${host}/api/issue/issuescreenshot`;
export const allIssuesRoute = `${host}/api/issue/allissues`;
export const getIssuesFromWebsiteRoute = `${host}/api/issue/issuesfromwebsite`;
export const issueRoute = `${host}/api/issue/issue`;
export const latestIssuesRoute = `${host}/api/issue/latestissues`;


//          WEBSITE ROUTES
export const registerWebsiteRoute = `${host}/api/website/register`;
export const websiteImageRoute = `${host}/api/website/websiteimage`;
export const setWebsiteImageRoute = `${host}/api/website/setwebsiteimage`;
export const getWebsiteRoute = `${host}/api/website/website`;
export const getAllRegisteredWebsitesRoute = `${host}/api/website/allwebsites`;