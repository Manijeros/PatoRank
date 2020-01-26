import { Audio } from 'expo-av'
import { PlaybackSource } from 'expo-av/build/AV'

async function playSound(source: PlaybackSource) {
  const soundObject = new Audio.Sound()
  try {
    await soundObject.loadAsync(source)
    soundObject.playAsync()
  } catch {}
}
export { playSound }
