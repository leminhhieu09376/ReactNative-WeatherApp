import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight, ImageBackground, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Todo = ({ navigation }) => {

    const inittialState = {

        vdate: "",
        todo: "",
        location: "",
        vtime: "",
        date: "",
        time: "",


    };

    const [token, setToken] = useState('')
    useEffect(() => {
        AsyncStorage.getItem('accessToken').then((value) => {
            const myObject = JSON.parse(value);
            setToken(myObject)

        })
    }, [])




    const [errMess, setErrMess] = useState(null)
    const [todo, setTodo] = useState(inittialState)
    const [isVisible, setIsvisible] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



    const showDatePicker = () => {


        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const handleDateConfirm = (x) => {
        let dt = new Date(x)
        let dts = dt.toISOString().split('T')[0]
        let day = dts.split('-')[2]
        let month = dts.split('-')[1]
        let year = dts.split('-')[0]


        setTodo({ ...todo, vdate: day + '/' + month + '/' + year, date: year + '/' + month + '/' + day })

        hideDatePicker();
    };
    const showTimePicker = () => {
        setIsvisible(true);
    };
    const hideTimePicker = () => {
        setIsvisible(false);
    };
    const handleTimeConfirm = (x) => {

        let timeH = new Date(x)
        console.log(timeH)
        let timeHs = timeH.toLocaleTimeString().split(':')
        let hour = timeHs[0]
        let minutes = timeHs[1]

        setTodo({ ...todo, vtime: hour + ':' + minutes, time: hour + ':' + minutes })

        hideTimePicker()
    };
    const handleSubmit = (e) => {
        console.log('submit')
        if (todo.vdate == '') {
            setErrMess('Date requied')
            return
        } else if (todo.todo == '') {
            setErrMess('Todo requied')
            return
        } else if (todo.location == '') {
            setErrMess('Location requied')
            return
        } else if (todo.vtime == '') {
            setErrMess('Time requied')
            return
        } else {
            setErrMess(null)
        }



        fetch('http://10.0.2.2:5000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(todo)
        }).then(res => res.json()).then(
            data => {
                console.log(data)
                ToastAndroid.showWithGravityAndOffset('Successfully !', ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    250,);

            }
        )
        setTodo(inittialState)
    }
    const change = () => {
        navigation.navigate('Planned')
    }

    return (

        <Formik >
            <ImageBackground source={require("../assets/img/hot.png")} style={styles.bgImg}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', height: 100, alignItems: 'center', width: 400, marginTop: 60, marginBottom: 20 }}>
                        <Entypo onPress={() => {
                            navigation.openDrawer();
                        }} name='menu' style={{ color: 'black', fontSize: 30, marginRight: 40, marginLeft: 20 }} />
                        <Text style={styles.title}>New Event</Text>

                    </View>
                    {
                        errMess ? <Text style={{ color: 'white', width: 300, fontSize: 15, textAlign: 'center', backgroundColor: '#F50057', padding: 5, borderRadius: 10, marginLeft: 35, }}>{errMess}</Text> : null
                    }

                    <View style={{ marginTop: 30 }}>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'

                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                        />
                        <DateTimePickerModal
                            isVisible={isVisible}
                            mode='time'

                            onConfirm={handleTimeConfirm}
                            onCancel={hideTimePicker}
                        />

                        <View style={{ flexDirection: 'row' }}>

                            <TextInput editable={false} style={styles.input} placeholder='dd/mm/yyyy' value={todo.vdate} />
                            <TouchableHighlight onPress={showDatePicker}>
                                <AntDesign name='calendar' style={{ color: 'white', fontSize: 30, marginTop: 15 }} />
                            </TouchableHighlight>
                        </View>

                        <TextInput style={styles.input} value={todo.todo} placeholder='Todo...' onChangeText={newText => { setTodo({ ...todo, todo: newText }) }} />
                        <TextInput style={styles.input} value={todo.location} placeholder='Location' onChangeText={newText => { setTodo({ ...todo, location: newText }) }} />

                        <View style={{ flexDirection: 'row' }}>

                            <TextInput editable={false} style={styles.input} placeholder='Time' value={todo.vtime} />
                            <TouchableHighlight onPress={showTimePicker}>
                                <AntDesign name='clockcircleo' style={{ color: 'white', fontSize: 30, marginTop: 15 }} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Text />
                    <TouchableHighlight onPress={handleSubmit}>
                        <View style={styles.button}>
                            <Text>ADD TO SCHEDULE</Text>
                        </View>
                    </TouchableHighlight>
                    <Text />
                    <TouchableHighlight onPress={change}>
                        <View style={styles.button}>
                            <Text>SHOW SCHEDULE</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        </Formik>

    )
}

export default Todo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

        // backgroundColor: '#97DEFF',

    },
    input: {
        borderWidth: 1,
        height: 40,
        width: 300,
        margin: 12,
        padding: 10,
        marginLeft: 35,
        backgroundColor: "white",
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        textAlign: 'center',
        opacity: 0.7,
        marginBottom: 25,
        color: 'black'

    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        width: 200,
        borderRadius: 10,
        opacity: 0.8
    },
    bgImg: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        opacity: 0.6
    },
})