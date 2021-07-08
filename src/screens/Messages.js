import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


const user = auth().currentUser.toJSON()

const Messages = ({ route }) => {
  const { thread } = route.params

  const mill = new Date().getTime()
  const date = new Date(mill)
  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'thread created',
      createdAt: date.toLocaleString(),
      system: true
    },
    {
      _id: 1,
      text: 'hello!',
      createdAt: date.toLocaleString(),
      user: {
        _id: 2,
        name: 'Demo'
      }
    }
  ])

  async function handleSend(message) {
    const mill = new Date().getTime()
    const date = new Date(mill)
    const text = message[0].text
    firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: date.toLocaleString(),
        user: {
          _id: user.uid,
          displayName: user.displayName
        }
      })

    await firestore()
    .collection('MESSAGE_THREADS')
    .doc(thread._id)
    .set(
      {
        latestMessage: {
          text,
          createdAt: date.toLocaleString()
        }
      },
      { merge: true }
    )

    useEffect(() => {
      const unsubscribeListener = firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data()
    
            const data = {
              _id: doc.id,
              text: '',
              createdAt: date.toLocaleString(),
              ...firebaseData
            }
    
            if (!firebaseData.system) {
              data.user = {
                ...firebaseData.user,
                name: firebaseData.user.displayName
              }
            }
    
            return data
          })
    
          setMessages(messages)
        })
    
      return () => unsubscribeListener()
    }, [])

    setMessages(GiftedChat.append(message, newMessage))
  }

  return (
  <GiftedChat
    messages={messages}
    onSend={handleSend}
    user={{
      _id: user.uid
    }}
  />
)
}

export default Messages