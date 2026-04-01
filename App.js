import {SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import React from 'react';

export default function App() {

    const fetchData = async () => {
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'offwhite',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    listContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    }, 
});
