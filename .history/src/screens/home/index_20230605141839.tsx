import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HomeScreen() {

    const navigation = useNavigation();

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