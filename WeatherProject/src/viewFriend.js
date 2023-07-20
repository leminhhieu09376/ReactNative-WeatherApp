import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight, ScrollView, ImageBackground, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';


const ViewFriend = ({ navigation }) => {
    const [posts, setPosts] = useState([])
    const [image, setImage] = useState(null);
    const [imgName, setImgName] = useState(null)
    const [username, setUsername] = useState('')
    const [token, setToken] = useState('')
    const [base64img, setBase64img] = useState(null)
    // useEffect(() => {
    //     AsyncStorage.getItem('accessToken').then((value) => {
    //         const myObject = JSON.parse(value);
    //         setToken(myObject)


    //     })
    // }, [])





    const loadPhotoss = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(myHeaders)
        var raw = JSON.stringify({
            "username": username
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://10.0.2.2:5000/upload/friends", requestOptions)
            .then(response => response.text())
            .then(result => setPosts(JSON.parse(result).images))
            .catch(error => console.log('error', error));
    }

    const loadPhotos = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {


            const response = await fetch('http://10.0.2.2:5000/upload/firends', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(username)

            })

            const data = await response.text()
            console.log(data)
            // setPosts(data.images)
            // console.log(data.images)
            // setUsername('')
        } catch (error) {
            console.error(error)
        }



    }

    const back = () => {
        navigation.navigate('Home')
    }

    const renderPost = (post) => {
        return (
            <View style={styles.feedItem}>
                <Image source={require('../assets/favicon.png')} style={styles.avartar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.name}>{post.uName}</Text>
                            <Text style={styles.timestamp}>1 minutes ago</Text>
                        </View>
                        <Ionicons name='ios-ellipsis-horizontal' size={24} color='#73788B' />
                    </View>
                    <Text style={styles.post}>{post.status}</Text>
                    <Image source={{ uri: `data:image/png;base64,${post.base64img}` }} style={styles.postImage} resizeMode='cover' />
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='ios-heart-outline' size={24} color='#73788B' style={{ marginRight: 16 }} />
                        <Ionicons name='ios-chatbox-ellipses-sharp' size={24} color='#73788B' />
                    </View>
                </View>
            </View>
        )
    }
    console.log(username)
    return (

        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={back}>
                        <Ionicons name='arrow-back' size={24} color='#D8D9DB' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={loadPhotoss} >
                        <Text style={{ fontWeight: '500' }}>Find</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', margin: 32 }}>
                    <Image source={require('../assets/img/cold.png')} style={styles.avartar} />
                    <TextInput value={username} onChangeText={newText => { setUsername(newText) }} placeholder='Find friend...' />
                </View>



            </SafeAreaView>


            <FlatList
                style={styles.feed}
                data={posts}
                renderItem={({ item }) => renderPost(item)}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}>

            </FlatList>

        </View>


    )
}

export default ViewFriend

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB',

    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',


    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8,
    },
    avartar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: '#454D65'
    },
    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }


})