import React, { useState, useEffect } from 'react'
import { Track, Item } from './interfaces/Item.interface'
import { hash, loginUrl } from './spotify'
import { Player } from './components/Player'
import axios from 'axios'

const initialItemState: Track = {
  item: {
    album: {
      images: [{ url: '' }]
    },
    name: '',
    artists: [{ name: '' }],
    duration_ms: 0,
    track_number:0
  },
  is_playing: false,
  progress_ms: 0,
  no_data: false,
}

const setHeaders = (token: string) => ({
  headers: { Authorization: 'Bearer ' + token }
})

const url: string = 'https://api.spotify.com/v1/me/player';

const getQuery = async (token:string, params:string = '') => await axios.get(`${url}/${params}`, setHeaders(token));  

function App (): JSX.Element {
  const [token, setToken] = useState<string | null>(null)
  const [item, setItem] = useState<Track>(initialItemState)
  const [context, setContext] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);

  const getCurrentlyPlaying = async (token: string) => {
    try {
      const { data } = await getQuery(token);

      if (!data) {
        setItem({ ...item, no_data: true })
        return
      }

      setItem({
        ...item,
        item: data.item,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
        no_data: false
      })

      setContext(data.context.uri);

    } catch (error) {
      console.log(error)
    }
  }

  const getRecentlyPlayed = async (token:string) => {
    const { data } = await getQuery(token, 'recently-played?type=track&limit=1');
    console.log(data.items[0]);
    setContext(data.items[0].context.uri);
    setItem({...item, item: data.items[0].track});
  } 

  useEffect(() => {
    const _token: string = hash.access_token
    if (_token) {
      setToken(_token)
      if(playing) {
        setInterval(() => getCurrentlyPlaying(_token), 1000)
      }
      getRecentlyPlayed(_token);
    }
  }, [playing])

  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src='https://w7.pngwing.com/pngs/556/55/png-transparent-spotify-android-music-mobile-phones-computer-icons-android-logo-grass-mobile-phones.png'
          alt='logo'
          className='App-logo'
        />
        {!token && (
          <a href={loginUrl} className='btn btn--loginApp-link'>
            Login to Spotify
          </a>
        )}

        {token &&  (
          <Player
            item={item.item}
            is_playing={item.is_playing}
            progress_ms={item.progress_ms}
            token={token}
            context={context}
            setPlaying={setPlaying}
          />
        )}

      </header>
    </div>
  )
}

export default App
