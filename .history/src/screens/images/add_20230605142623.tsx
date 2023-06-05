import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';



export default function AddScreen() {
    const navigation = useNavigation();
    const ref = useRef(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null)
    const [taken, setTaken] = useState(false)
    const [image, setImage] = useState({
        uri: '',
    })

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage(data)
        }
    }

    if (image?.uri) {
        return (
            <View style={styles.imageContainer}>
                <Text style={styles.title}>Preview</Text>
                <Image
                    source={{ uri: image.uri }}
                    style={{ width: 200, height: 200 }}
                />
                <TextInput
                    mode='outlined'
                    label="Title"
                    value=""
                    onChangeText={text => console.log(text)}
                    style={{
                        width: '100%',
                    }}
                />

                <Button title="Save" onPress={() => navigation.navigate('HomeScreen')} />
            </View>
        )
    }




    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Entypo name="chevron-thin-left" size={24} color="#fff" style={styles.backButton} />
            </TouchableOpacity>
            <Camera
                ref={(ref) => setCamera(ref)}
                style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <MaterialIcons name="flip-camera-ios" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clickButton} onPress={takePicture} />
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 5,
        zIndex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginVertical: 64,
        marginHorizontal: 12,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-start',
    },
    clickButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        marginLeft: -25,
        borderColor: 'black',
        borderWidth: 2,

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20

    }
});
