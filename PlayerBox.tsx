import React from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Image, Text, View } from 'react-native'
import { PlayerData } from './ranking'

interface PlayerViewProps {
  player: PlayerData
  onTap?: () => void
  selected: number
  selectedCount?: number
}

const patos = [
  require('./assets/pato0.png'),
  require('./assets/pato1.png'),
  require('./assets/pato2.png'),
  require('./assets/pato3.png'),
  require('./assets/pato4.png')
]
const colors = ['', '#FFFFFF', '#7D7D7D', '#F7E05A', '#CD6B1D']
const underlayColors = ['#9D9D9D', '#575757', '#AD9D3F', '#8F4B14', '#000000']

const PlayerBox: React.FC<PlayerViewProps> = ({
  player,
  onTap,
  selected,
  selectedCount
}) => {
  return (
    <TouchableHighlight
      onPress={onTap}
      underlayColor={
        underlayColors[selected > 0 ? selected - 1 : selectedCount || 0]
      }
      style={[
        {
          overflow: 'hidden',
          height: 100,
          width: 100,
          borderRadius: 5,
          margin: 10
        },
        selected > 0 && {
          backgroundColor: colors[selected]
        }
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          overflow: 'hidden',
          alignSelf: 'stretch'
        }}
      >
        <Image
          source={patos[selected]}
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            resizeMode: 'contain',
            position: 'absolute'
          }}
        />
        <Image
          source={{
            uri: player.hat
          }}
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            resizeMode: 'contain',
            position: 'absolute'
          }}
        />
        <Text
          numberOfLines={2}
          style={{
            color: '#ffffff',
            fontSize: 13,
            textAlign: 'center',
            backgroundColor: '#00000066',
            textShadowColor: 'black',
            textShadowRadius: 1,
            textShadowOffset: { width: 0, height: 0 }
          }}
        >
          {player.name}
        </Text>
      </View>
    </TouchableHighlight>
  )
}
export default PlayerBox
