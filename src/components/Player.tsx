import React from 'react'
import { Track, Item } from '../interfaces/Item.interface'

export const Player = (props: {
  item: Item
  progress_ms: number
  is_playing: string
}) => {
  const backgroundStyles = {
    backgroundImage: `url(${props.item?.album.images[0].url})`
  }
  const progressBarStyles = {
    width: (props.progress_ms * 100) / props.item?.duration_ms + '%'
  }
  return (
    <div className='App'>
      {props.item && props.progress_ms && props.progress_ms && (
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
          </div>
          <div className='background' style={backgroundStyles} />{' '}
        </div>
      )}
    </div>
  )
}
