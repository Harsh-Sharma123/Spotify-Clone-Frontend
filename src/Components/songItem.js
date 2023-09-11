import React, { useEffect, useState } from 'react'
import './songItem.css'

export default function SongItem(props) {
  
  console.log("props : ",props.song)
  console.log(props.song.name)

  const [audioURL, setAudioURL] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const [audio] = useState(new Audio(props.song.url)); 

  useEffect(() => {
    audio.pause(); 
    audio.currentTime = 0; 
    audio.play();
    const updateTime = () => {
      const newProgress = parseInt((audio.currentTime / audio.duration) * 100);
      setCurrentTime(audio.currentTime);
      setTotalTime(audio.duration)
      setProgress(newProgress);
    };

    audio.addEventListener('timeupdate', updateTime);


    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.pause(); 
      audio.currentTime = 0;
    };
  }, [audio]);

  const handleClick = ()=>{
    if(props.activeSong !== 0){
      props.setActiveSong(props.activeSong - 1);
    }
  }

  const handleRightClick = ()=>{
    if(props.activeSong < 9)
      props.setActiveSong(props.activeSong + 1);
  }

  const myStyles = {
    // backgroundColor: props.song.accent
  }

  const handlePlayPause = ()=>{
    const url = props.song.url;
    const audio = new Audio(url);
    const isPlaying = localStorage.getItem('playing');
    setAudioURL(url);

    if(url !== audioURL){
      console.log(url)
      audio.pause();
    }
    setAudioURL(url);
    audio.play();
  }

  return (
    <>
      <div className='song' style={myStyles}>
        <div className='details'>
          <div className='title'>{props.song.name}</div>
          <div className='artist'>{props.song.artist}</div>
        </div>
        <div className='image'>
          <img src={`https://cms.samespace.com/assets/${props.song.cover}`} className='songCover'/>
        </div>
        <div className='progressBar'>
          <input type="range" name="range" value={progress} class="progress" min="0" max="100" />
          <div className='timing'>
            <div className='currentTime'>{parseInt(currentTime/60)}:{parseInt(currentTime%60)}</div>
            <div className='totalTime'>{parseInt(totalTime/60)}:{parseInt(totalTime%60)}</div>
          </div>
        </div>
        <div className='controls'>
            <div className='controls'>
              <div className='options'>
                <img src="./options.svg"  className='option-icon'/>
              </div>
              <div className='controlers'>
                <img src="./previous.svg" onClick={handleClick} className='previous' />
                <img src="./play.svg" className='play' onClick={handlePlayPause}/>
                <img src="./next.svg" className='next' onClick={handleRightClick} />
              </div>
              <div className='speakers'>
                <img src="./speaker.svg" className='speaker' />
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
