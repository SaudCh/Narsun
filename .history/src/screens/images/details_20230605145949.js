import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function DetailsScreen({ route }) {

    const navigation = useNavigation();
    const { item } = route.params

    const deleteImage = () => {
        AsyncStorage.getItem('images')
            .then((jsonValue) => {
                const data = JSON.parse(jsonValue)
                const newData = data.filter((i) => i.id !== item.id)
                AsyncStorage.setItem('images', JSON.stringify(newData))
                    .then(() => {
                        alert("Image deleted successfully")
                        navigation.navigate('HomeScreen')
                    })

            })
            .catch((error) => console.log(error))
    }


    return (
        <View>
            <Image
                source={{ uri: item.image }}
                style={{ width: '100%', height: 200 }}
            />
            <Text style={{ fontSize: 20 }}>{item.title}</Text>

            <Button
                mode={"contained"}
                style={{
                    width: '100%',
                    marginTop: 10,
                }}
                textColor='#fff'
                onPress={() => deleteImage()} >
                Delete
            </Button>



        </View>
    )
}

const styles = StyleSheet.create({})