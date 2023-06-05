import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as React from 'react';

import HomeScreen from '../screens/home';
import DetailsScreen from '../screens/images/details';
import AddScreen from '../screens/images/add';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AddScreen" component={AddScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen}
                    options={{
                        // hide header back button text
                        headerBackTitle: '',
                        // hide header back button
                        headerBackVisible: false,
                        
                    }}

                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;