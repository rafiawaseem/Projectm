import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bchat = () => {
  const [builderId,setbuilderid]=useState('');
  const [clientId, setClientId] = useState();
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect( () => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('builderId');
        const userObject = JSON.parse(storedUserId);
        setbuilderid(userObject.id);
        const storedclientId = await AsyncStorage.getItem('client');
        const clientobject = JSON.parse(storedclientId);
        setClientId(clientobject);
        console.log("client id:", clientId);
        console.log("Builder id:", builderId);
      } catch (error) {
        console.error('Error fetching builder projects:', error);
      }
      // Fetch chats for the user
      fetchChats();
    };
  
    fetchData();
  }, [clientId, builderId]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://192.168.5.105:8000/api/builder/chats/${builderId}/${clientId}`);
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching builder chats:', error);
    }
  };
  const messages ={
    sender_id: builderId,
    receiver_id: clientId,
    message_content: newMessage,
  };
  
  const sendMessage =async () => {
    
    try {
      const response = await axios.post('http://192.168.5.105:8000/api/builder/send-message', JSON.stringify(messages),{headers:{
        'Content-Type': 'application/json',
      }});
      setChats([...chats, response.data]);

      // Handle the response as needed (e.g., update the UI, show a success message)
      console.log('Message sent successfully:', response.data);

      // Clear the message input after sending
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle errors (e.g., show an error message to the user)
    }
  };

  const isSender = (message) => message.sender_id === builderId;

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={isSender(item) ? styles.senderMessage : styles.receiverMessage}>
            <Text>{item.message_content}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#99ccff', // Sender's message color
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6e6e6', // Receiver's message color
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});


export default Bchat;