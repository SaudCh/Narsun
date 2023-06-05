import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HomeScreen() {

    const navigation = useNavigation();

    return (
        <View>
            <Text>index</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddScreen')}
            >
                <Ionicons name="add-circle" size={24} color="black" />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    }
})