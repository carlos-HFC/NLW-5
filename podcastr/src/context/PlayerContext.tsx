import { createContext, ReactNode, useContext, useState } from 'react'

type PlayerContextData = {
  clearPlayerState: () => void
  currentEpisodeIndex: number
  episodeList: Episode[]
  hasNext: boolean
  hasPrevious: boolean
  isLooping: boolean
  isPlaying: boolean
  isShuffling: boolean
  play: (episode: Episode) => void
  playList: (list: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  setPlayingState: (state: boolean) => void
  toggleLoop: () => void
  togglePlay: () => void
  toggleShuffle: () => void
}

export const PlayerContext = createContext({} as PlayerContextData)

interface PlayerProviderProps {
  children: ReactNode
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(isPlaying => !isPlaying)
  }

  function toggleLoop() {
    setIsLooping(isLooping => !isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(isShuffling => !isShuffling)
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
  const hasPrevious = currentEpisodeIndex > 0

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1)
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider
      value={{
        clearPlayerState, currentEpisodeIndex, episodeList, hasNext, hasPrevious, isLooping, isPlaying, isShuffling, play, playList, playNext, playPrevious, setPlayingState, toggleLoop, togglePlay, toggleShuffle
      }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}