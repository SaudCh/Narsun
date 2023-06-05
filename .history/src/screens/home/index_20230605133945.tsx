import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

    const navigation = useNavigation();

    return (
        <View>
            <Text>index</Text>

            <Button
                style={styles.button}
                title="Go to AddScreen"
                onPress={() => navigation.navigate('AddScreen')}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    }
})