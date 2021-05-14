import { useEffect, useState } from 'react'

const HomePage = () => {
  const [audioCtx, setAudioCtx] = useState<AudioContext>({} as AudioContext)
  const [oscillator, setOscillator] = useState({} as OscillatorNode)

  useEffect(() => {
    setAudioCtx(new window.AudioContext)
  }, [])

  useEffect(() => {
    if (!audioCtx.createOscillator) return
    setOscillator(audioCtx.createOscillator())
  }, [audioCtx])

  useEffect(() => {
    if (!oscillator.type) return
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
  }, [oscillator])

  const makeSound = () => {
    oscillator.start();
  }

  const stopSound = () => {
    oscillator.stop()
  }

  return (
    <>
      <h1>Web Audio API</h1>
      <button onClick={makeSound}>Make a Sound</button>
      <button onClick={stopSound}>Stop Sound</button>
    </>
  )
}

export default HomePage