import React, { useState, useEffect } from 'react'
import { Track } from './interfaces/Item.interface'
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
    duration_ms: 0
  },
  is_playing: 'Paused',
  progress_ms: 0,
  no_data: false
}

function App (): JSX.Element {
  const [token, setToken] = useState<string | null>(null)
  const [item, setItem] = useState<Track>(initialItemState)
  const [dataState, setDataState] = useState(null);

  const getCurrentlyPlaying = async (token: string) => {
    try {
      const { data } = await axios('https://api.spotify.com/v1/me/player', {
        headers: { Authorization: 'Bearer ' + token }
      })
    
      setDataState(data);

      if (!data) {
        setItem({ ...item, no_data: true })
        return;
      }

      setItem({
        ...item,
        item: data.item,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
        no_data: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const _token: string = hash.access_token;
    if (_token) {
      setToken(_token)
      setInterval(() => getCurrentlyPlaying(_token), 1000);
    }
  }, [])

  useEffect(() => console.log(item, dataState),[item, dataState])

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

        {token && !item.no_data && (
          <Player
            item={item.item}
            is_playing={item.is_playing}
            progress_ms={item.progress_ms}
          />
        )}
        {item.no_data && (
          <p>
            {' '}
            You need to be playing a song on Spotify, for something to appear
            here.
          </p>
        )}
      </header>
    </div>
  )
}

export default App
