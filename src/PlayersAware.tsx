import React, { useState, useEffect } from 'react'

import { getPlayers, PlayerData } from '@src/ranking'

export interface PlayersAwareComponentProps {
  players: PlayerData[] | undefined
  setShouldUpdate?: (value: boolean) => void
}

export default function PlayersAware<T>(
  Component: React.FC<T & PlayersAwareComponentProps>
) {
  return (props: T) => {
    const [shouldUpdate, setShouldUpdate] = useState(true)
    const [players, setPlayers] = useState(
      undefined as PlayerData[] | undefined
    )
    useEffect(() => {
      if (shouldUpdate) {
        setShouldUpdate(false)
        getPlayers().then(response => setPlayers(response))
      }
    }, [shouldUpdate])
    return (
      <Component
        {...props}
        players={players}
        setShouldUpdate={setShouldUpdate}
      />
    )
  }
}
