import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import BuilderBids from './builderbids'; // Import the BuilderBids component
import { useNavigation } from '@react-navigation/native';
const AddBid = () => {
    const navigation = useNavigation();
    const [builderId, setBuilderId] = useState();
    const [Proposal, setProposal] = useState('');
    const [price, setPrice] = useState();
    const [postid, setpostid] = useState();
    useEffect(() => {
        // Retrieve the user ID from async storage
        const retrieveUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('builderId');
                const userObject = JSON.parse(storedUserId);
                setBuilderId(userObject);
                const storedPostId = await AsyncStorage.getItem('PostId');
                const postObject = JSON.parse(storedPostId);
                setpostid(postObject);
            } catch (error) {
                console.error('Error retrieving user ID:', error);
            }
        };
        retrieveUserId();
    }, []);

    const submitBid = async () => {
        try {
            const bid = {
                proposal: Proposal,
                bid_price: parseInt(price),
                model_id: postid,
                builder_id:builderId ,
            }
            const response = await axios.post('http://192.168.206.238:8000/api/bid', JSON.stringify(bid),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            console.log(response.data); // Log the response from the server
            // Close the BidForm and navigate to BuilderBids
            await AsyncStorage.removeItem('PostId');
            navigation.navigate('Builderbids');
        } catch (error) {
            console.error('Error submitting bid:', error);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8a2be2' }}>
            <View style={styles.Header} >
                <Text style={styles.Heading}>Post Your Bid</Text>
            </View>
            <ScrollView style={{ backgroundColor: '#363434', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <View style={styles.inputContainer} >
                    <TextInput
                        style={[styles.input, { color: '#ffffff' }]}
                        placeholder='Add Price:'
                        placeholderTextColor='#ffffff'
                        value={price}
                        onChangeText={setPrice}
                    />
                    <TextInput
                        style={[styles.input, { color: '#ffffff' }]}
                        placeholder="Add Your Proposal"
                        placeholderTextColor='#ffffff'
                        multiline
                        value={Proposal}
                        onChangeText={setProposal}

                    />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={submitBid}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    Header: {
        paddingVertical: 35,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#8a2be2",

    },
    Heading: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: -5,
        marginBottom: 15,
        color: '#ffffff',
        alignContent: 'center'
    },
    inputContainer: {
        backgroundColor: '#363434',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 10, // Add margin between input containers


    },
    input: {
        height: 60,
        borderWidth: 1,
        fontSize: 20,
        borderColor: '#8a2be2',
        marginBottom: 10,
        alignContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginHorizontal: 8
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
    },
    submitButton: {
        height: 40,
        width: 150,
        backgroundColor: '#8a2be2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 20,
    },
});
export default AddBid;