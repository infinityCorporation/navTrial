//Import React
import * as React from 'react';

//From React import useState
import { useState, useEffect } from 'react';

//Import Elements from React-Native (May be an issue here)
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

//Import auth function from firebase file
//import auth from '../firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

//Import the async storage module
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    const handleSignUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log(user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, ' ', errorMessage);
            })
    };

    const handleLogin = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("Logged in with:", user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, ' ', errorMessage);
            })
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email)
        } else {
            console.log("no user signed in")
        }
    })

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View
                style={styles.inputContainer}
            >
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View
                style={styles.buttonContainer}
            >
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.buttonText, styles.buttonOutline]}
                >
                    <Text
                        style={styles.buttonOutlineText}
                    >
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        position: 'absolute',
        top: 100
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 200
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10
    },
    buttonOutline: {
        padding: 15,
        borderRadius: 10,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    }

})