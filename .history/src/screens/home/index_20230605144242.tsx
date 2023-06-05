import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function HomeScreen() {

    const navigation = useNavigation();
    const [data, setData] = useState([])


    useFocusEffect(
        React.useCallback(() => {

            // get data from async storage
            AsyncStorage.getItem('images')
                .then((jsonValue) => {
                    setData(JSON.parse(jsonValue))
                })
                .catch((error) => console.log(error))

            return () => {
                // cleanup
            }

        }, [])
    )

    return (
        <View style={styles.container}>
            <Text>index</Text>

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