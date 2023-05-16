import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image, ImageBackground, TextInput, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Formik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const openWeatherKey = 'd60759a54691e075fabe0fd0a89bc6d0'


const Login = ({ navigation }) => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const [errMess, setErrMess] = useState(null)

    const handlePasswordChange = (text) => {
        setLogin({ ...login, password: text });
    };
    const handleUserChange = (text) => {
        setLogin({ ...login, username: text });
    };
    const handleSubmit = () => {
        if (login.username == '') {
            setErrMess('Username requied')
            return
        } else if (login.password == '') {
            setErrMess('Password requied')
            return
        } else {
            setErrMess(null)
        }



        fetch('http://10.0.2.2:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login)
        }).then(res => res.json()).then(
            data => {
                console.log(data)
                if (data.success == false) {
                    setErrMess(data.message)
                } else {
                    alert('Logged successfully')
                    AsyncStorage.setItem('accessToken', JSON.stringify(data.accessToken))

                    AsyncStorage.setItem('userID', JSON.stringify(data.userId))
                    navigation.navigate('HomeDrawer')






                }
            }
        )



    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/img/hot.png")} style={styles.bgImg}>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>Weather</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>Enjoy your travel</Text>
                {
                    errMess ? <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', backgroundColor: '#F50057', padding: 5, borderRadius: 10, width: 300, marginLeft: 65 }}>{errMess}</Text> : null
                }
                <Formik>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput style={styles.input} value={login.username} onChangeText={handleUserChange} placeholder='Username...' />
                        <TextInput style={styles.input} secureTextEntry={true} value={login.password} onChangeText={handlePasswordChange} placeholder='Password...' />
                        <TouchableHighlight onPress={handleSubmit} style={{ marginTop: 20 }} >
                            <View style={styles.button} >
                                <Text>Login</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ color: 'white' }}>Don't have an account ? </Text>
                            <Text onPress={() => navigation.navigate('Register')} style={{ color: 'white', textDecorationLine: 'underline', fontWeight: 'bold' }}>Register here !</Text>
                        </View>
                    </View>
                </Formik>
            </ImageBackground>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',



    },
    input: {
        alignItems: 'center',
        height: 40,
        width: 300,
        margin: 12,
        padding: 10,
        marginLeft: 35,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,

    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        width: 150,
        borderRadius: 10,
        opacity: 0.6,

    },
    bgImg: {
        flex: 1,
        justifyContent: 'center'
    },

})