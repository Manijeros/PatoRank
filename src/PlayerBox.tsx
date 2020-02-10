import React from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Image, Text, View } from 'react-native'
import { PlayerData } from '@src/ranking'
import { randomColor } from '@src/randomColor'
import { patos } from '@src/patitos'

interface PlayerViewProps {
  player: PlayerData
  onTap?: () => void
  selected: number
  selectedCount?: number
  onLayout: React.ComponentProps<typeof View>['onLayout']
}

const colors = ['', '#FFFFFF', '#7D7D7D', '#F7E05A', '#CD6B1D']
const underlayColors = ['#9D9D9D', '#575757', '#AD9D3F', '#8F4B14', '#000000']

const PlayerBox: React.FC<PlayerViewProps> = ({
  player,
  onTap,
  selected,
  selectedCount,
  onLayout
}) => {
  return (
    <TouchableHighlight
      onLayout={onLayout}
      onPress={onTap}
      underlayColor={
        underlayColors[selected > 0 ? selected - 1 : selectedCount || 0]
      }
      style={[
        {
          overflow: 'hidden',
          height: 114,
          width: 114,
          borderRadius: 5,
          marginTop: 8,
          backgroundColor: randomColor(player.name, 128)
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
          source={require('./assets/gradientBottom.png')}
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            resizeMode: 'contain',
            position: 'absolute'
          }}
        />
        <Image
          source={patos[selected]}
          style={{
            width: '100%',
            height: 100,
            alignSelf: 'center',
            resizeMode: 'contain',
            position: 'absolute',
            bottom: 34
          }}
        />
        <Image
          source={{
            uri: player.hat
          }}
          style={{
            width: '100%',
            height: 100,
            alignSelf: 'center',
            resizeMode: 'contain',
            position: 'absolute',
            bottom: 34
          }}
        />
        <View
          style={{
            height: 34,
            backgroundColor: selected > 0 ? '#14B795' : '#0A1E1F',
            justifyContent: 'center'
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: '#E0F2F1',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              textAlignVertical: 'center',
              textShadowColor: 'black',
              textShadowRadius: 1,
              textShadowOffset: { width: 0, height: 0 }
            }}
          >
            {player.name}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}
export default PlayerBox
