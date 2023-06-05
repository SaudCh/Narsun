import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as React from 'react';

import HomeScreen from '../screens/home';
import CameraScreen from '../screens/images/camera';
import DetailsScreen from '../screens/images/details';
import AddScreen from '../screens/images/camera';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="CameraScreen" component={CameraScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="AddScreen" component={AddScreen} />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;