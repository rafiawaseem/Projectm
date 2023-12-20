import React, { useState } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Bchat = ({ route }) => {
  const { contact } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message) {
      setMessages([...messages, { id: messages.length + 1, text: message }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={'#8a2be2'}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  messageBubble: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#8a2be2',
    borderRadius: 8,
  },
  sendButton: {
    height: 41,
    backgroundColor: '#8a2be2',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 16,
    alignContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#181818',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center'

  },
});


export default Bchat;