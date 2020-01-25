import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CE353B',
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  imageContainer: {
    width: 48,
    height: 48
  },
  textContainer: {
    marginLeft: 16
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute'
  },
  text: {
    fontFamily: 'saira',
    fontSize: 14,
    color: 'white'
  },
  title: {
    fontFamily: 'saira-bold',
    fontSize: 16,
    color: 'white'
  }
})

export default styles
