import './App.css'
import { useState, useEffect, createRef } from 'react'

import track01 from '../src/assets/musics/track01.mp3'
import track02 from '../src/assets/musics/track02.mp3'
import track03 from '../src/assets/musics/track03.mp3'
import track04 from '../src/assets/musics/track04.mp3'
import track05 from '../src/assets/musics/track05.mp3'
import track06 from '../src/assets/musics/track06.mp3'
import track07 from '../src/assets/musics/track07.mp3'
import track08 from '../src/assets/musics/track08.mp3'
import track09 from '../src/assets/musics/track09.mp3'
import track10 from '../src/assets/musics/track10.mp3'

const musics = [track01, track02, track03, track04, track05, track06, track09, track10]

import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled, TbPlayerPlayFilled, TbPlayerPauseFilled } from 'react-icons/tb'

function App() {

  /* Timer config */
  const [timer, setTimer] = useState(0)

  /* Audio config */
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = createRef()
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(musics[trackIndex]);

  useEffect(() => {

    if (isPlaying) {
      audioRef.current.play();
      const interval = setInterval(() => {
        setTimer(time => time + 1)
      }, 100)

      return () => clearInterval(interval)
    } else {
      audioRef.current.pause();
    }

  }, [isPlaying, audioRef, timer])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const hour = Math.floor(minutes / 60)
    const seconds = time % 60;
    return `${(minutes % 60) < 10 ? '0' : ''}${minutes % 60}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleNext = () => {
    if (trackIndex >= musics.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(musics[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(musics[trackIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = musics.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(musics[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(musics[trackIndex - 1]);
    }
  };

  return (
    <>
      <main className='container'>

        <p className='timer' onClick={() => setTimer(0)}>{formatTime(timer)}</p>

        <audio ref={audioRef} src={currentTrack} />

        <div className="media-buttons-area">

          <div className='media-button' onClick={() => handlePrevious()}>

            <TbPlayerTrackPrevFilled size={60} />

          </div>

          <div className='media-button' onClick={() => { setIsPlaying(!isPlaying); }}>

            {isPlaying ? <TbPlayerPauseFilled size={60} /> : <TbPlayerPlayFilled size={60} />}

          </div>

          <div className='media-button' onClick={() => handleNext()}>

            <TbPlayerTrackNextFilled size={60} />

          </div>

        </div>


      </main>
    </>
  )
}

export default App
