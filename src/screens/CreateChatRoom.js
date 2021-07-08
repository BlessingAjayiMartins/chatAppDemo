import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'

import firestore from '@react-native-firebase/firestore'


const CreateChatRoom = ({navigation}) => {
  const [roomName, setRoomName] = useState('')

  const handleButtonPress = () => {
    const mill = new Date().getTime()
    const date = new Date(mill)
    if (roomName.length > 0) {
      // create new thread using firebase
      firestore()
        .collection('MESSAGE_THREADS')
        .add({
          name:roomName,
          latestMessage: {
            text: `${roomName} created. Welcome!`,
            createdAt: date.toLocaleString()
          }
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: `${roomName} created. Welcome!`,
            createdAt: date.toLocaleString(),
            system: true
          })
          navigation.navigate('ChatRoom')
        })
    }
    return null
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Thread Name'
        onChangeText={roomName => setRoomName(roomName)}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress()}>
        <Text style={styles.buttonText}>Create chat room</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateChatRoom
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
  },
  button: {
    backgroundColor: '#2196F3',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  textInput: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#aaa',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    width: 225
  }
})