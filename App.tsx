import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Linking, Alert} from 'react-native';
import RNLocation from 'react-native-location';

RNLocation.configure({distanceFilter: 5,})


const App = () => {
    const [viewLocation, isViewLocation] = useState([0, 0])
    const uploadLocation = () => {
        try {
            console.log(viewLocation)
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    const getLocation = async () => {
        let permission = await RNLocation.checkPermission({
            ios: 'whenInUse', // or 'always'
            android: {
                detail: 'coarse' // or 'fine'
            }
        });
        console.log(permission)
        if (!permission) {
            permission = await RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "coarse",
                    rationale: {
                        title: "We need to access your location",
                        message: "We use your location to show where you are on the map",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }
                }
            })
            console.log(permission)

        }
        let location = await RNLocation.getLatestLocation({timeout: 100})
        // RNLocation.subscribeToLocationUpdates(location => {
        //     const loc = location[0].toString()
        //     console.warn(loc);
        //     Alert.alert(loc);
        // });
        console.log(location)
        isViewLocation(location)
    }


    return (
        <View style={styles.container}>
            <Text>React Native Geolocation</Text>
            <View
                style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
                <Button title="Get Location"
                        onPress={getLocation}
                />
            </View>
            <Text>Latitude: {viewLocation.latitude} </Text>
            <Text>Longitude: {viewLocation.longitude} </Text>
            <View
                style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
                <Button
                    title="Send Location"
                    onPress={uploadLocation}
                />
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
});

export default App;
