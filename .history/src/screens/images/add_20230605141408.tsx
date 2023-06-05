import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

export default function AddScreen({ routes = { params: { image: String } } }) {

    const { image } = routes.params;

    console.log(image);

    return (
        <View>
            <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})