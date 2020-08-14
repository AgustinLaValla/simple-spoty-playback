import React from 'react'
import { Track, Item } from '../interfaces/Item.interface'
import axios from 'axios'

const url: string = 'https://api.spotify.com/v1/me/player'
const setHeaders = (token: string) => ({
  headers: { Authorization: 'Bearer ' + token }
})

export const Player = (props: {
  item: Item
  progress_ms: number
  is_playing: boolean
  token: string
  context: string
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const backgroundStyles = {
    backgroundImage: `url(${props.item?.album.images[0].url})`
  }
  const progressBarStyles = {
    width: (props.progress_ms * 100) / props.item?.duration_ms + '%'
  }


  const startOrResumePlayBack = async () => {
    try {
        console.log({context:props.context, offset:props.item.track_number, position_ms:props.progress_ms})
      await axios.put(
        `${url}/play`,
        {
          context_uri: props.context,
          offset: { position: props.item.track_number - 1 },
          position_ms: props.progress_ms
        },
        setHeaders(props.token)
      );
      props.setPlaying(true)
    } catch (error) {
      console.log(error)
    }
  }

  const pausePlayBack = async (token:string) => {
    await axios.put(`${url}/pause`, {}, setHeaders(token));
  }

  const handlePlayIconClick = async () => {
    if (props.is_playing) {
      await pausePlayBack(props.token)
    } else {
      await startOrResumePlayBack()
    }
  }

  const goToNextTrack = async () => {
      await axios.post(`${url}/next`, {}, setHeaders(props.token));
  }

  const goToPreviousTrack = async () => {
    await axios.post(`${url}/previous`, {}, setHeaders(props.token));
  }

  return (
    <div className='App'>
      {props.item &&  (
        <div className='main-wrapper'>
          <div className='now-playing__img'>
            <img src={props.item?.album.images[0].url} />
          </div>
          <div className='now-playing__side'>
            <div className='now-playing__name'>{props.item?.name}</div>
            <div className='now-playing__artist'>
              {props.item?.artists[0].name}
            </div>
            <div className='now-playing__status'>
              {props.is_playing ? 'Playing' : 'Paused'}
            </div>
            <div className='progress'>
              <div className='progress__bar' style={progressBarStyles} />
            </div>
            <div className='playback-icons'>
              <i className='material-icons' onClick={goToPreviousTrack}>skip_previous</i>
              {!props.is_playing ? (
                <i className='material-icons' onClick={handlePlayIconClick}>play_circle_outline</i>
              ) : (
                <i className='material-icons' onClick={handlePlayIconClick}>pause</i>
              )}
              <i className="material-icons" onClick={goToNextTrack}>skip_next</i>
            </div>
          </div>
          <div className='background' style={backgroundStyles} />{' '}
        </div>
      )}
    </div>
  )
}
