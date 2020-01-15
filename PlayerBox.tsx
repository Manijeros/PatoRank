import React from 'react'
import { PlayerData } from "./ranking"
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Image, Text, View } from 'react-native'

interface PlayerViewProps {
  player: PlayerData
  onTap?: () => void
  selected: boolean
}

const PlayerBox: React.FC<PlayerViewProps> = ({ player, onTap, selected }) => {
  return (<TouchableHighlight
    onPress={ onTap }
    style={[{
      overflow: 'hidden',
      height: 100,
      width: 100,
      borderRadius: 5,
      margin: 10,
    }, selected && {
      backgroundColor: 'gray',
    }]}>
    <View style={{
      flex: 1,
      justifyContent: 'flex-end',
      overflow: 'hidden',
      alignSelf: 'stretch',
    }}>
      <Image
        source={{
          uri: player.hat,
        }}
        style={{
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          resizeMode: 'contain',
          position: 'absolute'
        }} />
      <Text
        numberOfLines={ 2 }
        style={{
          color: '#ffffff',
          fontSize: 13,
          textAlign: 'center',
          backgroundColor: '#00000066',
          textShadowColor: 'black',
          textShadowRadius: 1,
          textShadowOffset: { width: 0, height: 0 },
        }}>{ player.name }</Text>
    </View>
  </TouchableHighlight>)
}
export default PlayerBox
