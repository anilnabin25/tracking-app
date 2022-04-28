import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import RNLocation from 'react-native-location';
import axios from 'axios';

RNLocation.configure({distanceFilter: 5});

const App = () => {
    const [viewLocation, isViewLocation] = useState({
        latitude: undefined,
        longitude: undefined
    });


    const uploadLocation = () => {
        try {
            console.log(viewLocation);

            let params = {location: viewLocation}
            // Make a request for a user with a given ID
            axios.get('http://tracking.divyashr.com.np/', {params: params})
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });


        } catch (error) {
            console.log('Something went wrong');
        }
    };

    const getLocation = async () => {
        let permission = await RNLocation.checkPermission({
            ios: 'whenInUse', // or 'always'
            android: {
                detail: 'coarse', // or 'fine'
            },
        });
        console.log(permission);
        if (!permission) {
            permission = await RNLocation.requestPermission({
                ios: 'whenInUse',
                android: {
                    detail: 'coarse',
                    rationale: {
                        title: 'We need to access your location',
                        message: 'We use your location to show where you are on the map',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel',
                    },
                },
            });
            console.log(permission);
        }
        RNLocation.subscribeToLocationUpdates(subLocation => {
            const loc = JSON.stringify(subLocation[0]);
            Alert.alert('outside');
            console.warn(loc);
            // @ts-ignore
            isViewLocation(subLocation[0]);
        });
    };

    return (
        <View style={styles.container}>
            <Text>React Native Geolocation</Text>
            <View style={styles.viewStyle}>
                <Button title="Get Location" onPress={getLocation}/>
            </View>
            <Text>Latitude: {viewLocation.latitude} </Text>
            <Text>Longitude: {viewLocation.longitude} </Text>
            <View style={styles.viewStyle}>
                <Button title="Send Location" onPress={uploadLocation}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        width: '40%'
    },
});

export default App;
