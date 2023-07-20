import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image, ImageBackground, TextInput, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
const openWeatherKey = 'd60759a54691e075fabe0fd0a89bc6d0'
let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`

const Home = ({ navigation }) => {
    const [searchInput, setSearchInput] = useState("ho chi minh")
    const [inputValue, setInputValue] = useState("")
    const [forecast, setForecast] = useState(null)
    const [temp, setTemp] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [country, setCountry] = useState(null)
    const [visibility, setVisibility] = useState(null)
    const [humidity, setHumidity] = useState(null)
    const [windSpeed, setWindSpeed] = useState(null)
    const [des, setDes] = useState(null)
    const [userID, setUserID] = useState(null)



    // useEffect(() => {
    //     AsyncStorage.getItem('userID').then((value) => {
    //         const myObject = JSON.parse(value);
    //         setUserID(myObject)

    //     })
    // }, [])

    // console.log(userID)
    const loadForecast = async () => {

        //ask for permission to access location
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied ')
        }
        console.log("Xin dc quyen")
        //get the current location
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        let lo = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        })

        setCurrentLocation(lo[0].region)
        setCountry(lo[0].country)

        console.log('okok')



        //fetches the weather data from api
        const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
        const data = await response.json()

        if (!response.ok) {
            Alert.alert('Error', 'Something went wrong ')
        } else {
            setForecast(data)
        }
        setTemp(Math.round(data.current.temp))
        setVisibility(data.current.visibility)
        setWindSpeed(data.current.wind_speed)
        setHumidity(data.current.humidity)
        setDes(data.daily[0].weather[0].description)


    }
    const loadWeather = async () => {
        console.log("ok")
        let url2 = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${openWeatherKey}`
        const response2 = await fetch(`${url2}`)
        const data2 = await response2.json()

        if (data2.message == 'city not found') {
            return
        }
        setDes(data2.weather[0].description)

        setVisibility(data2.visibility)
        setWindSpeed(data2.wind.speed)
        setHumidity(data2.main.humidity)
        setCurrentLocation(data2.name)
        setTemp(Math.round(data2.main.temp - 273.15))
        setCountry(data2.sys.country)
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
    // useEffect(() => {
    //     loadForecast()
    // }, [])
    useEffect(() => {
        loadWeather()
    }, [searchInput])



    return (
        <View style={styles.container}>
            <ImageBackground source={`${temp < 27 ? require("../assets/img/cold.png") : require("../assets/img/hot.png")}`} style={styles.bgImg}>
                <ScrollView

                    style={{ marginTop: 50 }}
                >
                    <Formik>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Entypo onPress={() => {
                                navigation.openDrawer();
                            }} name='menu' style={{ color: 'black', fontSize: 30, marginTop: 15, marginLeft: 15 }} />
                            <TextInput style={styles.input} value={inputValue} onSubmitEditing={handleSubmit} onChangeText={newText => { setInputValue(newText) }} />
                            <TouchableHighlight onPress={handleSubmit}>
                                <AntDesign name='search1' style={{ color: 'black', fontSize: 30, marginTop: 15 }} />
                            </TouchableHighlight>


                        </View>
                    </Formik>
                    <View>
                        <TouchableHighlight onPress={loadForecast}>
                            <Entypo name='location' style={{ color: 'black', fontSize: 30, marginLeft: 15 }} />
                        </TouchableHighlight>
                    </View>
                    <Text style={{
                        alignItems: 'center', textAlign: 'center', fontSize: 30, color: 'white',
                        textShadowColor: 'rgba(0, 0, 0, 0.7)', textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 4, marginTop: 10
                    }}>
                        {currentLocation},
                    </Text>
                    <Text style={{
                        alignItems: 'center', textAlign: 'center', fontSize: 30, color: 'white',
                        textShadowColor: 'rgba(0, 0, 0, 0.7)', textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 4
                    }}>
                        {country}
                    </Text>

                    <Text style={styles.currentTemp}>

                        <View style={styles.temp}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={{
                                    fontSize: 80, color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.7)',
                                    textShadowOffset: { width: 4, height: 4 },
                                    textShadowRadius: 4, marginLeft: 30
                                }}> {temp}°C</Text>

                            </View>
                        </View>


                    </Text>
                    <View >
                        <Text style={styles.shortDes}>
                            {des}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{}}>
                            <AntDesign name='eyeo' style={{ color: 'white', fontSize: 30, marginTop: 15 }} />
                            <Text style={{ color: 'white' }}>{visibility}m </Text>
                        </View>
                        <View>
                            <FontAwesome5 name='wind' style={{ color: 'white', fontSize: 30, marginTop: 15 }} />
                            <Text style={{ color: 'white', marginLeft: -10 }}>{windSpeed}(m/s)</Text>
                        </View>
                        <View>
                            <FontAwesome5 name='cloud-sun' style={{ color: 'white', fontSize: 30, marginTop: 15 }} />
                            <Text style={{ color: 'white', marginLeft: 10 }}>{humidity}%</Text>
                        </View>

                    </View>

                </ScrollView>
            </ImageBackground>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,




    },
    input: {
        alignItems: 'center',
        height: 40,
        width: 270,
        margin: 12,
        padding: 10,
        marginLeft: 20,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginBottom: 32

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
        marginLeft: 80,
        marginTop: 10,
        height: 150,
        width: 250,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
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
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        width: 150,
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 5,
        opacity: 0.6,
    },
    btn: {

        marginTop: 10,
        alignItems: 'center'
    },

})