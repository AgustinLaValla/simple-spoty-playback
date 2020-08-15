import React, { useState, useEffect } from 'react'
import { Track } from './interfaces/Item.interface'
import { hash, loginUrl } from './spotify'
import { Player } from './components/Player'
import axios from 'axios'

const initialItemState: Track = {
  track_window: {
    current_track: {
      album: {
        images: [{ url: '' }]
      },
      name: '',
      artists: [{ name: '' }],
      duration_ms: 0
    }
  },
  paused: true,
  position: 0,
  duration: 0
}

function App (): JSX.Element {
  const [token, setToken] = useState<string | null>(null)
  const [deviceId, setDeviceId] = useState<string>()
  const [item, setItem] = useState<Track>(initialItemState)
  const [context, setContext] = useState<string>('')
  const [player, setPlayer] = useState<any>()
  const [spotify, setSpotify] = useState()
  let initPlayerInterval: NodeJS.Timeout

  const checkForPlayer = (token: string) => {
    if (
      (window as any).Spotify !== null &&
      (window as any).Spotify !== undefined
    ) {
      setPlayerInterval('stop-Interval', token)
      setSpotify((window as any).Spotify)
    }
  }

  const setPlayerInterval = (action: string, token: string) => {
    if (action === 'init') {
      initPlayerInterval = setInterval(() => checkForPlayer(token), 1000)
    } else {
      clearInterval(initPlayerInterval)
    }
  }

  const transferPlayBackHere = async (device_id: string) => {
    try {
      await axios.put(
        'https://api.spotify.com/v1/me/player',
        { device_ids: [device_id], play: false },
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const _token: string = hash.access_token
    if (_token) {
      setToken(_token)
      setPlayerInterval('init', _token)
    }
  }, [])

  useEffect(() => {
    console.log(spotify)
    if (spotify) {
      setPlayer(
        new (window as any).Spotify.Player({
          name: 'Web developer sdk',
          getOAuthToken: (cb: any) => {
            cb(token)
          },
          volume: 1
        })
      )
    }
  }, [spotify])

  useEffect(() => {
    if (player) {
      player.addListener('ready', async ({ device_id }) => {
        await setDeviceId(device_id)
        await transferPlayBackHere(device_id)
      })

      player.connect(state => console.log(state))
      
      setInterval(async () => {
        const state = await player.getCurrentState()
        if (state) {
          setContext(state.context.ui)
          setItem(state)
        }
      }, 1000)
    }
  }, [player])

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

        {token && (
          <Player
            player={player}
            track_window={item.track_window}
            paused={item.paused}
            position={item.position}
            token={token}
            context={context}
            duration={item.duration}
          />
        )}
      </header>
    </div>
  )
}

export default App
