import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddScreen() {
    const ref = useRef(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null)
    const [image, setImage] = useState(null)

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
            const data = await Camera.takePictureAsync(null)
            // setImages((image) => [...image, data])
            setImage(data)
        }
    }


    return (
        <View style={styles.container}>
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
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
