import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const ChatRoom = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You haven't joined any chat rooms yet :'(
      </Text>
    </View>
  )
}
export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dee2eb'
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: '500'
  }
})