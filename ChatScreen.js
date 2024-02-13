
import React, { useState, useEffect,useCallback } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet,RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const [builderId, setbuilderid] = useState('');
  const [clientId, setClientId] = useState();
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('clientId');
        const userObject = JSON.parse(storedUserId);
        setClientId(userObject.id);
        const storedbuilderId = await AsyncStorage.getItem('builder');
        const builderobject = JSON.parse(storedbuilderId);
        setbuilderid(builderobject);
        console.log("client id:", clientId);
        console.log("Builder id:", builderId);
      } catch (error) {
        console.error('Error fetching client projects:', error);
      }
      // Fetch chats for the user
    };
    fetchData();
  }, []);

  //if client id and builder id fetched call fetchchats
  useEffect(() => {
    if (clientId && builderId) {
      fetchChats();
      // Set up a refresh interval
      const intervalId = setInterval(fetchChats, 5000); // 3000 milliseconds (3 seconds)
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, [clientId, builderId]);

  //refreshing the chatscreen
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchChats().finally(() => setRefreshing(false));
  }, [clientId, builderId]);


  const fetchChats = async () => {
    try {
      const response = await axios.get(`https://estihomebidder.com/api/client/chats/${clientId}/${builderId}`);
      setChats(response.data);
      console.log('chats', response.data);
    } catch (error) {
      console.error('Error fetching client chats:', error);
    }
  };
  const messages = {
    sender_id: clientId,
    receiver_id: builderId,
    message_content: newMessage,
  };

  const sendMessage = async () => {

    try {
      const response = await axios.post('https://estihomebidder.com/api/client/send-message', JSON.stringify(messages), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
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

  const isSender = (message) => message.sender_id === clientId;

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={isSender(item) ? styles.senderMessage : styles.receiverMessage}>
            <Text style={{ color: 'white' }}>{item.message_content}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: 'white' }]}
          placeholder="Type your message..."
          placeholderTextColor="white"
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
    backgroundColor: '#181818', // Sender's message color
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#8a2be2', // Receiver's message color
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
    borderColor: 'white',
    borderRadius: 8,
  },
});

export default ChatScreen;
