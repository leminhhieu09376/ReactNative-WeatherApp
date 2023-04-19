import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const Remind = ({ navigation }) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const [data, setData] = useState([])




    const isFocused = useIsFocused();



    const loadRemind = async () => {

        //  AsyncStorage.getItem('accessToken').then((value) => {
        //     const myObject = JSON.parse(value);
        //     setToken(myObject)

        //  })

        const myObject = await AsyncStorage.getItem('accessToken')
        const token = JSON.parse(myObject)

        const response = await fetch('http://10.0.2.2:5000/api/todos', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        const data = await response.json()
        console.log(data.todos)
        //setData(data.todos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
        // setData(data.todos)
        try {
            setData(
                data.todos.sort((a, b) => {
                    const dateA = new Date(`${a.date} ${a.time}`);
                    const dateB = new Date(`${b.date} ${b.time}`);
                    return dateA.getTime() - dateB.getTime();
                })
            )
        } catch (error) {
            console.log(error)
        }





    }
    useEffect(() => {
        loadRemind()
    }, [isFocused])
    const convertDate = (x) => {
        let day = x.date.split('/')[2]
        let month = x.date.split('/')[1]

        return (
            <Text style={{ marginLeft: 4, marginTop: 4, color: 'white', fontWeight: 'bold', fontSize: 18, marginRight: 20 }}>{day}/{month}</Text>
        )
    }

    console.log("re-render")

    return (

        <View style={styles.container}>
            <ImageBackground source={require("../assets/img/hot.png")} style={styles.bgImg}>



                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                    <Entypo onPress={() => {
                        navigation.openDrawer();
                    }} name='menu' style={{ color: 'black', fontSize: 30, marginTop: 30, position: 'absolute', left: -100, top: -25 }} />


                    <Text style={{ fontSize: 23, marginTop: 4, marginBottom: 4, color: 'black', fontWeight: 'bold', opacity: 0.6 }}> Plan Reminder</Text>
                </View>


                <MaterialCommunityIcons name='weather-partly-snowy-rainy' style={{
                    color: 'black', fontSize: 100, marginTop: 15, opacity: 0.5
                }} />



                <ScrollView>

                    {
                        data.map(todo => {

                            if (data.length == 0) {
                                return null
                            } else {

                                if (Math.round(Math.abs((today.getTime() - new Date(todo.date).getTime()) / oneDay)) > 7 || new Date(todo.date).getTime() < today.getTime()) {
                                    return null
                                } else {
                                    return (
                                        <View style={{ flexDirection: 'row' }} key={todo._id}>
                                            <Text style={{ backgroundColor: 'gray', width: 10, height: 10, position: 'absolute', top: 45, left: 6, borderRadius: 8 }} >a</Text>
                                            <View style={styles.contentsItems}>


                                                <View style={{ flexDirection: 'row' }}>

                                                    <AntDesign name='calendar' style={{ color: 'white', fontSize: 15, marginTop: 9 }} />

                                                    {
                                                        convertDate(todo)
                                                    }
                                                    <AntDesign name='clockcircleo' style={{ color: 'white', fontSize: 15, marginTop: 9 }} />
                                                    <Text style={{ marginLeft: 4, marginTop: 4, color: 'white', fontWeight: 'bold', fontSize: 18, marginRight: 20 }}>{todo.time}</Text>
                                                    <Entypo name='location' style={{ color: 'white', fontSize: 15, marginTop: 9, }} />
                                                    <Text style={{ marginLeft: 4, marginTop: 3, color: 'white', fontWeight: 'bold', fontSize: 18 }}>{todo.location} </Text>


                                                </View>
                                                <FontAwesome5 name='bell' style={{ color: 'white', fontSize: 18, marginTop: 24, position: 'absolute', right: 15 }} />

                                                <ScrollView >
                                                    <FontAwesome5 name='sticky-note' style={{ color: 'white', marginTop: 9, marginLeft: 2 }} />
                                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, width: 300, marginLeft: 20, marginTop: -16 }}> {todo.todo}</Text>
                                                </ScrollView>

                                            </View>
                                        </View>

                                    )
                                }

                            }


                        })
                    }












                </ScrollView>
            </ImageBackground>
        </View>


    )
}

export default Remind

const styles = StyleSheet.create({
    container: {
        flex: 1,



    },
    contentsItems: {
        marginLeft: 24,
        backgroundColor: 'black',
        width: 360,
        height: 70,
        marginTop: 16,
        padding: 8,

        borderRadius: 24,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 4,
        shadowRadius: 5.62,

        elevation: 1,
        opacity: 0.4

    },
    bgImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})