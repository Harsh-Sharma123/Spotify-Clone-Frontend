import './App.css';
import React, { useEffect, useState } from 'react';
import SongItem from './Components/songItem';

function App() {

  const [songs, setSongs] = useState([]);
  const [activeSong, setActiveSong] = useState(1);
  const [category, setCategory] = useState('For You');

  const myStyles = {
    backgroundColor: songs[activeSong]?.accent || 'red',
    backdropFilter: "blur(80px)"
  }

  function hexToRgba(hex) {
    hex = hex.replace('#', '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    console.log(`rgba(${r}, ${g}, ${b}, 0.2)`)
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  }
  
  const activeStyle = {
    backgroundColor: hexToRgba(songs[activeSong]?.accent || 'red'),
    borderRadius: "8px",
    border: "2px solid black",
    backdropFilter: "blur(40px)",
    // -webkit-backdrop-filter: blur(40px);
  }
  

  useEffect(()=>{
    fetch("https://cms.samespace.com/items/songs")
    .then(res => res.json())
    .then(data => {
      console.log(data.data)
      setSongs(data.data)
    });

    console.log(songs)
  }, []);

  // const fetchduration = (url)=>{
  //   const audioContext = new AudioContext(); 
  //   // Load the audio file 
  //   fetch(url) 
  //     .then(response => response.arrayBuffer()) 
  //     .then(buffer => audioContext.decodeAudioData(buffer)) 
  //     .then(audioBuffer => { 
  //       // Get the duration of the audio file 
  //       const duration = audioBuffer.duration; 
  //       console.log(`The audio file duration is ${duration} seconds`); 
  //     }); 
  // }

  return (
    <>
    <div className="main">
      <div className='left' style={myStyles}>
        <img src="./logo.svg" className='logo'>

        </img>
        <img src="./avatar.svg" className='avatar'></img>
      </div>
      <div className='middle' style={myStyles}>
        <div className='category'>{category}</div>
        <div className=''>
          <input type="text" className='searchBar' placeholder="Search Song, Artist"></input>
        </div>
        <div className='list'>


        {
          songs.map((song, id)=>(
            <>
            <div onClick={() => setActiveSong(id)} style={activeSong === id? activeStyle : {}}>
              <div className='songItem'>

                <img src={`https://cms.samespace.com/assets/${song.cover}`} className='songImg'  />
                <div className='songDetails'>
                  <div className='songName'>{song.name}</div>
                  <div className='songArtist'>{song.artist}</div>
                </div>
                <div className='duration'></div>
              </div>
             
                
            </div>
            {/* <SongItem song={song}/> */}
            </>
          ))
        }
                </div>
      </div>
      <div className='right' style={myStyles}>
        <SongItem song={songs[activeSong]? songs[activeSong] : ''} songs={songs} setActiveSong={setActiveSong} activeSong={activeSong} />
      </div>
      </div>
    </>
  );
}

export default App;
