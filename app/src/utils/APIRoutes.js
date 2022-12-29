export const host  = 'https://issue-j83z.onrender.com';
// require('dotenv').config()
// const host = process.env.SERVER;
export const loginRoute = `${host}/api/user/login`;
export const registerRoute = `${host}/api/user/register`;
export const getUserRoute = `${host}/api/user/getuser`;
export const setProfilePictureRoute = `${host}/api/user/setprofilepicture`;
export const getProfilePictureRoute = `${host}/api/user/getprofilepicture`;
export const createIssueRoute = `${host}/api/issue/createissue`;
export const setIssueScreenshotRoute = `${host}/api/issue/setissuescreenshot`;
export const getAllIssuesRoute = `${host}/api/issue/getallissues`;
export const getLatestIssuesRoute = `${host}/api/issue/getlatestissues`;