const HomePage = () => {
  const playWave = ({ type, frequency }: { type: OscillatorType, frequency: number }) => {
    const audioContext = new AudioContext();
    const wave = audioContext.createOscillator()
    const amp = audioContext.createGain()

    amp.gain.setValueAtTime(0.5, audioContext.currentTime)
    amp.gain.linearRampToValueAtTime(0., audioContext.currentTime + 2)
    wave.type = type
    wave.frequency.value = frequency

    wave.connect(amp)
    amp.connect(audioContext.destination)

    wave.start()
  }

  const playSine = () => {
    playWave({ type: "sine", frequency: 440 })
  }

  const playSquare = () => {
    playWave({ type: "square", frequency: 440 })
  }

  return (
    <>
      <h1>Web Audio API</h1>
      <button onClick={playSine}>Play Sine</button>
      <button onClick={playSquare}>Play Square</button>
    </>
  )
}

export default HomePage