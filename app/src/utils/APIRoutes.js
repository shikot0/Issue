// export const host = 'http://localhost:5000';  
export const host  = 'https://issue-j83z.onrender.com';

//          USER ROUTES
export const loginRoute = `${host}/api/user/login`;
export const registerRoute = `${host}/api/user/register`;
export const getUserRoute = `${host}/api/user/user`;
export const getCurrentUserRoute = `${host}/api/user/currentuser`;
export const profilePictureRoute = `${host}/api/user/profilepicture`;
export const allUsersRoute = `${host}/api/user/allusers`;
export const markNotificationsAsReadRoute = `${host}/api/user/notifications`;

//          ISSUE ROUTES
export const createIssueRoute = `${host}/api/issue/createissue`;
export const issueRoute = `${host}/api/issue/issue`;
export const issueScreenshotRoute = `${host}/api/issue/issuescreenshot`;
export const allIssuesRoute = `${host}/api/issue/allissues`;
export const getIssuesFromWebsiteRoute = `${host}/api/issue/issuesfromwebsite`;
export const latestIssuesRoute = `${host}/api/issue/latestissues`;


//          WEBSITE ROUTES
export const registerWebsiteRoute = `${host}/api/website/register`;
export const websiteImageRoute = `${host}/api/website/websiteimage`;
export const getWebsiteRoute = `${host}/api/website/website`;
export const getAllRegisteredWebsitesRoute = `${host}/api/website/allwebsites`;