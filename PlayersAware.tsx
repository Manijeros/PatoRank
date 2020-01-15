import React from "react";
import { useState, useEffect } from "react";
import { getPlayers, PlayerData } from "./ranking";

export interface PlayersAwareComponentProps {
  players: PlayerData[] | undefined
}

export default function PlayersAware<T>(Component: React.FC<T & PlayersAwareComponentProps>) {
  return (props: T) => {
    const [players, setPlayers] = useState(undefined as (PlayerData[] | undefined));
    useEffect(() => { getPlayers().then(response => setPlayers(response)) });
    return <Component { ...props } players={players} />
  }
}
