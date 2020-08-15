import React from 'react'
import { TrackWindow } from '../interfaces/Item.interface'

export const Player = (props: {
  track_window: TrackWindow
  position: number
  paused: boolean
  token: string
  context: string
  player: any
  duration
}) => {
  const backgroundStyles = {
    backgroundImage: `url(${props.track_window?.current_track.album.images[0].url})`
  }
  const progressBarStyles = {
    width: (props.position * 100) / props.duration + '%'
  }

  const handlePlayIconClick = async () => await props.player.togglePlay()

  const goToNextTrack = async () => await props.player.nextTrack()

  const goToPreviousTrack = async () => await props.player.previousTrack()

  return (
    <div className='App'>
      {props.track_window && (
        <div className='main-wrapper'>
          <div className='now-playing__img'>
            <img src={props.track_window?.current_track?.album.images[0].url} />
          </div>
          <div className='now-playing__side'>
            <div className='now-playing__name'>
              {props.track_window?.current_track?.name}
            </div>
            <div className='now-playing__artist'>
              {props.track_window?.current_track.artists[0].name}
            </div>
            <div className='now-playing__status'>
              {!props.paused ? 'Playing' : 'Paused'}
            </div>
            <div className='progress'>
              <div className='progress__bar' style={progressBarStyles} />
            </div>
            <div className='playback-icons'>
              <i className='material-icons' onClick={goToPreviousTrack}>
                skip_previous
              </i>
              {props.paused ? (
                <i className='material-icons' onClick={handlePlayIconClick}>
                  play_circle_outline
                </i>
              ) : (
                <i className='material-icons' onClick={handlePlayIconClick}>
                  pause
                </i>
              )}
              <i className='material-icons' onClick={goToNextTrack}>
                skip_next
              </i>
            </div>
          </div>
          <div className='background' style={backgroundStyles} />{' '}
        </div>
      )}
    </div>
  )
}
