import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { IMAGE } from '../constants/image';
export class AboutUs extends Component {
    constructor(props){
        super(props);
      }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3B7457" />
                
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                    <Image source={IMAGE.ICON_MALOGO}
                        style={{ height: 85, width: 90 }}
                    >

                    </Image>
                    <View style={{ width: 300, height: 90, backgroundColor: '#3B7457', marginTop: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold' }}>About</Text>
                    </View>
                    <Text style={{ fontSize: 50, fontWeight: 'bold' }}>Marlen's</Text>
                    <Text style={{ fontSize: 35, marginBottom: 10, marginTop: -15 }}>Warehouse</Text>
                    <View style={{ width: 350, height: 300, backgroundColor: '#3B7457', borderRadius: 20 }}>
                        <Text style={{ padding: 30, fontSize: 18 }}>
                            Marlen’s Warehouse is much more then a coffee shop.
                            {"\n"}
                            {"\n"}
                            With a focus on sustainability we cherish the chance to inspire each customer who walks through our doors.
                        </Text>
                    </View>

                </View>

            </SafeAreaView>
        );
    }
}