export const host = 'http://localhost:5000'; 
// export const host  = 'https://issue-j83z.onrender.com';
export const loginRoute = `${host}/api/user/login`;
export const registerRoute = `${host}/api/user/register`;
export const getUserRoute = `${host}/api/user/user`;
export const getCurrentUserRoute = `${host}/api/user/currentuser`;
export const setProfilePictureRoute = `${host}/api/user/setprofilepicture`;
export const getProfilePictureRoute = `${host}/api/user/profilepicture`;

export const createIssueRoute = `${host}/api/issue/createissue`;
export const setIssueScreenshotRoute = `${host}/api/issue/setissuescreenshot`;
export const IssueScreenshotRoute = `${host}/api/issue/issuescreenshot`;
export const allIssuesRoute = `${host}/api/issue/allissues`;
export const issueRoute = `${host}/api/issue/issue`;
export const latestIssuesRoute = `${host}/api/issue/latestissues`;