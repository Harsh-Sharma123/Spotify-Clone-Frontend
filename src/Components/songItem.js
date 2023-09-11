import React, { useEffect, useState } from 'react'
import './songItem.css'

export default function SongItem(props) {
  
  console.log("props : ",props.song)
  console.log(props.song.name)

  const [audioURL, setAudioURL] = useState('');

  useEffect(() => {
    // const audio = new Audio(props.song.url);
    // // if(audio.paused) // Replace with your audio file URL
    //   audio.play();

    // Optional: You can add event listeners for other audio events (e.g., 'ended', 'pause', etc.)
    // For example:
    // audio.addEventListener('ended', () => {
    //   console.log('Audio ended');
    // });

    // Clean up audio when component is unmounted
    // return () => {
    //   audio.pause();
    //   audio.currentTime = 0;
    // };
  }, []);

  const handleClick = ()=>{
    // console.log(document.getElementById("audio").play())
    // document.getElementById("audio").play();
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
        <div className='controls'>
            {/* <audio id="audio" controls>
              <source src={props.song.url} type="audio/mp3"></source>
            </audio>
            */}
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
