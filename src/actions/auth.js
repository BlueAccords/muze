// import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';

// // From soundcloud API https://developers.soundcloud.com/docs/api/guide#search
// export function auth() {
//     // initialize SC client
//     SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

//     SC.connect().then((session) => {
//       fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
//         .then((response) => response.json())
//         .then((me) => {
//           console.log(me);
//         });
//     });
// }