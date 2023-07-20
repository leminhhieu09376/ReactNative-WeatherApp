import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight, ScrollView, ImageBackground, ToastAndroid, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Planned = ({ navigation }) => {

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const [editTodo, setEditTodo] = useState({
        time: '',
        date: '',
        location: '',
        todo: ''
    })
    const [errMess, setErrMess] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [datePicker, setDatePicker] = useState({
        vDate: '',
        Hdate: '',
        indexx: '',
    })
    const isFocused = useIsFocused();
    const [token, setToken] = useState('')
    useEffect(() => {
        AsyncStorage.getItem('accessToken').then((value) => {
            const myObject = JSON.parse(value);
            setToken(myObject)

        })
    }, [])

    const showDatePicker = () => {


        setDatePickerVisibility(true);
    }
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const loadPlanned = async () => {


        const response = await fetch('http://10.0.2.2:5000/api/todos', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        const data = await response.json()


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


    const handlePress = async () => {

        const response = await fetch('http://10.0.2.2:5000/api/todos', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        const newData = await response.json()
        try {
            setData2(newData.todos.filter(todo => {

                return new Date(todo.date).getTime() === new Date(datePicker.Hdate).getTime()
            }))
        } catch (error) {
            console.log(error)
        }

        // setData2(data.filter(todo => {

        //     return new Date(todo.date).getTime() === new Date(datePicker.Hdate).getTime()
        // }))


    }
    function getDayOfWeek(dateString) {
        // Tách ngày, tháng và năm từ chuỗi đầu vào
        var parts = dateString.split("/");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1; // Tháng tính từ 0 (0 - tháng 1, 11 - tháng 12)
        var year = parseInt(parts[2], 10);

        // Tạo một đối tượng Date từ các phần tử đã tách
        var date = new Date(year, month, day);



        // Lấy thứ trong tuần từ đối tượng Date
        var dayIndex = date.getDay();

        // Trả về tên thứ trong tuần
        return dayIndex;
    }
    const handleDateConfirm = (x) => {
        let dt = new Date(x)
        let dts = dt.toISOString().split('T')[0]
        let day = dts.split('-')[2]
        let month = dts.split('-')[1]
        let year = dts.split('-')[0]


        setDatePicker({ ...datePicker, vDate: day + '/' + month + '/' + year, Hdate: year + '/' + month + '/' + day, indexx: getDayOfWeek(day + '/' + month + '/' + year) })

        hideDatePicker()
    }


    const Delete = async (id) => {

        fetch(`http://192.168.50.106:5000/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },

        }).then(res => res.json()).then(
            data => {

                console.log(data)

            }
        )


        const response = await fetch('http://192.168.50.106:5000/api/todos', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        const newData = await response.json()
        setData2(newData.todos.filter(todo => {

            return new Date(todo.date).getTime() === new Date(datePicker.Hdate).getTime()
        }))
        handlePress()



    }

    // useEffect(() => {

    //     handlePress()


    // }, [])
    console.log(datePicker)
    const modalSubmit = async (id) => {
        // console.log(data2.todos)
        // setEditTodo(data2.find(todo => todo._id === id))
        // console.log(editTodo)

        console.log(timeRegex.test(editTodo.time))
        if (timeRegex.test(editTodo.time) == true) {
            setErrMess(null)
            fetch(`http://192.168.50.106:5000/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(editTodo)
            }).then(res => res.json()).then(
                data => {
                    console.log(data)


                }
            )

            const response = await fetch('http://192.168.50.106:5000/api/todos', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
            const newData = await response.json()
            setData2(newData.todos.filter(todo => {

                return new Date(todo.date).getTime() === new Date(datePicker.Hdate).getTime()
            }))


            handlePress()
            ToastAndroid.showWithGravityAndOffset('Successfully !', ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50,);
        } else {
            setErrMess('Time format is HH:MM. Ex: 10:05')
            return
        }



    }
    useEffect(() => {
        loadPlanned()
        handlePress()


    }, [isFocused])
    console.log('re-render ')
    console.log(data2)
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/img/hot.png")} style={styles.bgImg}>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode='date'

                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />
                <View style={styles.headerS}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'white' }}>


                        <TouchableHighlight onPress={showDatePicker}>
                            <AntDesign name='calendar' style={{ color: 'white', fontSize: 30, marginTop: 15 }} />
                        </TouchableHighlight>
                        <TextInput style={styles.inputS} placeholder='dd/mm/yyyy' editable={false} value={datePicker.vDate} />
                        <AntDesign name='search1' style={{ color: 'white', fontSize: 30, marginTop: 15 }} onPress={handlePress} />
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableHighlight style={styles.days}>
                            <Text style={datePicker.indexx === 1 ? { textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' } : { color: 'black' }}>Mon</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.days}>
                            <Text style={datePicker.indexx === 2 ? { textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' } : { color: 'black' }}>Tue</Text>

                        </TouchableHighlight>
                        <TouchableHighlight style={styles.days}>

                            <Text style={datePicker.indexx === 3 ? { textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' } : { color: 'black' }}>Wed</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.days}>

                            <Text style={datePicker.indexx === 4 ? { textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' } : { color: 'black' }}>Thu</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.days}>

                            <Text style={datePicker.indexx === 5 ? { textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' } : { color: 'black' }}>Fri</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.days}>

                            <Text style={datePicker.indexx === 6 ? { textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' } : { color: 'black' }}>Sat</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.days}>

                            <Text style={datePicker.indexx === 0 ? { textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' } : { color: 'black' }}>Sun</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View>
                    <Modal transparent={true} animationType="slide" visible={modalVisible}>
                        <View style={{ flex: 1, backgroundColor: '#000000AA', justifyContent: 'center', alignContent: 'center', }} >
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ borderWidth: 1, borderColor: 'black', padding: 32, backgroundColor: 'white', borderRadius: 16 }}>
                                    <Feather name='x' style={{ color: 'black', fontSize: 24, position: 'absolute', right: 10, top: 10 }} onPress={() => {
                                        setModalVisible(false)
                                    }} />
                                    <TextInput style={{ fontWeight: 'bold', fontSize: 20, color: '#938F93', marginLeft: 10, marginBottom: 24 }}>Making note?</TextInput>
                                    <Text style={styles.label}>Date</Text>
                                    <TextInput editable={false} style={styles.inputH} value={datePicker.Hdate} />
                                    <Text style={styles.label}>Location</Text>
                                    <TextInput style={styles.inputH} defaultValue={editTodo.location} onChangeText={newText => { setEditTodo({ ...editTodo, location: newText, }) }} />
                                    <Text style={styles.label}>Todo</Text>
                                    <TextInput style={styles.inputH} defaultValue={editTodo.todo} onChangeText={newText => { setEditTodo({ ...editTodo, todo: newText }) }} />
                                    <Text style={styles.label}>Time</Text>
                                    {
                                        errMess ? <Text style={{ color: 'white', width: 250, fontSize: 15, textAlign: 'center', backgroundColor: '#F50057', padding: 4, borderRadius: 8, marginTop: 10, marginLeft: 12 }}>{errMess}</Text> : null
                                    }
                                    <TextInput style={styles.inputH} defaultValue={editTodo.time} onChangeText={newText => { setEditTodo({ ...editTodo, time: newText }) }} />
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 }}>
                                        <TouchableOpacity style={styles.buttonCancle} onPress={() => {
                                            setModalVisible(false)
                                        }}>
                                            <Text style={styles.buttonText}>Cancle</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => {
                                            modalSubmit(editTodo.id)
                                        }}>
                                            <Text style={styles.buttonText}>Submit</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.contents}>
                    <ScrollView >
                        {

                            data2.length == 0
                                ?
                                <View style={{ alignItems: "center", justifyContent: 'center', height: 300, }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 18 }}>You do not have any plans scheduled for today...</Text>
                                </View>
                                :
                                data2.map(todo => {

                                    return (
                                        <View style={styles.contentsItems} key={todo._id}>

                                            <View style={{ flexDirection: 'row', }}>
                                                <AntDesign name='clockcircleo' style={{ color: 'white', fontSize: 30, marginTop: 18, marginLeft: 16, marginRight: 8 }} />
                                                <Text style={{ marginLeft: 16, marginTop: 18, fontWeight: 'bold', color: 'white', fontSize: 20, marginRight: 16 }}>{todo.time}</Text>
                                                <Entypo name='location' style={{ color: 'white', fontSize: 30, marginTop: 18, marginLeft: 5, marginRight: 16 }} />
                                                <Text style={{ marginTop: 18, fontWeight: 'bold', color: 'white', fontSize: 20 }}>{todo.location} </Text>
                                                <AntDesign name='delete' style={{ color: 'white', fontSize: 25, position: 'absolute', right: 5, top: 10 }} onPress={() => {
                                                    {
                                                        Delete(todo._id)
                                                    }
                                                }} />



                                            </View>




                                            <ScrollView >

                                                <View style={{ width: 250, flexDirection: 'row', }}>

                                                    <FontAwesome5 name='sticky-note' style={{ color: 'white', marginTop: 15, marginLeft: 20, fontSize: 16, marginRight: 4 }} />
                                                    <Text style={{ marginTop: 8, lineHeight: 24, fontWeight: 'bold', color: 'white', fontSize: 16, }}> {todo.todo} </Text>
                                                </View>
                                            </ScrollView>
                                            <AntDesign name='edit' style={{ color: 'white', fontSize: 25, position: 'absolute', right: 0, bottom: 20, right: 10 }} onPress={() => {
                                                setModalVisible(true)
                                                setEditTodo({ ...editTodo, todo: todo.todo, location: todo.location, time: todo.time, date: datePicker.Hdate, id: todo._id })
                                            }} />

                                        </View>







                                    )

                                })
                        }

                    </ScrollView>
                </View>

            </ImageBackground>
        </View>
    )
}

export default Planned

const styles = StyleSheet.create({
    container: {
        flex: 1,




    },
    inputS: {

        height: 40,
        width: 230,
        margin: 12,
        padding: 10,
        marginLeft: 35,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        textAlign: 'center',
        backgroundColor: "white",
        color: 'black'


    },
    days: {
        margin: 14,


    },
    dayss: {
        margin: 14,
        textDecorationLine: 'underline'

    },
    headerS: {

        padding: 16,
        backgroundColor: 'black',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        opacity: 0.6,
        // borderRadius: 16
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        marginTop: 32
    },

    contents: {
        height: 630,
        backgroundColor: 'black',
        opacity: 0.4,
        width: 390,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',



    },
    contentsItems: {

        backgroundColor: 'black',
        width: 360,
        height: 150,
        marginTop: 16,
        padding: 8,

        marginLeft: 10,




        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 4,

        borderRadius: 32,
        opacity: 0.8
    },
    bgImg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputH: {

        height: 40,
        width: 250,
        margin: 12,
        padding: 10,

        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 8,
        textAlign: 'center',
        backgroundColor: "white",
        color: 'black',


        borderWidth: 1

    },
    button: {
        backgroundColor: '#78BCAA',
        padding: 10,
        borderRadius: 5,
        width: 90,
        marginRight: 12
    },
    buttonCancle: {
        backgroundColor: '#e88d93',
        padding: 10,
        borderRadius: 5,
        width: 90,
        marginRight: 4
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

    },
    label: {
        marginLeft: 12,
        fontWeight: 'bold',
        color: '#938F93',
    }

})