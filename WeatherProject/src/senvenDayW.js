import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image, ImageBackground, TextInput, TouchableHighlight, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { Formik } from 'formik';

const openWeatherKey = 'd60759a54691e075fabe0fd0a89bc6d0'
let arr = [];



const currentDate = new Date();
for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    arr = [...arr, `${day} / ${month}`]
}
const SevenDayW = ({ navigation }) => {

    const [forecast, setForecast] = useState(null)
    let lat = 10.75
    let lon = 106.6667
    const [sevenDay, setSenvenDay] = useState(null)
    const [city, setCity] = useState(null)

    const [searchInput, setSearchInput] = useState("Ho Chi Minh")
    const [inputValue, setInputValue] = useState("")

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${openWeatherKey}`





    const loadForecast = async () => {
        // console.log("chay vao forecast")

        // console.log("call api 1")

        const response = await fetch(`${url}`)
        const data = await response.json()
        // console.log("call xong api 1")
        // console.log("call api 2")
        const noreply = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=ho chi minh&appid=${openWeatherKey}`)
        const data2 = await noreply.json()
        // console.log("call xong api 2")
        // console.log("call api 3")
        const response3 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${10.75}&lon=${106.6667}&exclude=current,minutely,hourly,alerts&units=metric&appid=${openWeatherKey}`)
        const data3 = await response3.json()
        setSenvenDay(data3)
        // console.log("call xong api 3")

        if (data.message == "city not found") {
            setForecast(data2)
            // console.log("call api 3")
            const response3 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${10.75}&lon=${106.6667}&exclude=current,minutely,hourly,alerts&units=metric&appid=${openWeatherKey}`)
            const data3 = await response3.json()
            setSenvenDay(data3)
            // console.log("call xong api 3")

            setCity(data2.name)

        } else {
            setForecast(data)

            // console.log("call api 3")
            const response3 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${openWeatherKey}`)
            const data3 = await response3.json()
            setSenvenDay(data3)
            // console.log("call xong api 3")
            setCity(data.name)
            console.log(city)

        }


        // console.log("chay xong forecast")
    }

    const handleSubmit = (e) => {
        if (inputValue == '') {
            setSearchInput('Ho Chi Minh')

            setInputValue("")
        }
        else {
            setSearchInput(inputValue)

            setInputValue("")
        }



    }


    useEffect(() => {


        loadForecast()





    }, [searchInput])



    if (!forecast) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
        )
    }



    return (
        <View style={styles.container}>


            <ImageBackground source={`${forecast.main.temp - 273.15 < 27 ? require("../assets/img/cold.png") : require("../assets/img/hot.png")}`} style={styles.bgImg}>
                <View


                >
                    <Entypo onPress={() => {
                        navigation.openDrawer();
                    }} name='menu' style={{ color: 'black', fontSize: 30, marginTop: 30, marginLeft: 15 }} />
                    <View style={{ marginTop: 30 }}>

                        <Text style={{
                            alignItems: 'center', textAlign: 'center', fontSize: 30, color: 'white',
                            textShadowColor: 'rgba(0, 0, 0, 0.7)', textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 4
                        }}>
                            {forecast.name},

                        </Text>
                        <Text style={{
                            alignItems: 'center', textAlign: 'center', fontSize: 30, color: 'white',
                            textShadowColor: 'rgba(0, 0, 0, 0.7)', textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 4
                        }}>

                            {forecast.sys.country}
                        </Text>
                    </View>


                    <View style={styles.currentTemp}>

                        <View style={styles.temp}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={{

                                    fontSize: 70, color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.7)',
                                    textShadowOffset: { width: 4, height: 4 },
                                    textShadowRadius: 4, marginLeft: 30
                                }}> {Math.round((forecast.main.temp - 273.15))}°C</Text>

                            </View>
                        </View>


                    </View>
                    <Formik>
                        <View style={styles.input} >

                            <TouchableHighlight onPress={handleSubmit}>
                                <AntDesign name='search1' style={{ color: 'black', fontSize: 20, marginLeft: 10 }} />
                            </TouchableHighlight>
                            <TextInput style={{ height: 40, width: 350, marginLeft: 25 }} value={inputValue} onSubmitEditing={handleSubmit} onChangeText={newText => { setInputValue(newText) }} />


                        </View>

                    </Formik>

                    <ScrollView style={{ marginLeft: 15, marginTop: 15, height: 300 }}>


                        <View style={styles.row}>
                            <Text style={styles.cell}>Date</Text>
                            <Text style={styles.cell}>Temp</Text>
                            <Text style={styles.cell}>Des</Text>
                            <Text style={styles.cell}>Weather</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>{arr[0]}</Text>
                            <Text style={styles.cell}>{sevenDay.daily[0].temp.day}°C</Text>
                            <Text style={styles.cell}>{sevenDay.daily[0].weather[0].main}</Text>

                            <Image
                                style={styles.cell2}
                                source={{
                                    uri: `http://openweathermap.org/img/w/${sevenDay.daily[0].weather[0].icon}.png`,
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>{arr[1]}</Text>
                            <Text style={styles.cell}>{sevenDay.daily[1].temp.day}°C</Text>
                            <Text style={styles.cell}>{sevenDay.daily[1].weather[0].main}</Text>

                            <Image
                                style={styles.cell2}
                                source={{
                                    uri: `http://openweathermap.org/img/w/${sevenDay.daily[1].weather[0].icon}.png`,
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>{arr[2]}</Text>
                            <Text style={styles.cell}>{sevenDay.daily[2].temp.day}°C</Text>
                            <Text style={styles.cell}>{sevenDay.daily[2].weather[0].main}</Text>

                            <Image
                                style={styles.cell2}
                                source={{
                                    uri: `http://openweathermap.org/img/w/${sevenDay.daily[1].weather[0].icon}.png`,
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>{arr[3]}</Text>
                            <Text style={styles.cell}>{sevenDay.daily[3].temp.day}°C</Text>
                            <Text style={styles.cell}>{sevenDay.daily[3].weather[0].main}</Text>

                            <Image
                                style={styles.cell2}
                                source={{
                                    uri: `http://openweathermap.org/img/w/${sevenDay.daily[3].weather[0].icon}.png`,
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>{arr[4]}</Text>
                            <Text style={styles.cell}>{sevenDay.daily[4].temp.day}°C</Text>
                            <Text style={styles.cell}>{sevenDay.daily[4].weather[0].main}</Text>

                            <Image
                                style={styles.cell2}
                                source={{
                                    uri: `http://openweathermap.org/img/w/${sevenDay.daily[4].weather[0].icon}.png`,
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>{arr[5]}</Text>
                            <Text style={styles.cell}>{sevenDay.daily[5].temp.day}°C</Text>
                            <Text style={styles.cell}>{sevenDay.daily[5].weather[0].main}</Text>

                            <Image
                                style={styles.cell2}
                                source={{
                                    uri: `http://openweathermap.org/img/w/${sevenDay.daily[5].weather[0].icon}.png`,
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>{arr[6]}</Text>
                            <Text style={styles.cell}>{sevenDay.daily[6].temp.day}°C</Text>
                            <Text style={styles.cell}>{sevenDay.daily[6].weather[0].main}</Text>

                            <Image
                                style={styles.cell2}
                                source={{
                                    uri: `http://openweathermap.org/img/w/${sevenDay.daily[6].weather[0].icon}.png`,
                                }}
                            />
                        </View>



                    </ScrollView>


                </View>
            </ImageBackground>

        </View >
    )
}

export default SevenDayW

const styles = StyleSheet.create({
    container: {
        flex: 1,





    },
    input: {
        alignItems: 'center',
        height: 40,
        width: 350,

        // margin: 12,
        // padding: 10,
        marginLeft: 25,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,


        flexDirection: 'row',


    },
    current: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    largeIcon: {
        width: 300,
        height: 250,

    },
    bgImg: {
        flex: 1,
        justifyContent: 'center'
    },
    currentTemp: {

        left: 30,
        opacity: 1,
        textAlign: 'center',
        padding: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // textAlign: "center",
        marginLeft: 50,
        // marginRight: 80,
        height: 100,
        width: 250,
        // backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderWidth: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 4,
        shadowRadius: 2.62,

        elevation: 0,
        borderRadius: 8




    },

    shortDes: {
        fontSize: 40,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 4,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30,
        marginLeft: 30
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        color: 'white',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    cell: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
        padding: 16,
        alignContent: 'center',
        justifyContent: 'center',

    },
    cell2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',

        width: 35,
        height: 35,
        marginTop: 15
    },


})