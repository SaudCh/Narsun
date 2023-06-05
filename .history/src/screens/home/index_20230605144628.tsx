import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

export default function HomeScreen() {

    const navigation = useNavigation();
    const [data, setData] = useState([])


    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem('images')
                .then((jsonValue) => {
                    setData(JSON.parse(jsonValue))
                })
                .catch((error) => console.log(error))
        }, [])
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item?.id}
                renderItem={({ item = { title: String } }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DetailScreen', { item })}
                        >

                            <View style={{ padding: 10 }}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: '100%', height: 200 }}
                                />
                                <Text style={{ fontSize: 20 }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                }
            />


            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('AddScreen')}
            >
                <Ionicons name="add-circle" size={50} color="black" />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        borderRadius: 50,
        elevation: 2

    }
})