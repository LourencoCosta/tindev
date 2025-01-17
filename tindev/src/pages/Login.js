import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import logo from '../assets/logo.png'
import api from '../services/api'
export default function Login({ navigation }) {
    const [user, setUser] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, [])

    async function handleLogin() {
        const response = await api.post('/dev', { username: user })
        const { _id } = response.data
        await AsyncStorage.setItem('user', _id)

        
        navigation.navigate('Main', { user : _id })
    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            enable={Platform.OS === 'ios'}
            style={style.container}>
            <Image source={logo} />
            <TextInput
                autoCaptalaize='none'
                autoCorrect={false}
                placeholder="Digite seu usuario no Github"
                placeholderTextColor='#999'
                style={style.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={style.button}>
                <Text style={style.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 1,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }

})