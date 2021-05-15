import { useEffect, useState } from "react";
import styles from '../styles/Index.module.css'

const HomePage = () => {
  const [audioContext, setAudioContext] = useState({} as AudioContext)
  const [frequency, setFrequency] = useState(440)

  useEffect(() => {
    setAudioContext(new AudioContext())
  }, [])

  const playWave = ({ type, frequency, ampGain = 1 }: { type: OscillatorType, frequency: number, ampGain?: number }) => {
    const wave = audioContext.createOscillator()
    const amp = audioContext.createGain()

    amp.gain.setValueAtTime(ampGain, audioContext.currentTime)
    amp.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5)
    wave.type = type
    wave.frequency.value = frequency

    wave.connect(amp)
    amp.connect(audioContext.destination)

    wave.start()
  }

  const playSine = (frequency) => {
    playWave({ type: "sine", frequency })
  }

  const playSquare = (frequency) => {
    playWave({ type: "square", frequency, ampGain: 0.4 })
  }

  const playSawtooth = (frequency) => {
    playWave({ type: "sawtooth", frequency, ampGain: 0.4 })
  }

  const playTriangle = (frequency) => {
    playWave({ type: "triangle", frequency })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Web Audio API</h1>
      <div className={styles.inputContainer}>
        <div>
          <input type="text" disabled value={frequency} />
        </div>
        <div>
          <input type="range" min="220" max="1200" value={frequency} onChange={e => setFrequency(Number(e.target.value))} />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={() => playSine(frequency)}>Play Sine</button>
        <button className={styles.btn} onClick={() => playTriangle(frequency)}>Play Triangle</button>
        <button className={styles.btn} onClick={() => playSquare(frequency)}>Play Square</button>
        <button className={styles.btn} onClick={() => playSawtooth(frequency)}>Play Sawtooth</button>
      </div>
    </div>
  )
}

export default HomePage