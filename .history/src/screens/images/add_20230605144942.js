import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

import { useState, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function AddScreen() {
    const navigation = useNavigation();
    const ref = useRef(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
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

    const saveImage = async () => {

        if (!title) {
            alert("Please enter title")
            return
        }

        const ext = image?.uri.split('.').pop();
        const filename = `${new Date()}.${ext}`;
        const file = {
            uri: image?.uri,
            name: filename.trim(),
            type: `image/${ext}`,
        };

        let fData = new FormData();
        fData.append("upload_preset", "da02ej7p");
        fData.append("file", file);
        fData.append("cloud_name", "depwj5d5a");

        setLoading(true)
        let img = await axios
            .post("https://api.cloudinary.com/v1_1/depwj5d5a/image/upload", fData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                },
            })
            .then((res) => {
                return res?.data ? res.data.secure_url : "";
            })
            .catch((err) => {
                console.log(err?.response?.data.message || err.message);
            });

        setLoading(false)

        if (!img) {
            alert("Image upload failed");
            return
        }

        const data = {
            title,
            image: img,
            id: new Date().getTime().toString()
        }

        setLoading(true)
        // save into async storage
        let images = await AsyncStorage.getItem('images')
        images = images ? JSON.parse(images) : []
        images.push(data)
        await AsyncStorage.setItem('images', JSON.stringify(images))

        setLoading(false)

        alert("Image saved successfully")
        navigation.navigate('HomeScreen')

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
                    mode={"outlined"}
                    label="Title"
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={{
                        width: '100%',
                    }}
                />

                <Button
                    mode={"contained"}
                    loading={loading}
                    disabled={loading}
                    style={{
                        width: '100%',
                        marginTop: 10,
                    }}
                    textColor='#fff'
                    onPress={() => saveImage()} >
                    Save
                </Button>
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
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20

    }
});
