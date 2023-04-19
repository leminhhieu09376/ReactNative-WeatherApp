import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image, ImageBackground, TextInput, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Formik } from 'formik';
import axios from 'axios';

const openWeatherKey = 'd60759a54691e075fabe0fd0a89bc6d0'


const Register = ({ navigation }) => {
    const [register, setRegister] = useState({
        username: '',
        password: '',
        rePassword: ''
    })

    const [errMess, setErrMess] = useState(null)
    const handlePasswordChange = (text) => {
        setRegister({ ...register, password: text });
    };
    const handleRePasswordChange = (text) => {
        setRegister({ ...register, rePassword: text });
    };
    const handleUserChange = (text) => {
        setRegister({ ...register, username: text });
    };

    const handleSubmit = () => {
        if (register.username == '') {
            setErrMess('Username requied')
            return
        } else if (register.password == '') {
            setErrMess('Password requied')
            return
        } else if (register.rePassword == '') {
            setErrMess('Confirm password requied')
            return
        } else if (register.password != register.rePassword) {
            setErrMess('Password and confirm password not match')
            return
        }
        else {
            setErrMess(null)
        }


        fetch('http://10.0.2.2:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(register)
        }).then(res => res.json()).then(
            data => {
                console.log(data)
                if (data.success == false) {
                    setErrMess(data.message)
                } else {
                    alert('Register successfully')

                }
            }
        )
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/img/hot.png")} style={styles.bgImg}>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>Weather</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>Enjoy your travel</Text>
                <Formik>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {
                            errMess ? <Text style={{ color: 'white', width: 300, fontSize: 15, textAlign: 'center', backgroundColor: '#F50057', padding: 5, borderRadius: 10, marginLeft: 35, }}>{errMess}</Text> : null
                        }
                        <TextInput style={styles.input} value={register.userName} onChangeText={handleUserChange} placeholder='Username...' />
                        <TextInput style={styles.input} value={register.password} onChangeText={handlePasswordChange} secureTextEntry={true} placeholder='Password...' />
                        <TextInput style={styles.input} value={register.rePassword} onChangeText={handleRePasswordChange} secureTextEntry={true} placeholder='Re-enter password...' />
                        <TouchableHighlight onPress={handleSubmit} style={{ marginTop: 20 }} >
                            <View style={styles.button}>
                                <Text>Register</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ color: 'white' }}>Already have an account ? </Text>
                            <Text onPress={() => navigation.navigate('Login')} style={{ color: 'white', textDecorationLine: 'underline', fontWeight: 'bold' }}>Login !</Text>
                        </View>
                    </View>
                </Formik>

            </ImageBackground>
        </View>
    )
}

export default Register

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