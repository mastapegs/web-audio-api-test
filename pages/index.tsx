import { useState } from "react";

const HomePage = () => {
  const [frequency, setFrequency] = useState(440)

  const playWave = ({ type, frequency }: { type: OscillatorType, frequency: number }) => {
    const audioContext = new AudioContext();
    const wave = audioContext.createOscillator()
    const amp = audioContext.createGain()

    amp.gain.setValueAtTime(0.5, audioContext.currentTime)
    amp.gain.linearRampToValueAtTime(0., audioContext.currentTime + 0.5)
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
    playWave({ type: "square", frequency })
  }

  const playSawtooth = (frequency) => {
    playWave({ type: "sawtooth", frequency })
  }

  const playTriangle = (frequency) => {
    playWave({ type: "triangle", frequency })
  }

  return (
    <>
      <h1>Web Audio API</h1>
      <div>
        <input type="text" disabled value={frequency} />
      </div>
      <div>
        <input type="range" min="220" max="1200" value={frequency} onChange={e => setFrequency(Number(e.target.value))} />
      </div>
      <button onClick={() => playSine(frequency)}>Play Sine</button>
      <button onClick={() => playTriangle(frequency)}>Play Triangle</button>
      <button onClick={() => playSquare(frequency)}>Play Square</button>
      <button onClick={() => playSawtooth(frequency)}>Play Sawtooth</button>
    </>
  )
}

export default HomePage