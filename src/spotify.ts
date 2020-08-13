const clientId = "e0350e15f4944046926a1b4425e62d59";

const authEndPoint = 'https://accounts.spotify.com/authorize';
const redirectUri = "http://localhost:3000/";

export const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial:any, item) => {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    }, {});


const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played',
    'user-modify-playback-state',
    "user-top-read"
];

export const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;