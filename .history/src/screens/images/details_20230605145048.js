import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DetailsScreen({ route }) {

    const { item } = route.params
    

    return (
        <View>
            <Text>details</Text>
        </View>
    )
}

const styles = StyleSheet.create({})