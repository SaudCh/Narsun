import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

    const navigation = useNavigation();

    return (
        <View>
            <Text>index</Text>

            <Button
                title="Go to AddScreen"
                onPress={() => navigation.navigate('AddScreen')}
            />

        </View>
    )
}

const styles = StyleSheet.create({})