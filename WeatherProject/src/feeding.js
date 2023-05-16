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

const Feeding = ({ navigation }) => {
    const posts = [
        {
            id: '1',
            name: 'Doraemon',
            text: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
            date: '2023/04/19',
            avartar: require('../assets/favicon.png'),
            image: require('../assets/img/cold.png')
        },
        {
            id: '2',
            name: 'Nobita',
            text: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
            date: '2023/04/19',
            avartar: require('../assets/favicon.png'),
            image: require('../assets/img/hot.png')
        },
        {
            id: '3',
            name: 'Naruto',
            text: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
            date: '2023/04/19',
            avartar: require('../assets/favicon.png'),
            image: require('../assets/img/cool.jpg')
        },
        {
            id: '4',
            name: 'Sasuke',
            text: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
            date: '2023/04/19',
            avartar: require('../assets/favicon.png'),
            image: require('../assets/img/warm.jpg')
        },

    ]
    const renderPost = (post) => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avartar} style={styles.avartar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>{post.date}</Text>
                        </View>
                        <Ionicons name='ios-ellipsis-horizontal' size={24} color='#73788B' />
                    </View>
                    <Text style={styles.post}>{post.text}</Text>
                    <Image source={post.image} style={styles.postImage} resizeMode='cover' />
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='ios-heart-outline' size={24} color='#73788B' style={{ marginRight: 16 }} />
                        <Ionicons name='ios-chatbox-ellipses-sharp' size={24} color='#73788B' />
                    </View>
                </View>
            </View>
        )
    }
    return (

        <View style={styles.container}>

            <View style={styles.header} >
                <Text style={styles.headerTitle}>
                    Feed
                </Text>
            </View>
            <FlatList
                style={styles.feed}
                data={posts}
                renderItem={({ item }) => renderPost(item)}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}>

            </FlatList>

        </View>


    )
}

export default Feeding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    header: {
        paddingTop: 42,
        paddingBottom: 16,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EBECF4',
        shadowColor: '#454D65',
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
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