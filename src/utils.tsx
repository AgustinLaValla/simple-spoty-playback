export const setHeaders = (token: string) => ({
  headers: { Authorization: 'Bearer ' + token }
})

export const url: string = 'https://api.spotify.com/v1/me/player';


