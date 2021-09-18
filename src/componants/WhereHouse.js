import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet,StatusBar } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
export class WhereHouse extends Component {
    constructor(props) {
        super(props)

    }
    

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#3B7457" />
                 <CustomHeader title="Loyality Card" isPost={false} isHome={true} bdcolor='#3B7457' bgcolor='#3B7457' navigation={this.props.navigation} />
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                        <Image source={IMAGE.ICON_MALOGO}
                            style={{ height: 85, width: 90 }}
                        >

                        </Image>
                        <Text style={{ fontSize: 50, fontWeight: 'bold' }}>Marlen's</Text>
                        <Text style={{ fontSize: 35, marginBottom: 10 }}>Warehouse</Text>
                        <Image source={IMAGE.ICON_WHEREHOUSE}
                            style={{ height: 290, width: 350 }}
                        >
                        </Image>

                        <View style={{ height: 320, width: 320, borderWidth: 7, borderColor: '#009688', borderRadius: 25, marginTop: 20, alignItems: 'center' }}>
                            <View style={{ width: 250, marginTop: 10, height: 50, borderWidth: 1, borderColor: '#009688', borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30 }}>Marlen's</Text>
                            </View>
                            <Image source={IMAGE.ICON_ICONS}
                                style={{ height: 70, width: 250 }}
                            >
                            </Image>
                            <View style={{padding:10}}>
                                <Text style={{fontSize:17}}>
                                    Marlen's Warehouse is much more than a coffee shop.
                                 
                            </Text>
                            <Text style={{fontSize:17,paddingTop:10}}>
                            With a focus on sustainability we cherish the chance to inspire each customer who walk throgh our doors.
                            </Text>
                            </View>
                           

                        </View>
                        <View style={{ height: 230, width: 320, borderWidth: 7, borderColor: '#009688',  marginTop: 50, alignItems: 'center' }}>
                                <Text style={{fontSize:35,fontWeight:'bold',color:'#009688'}}>LOYALTY CARD</Text>
                                <Text style={{fontWeight:'bold',fontSize:20,color:'gray'}}>EVERY 6TH COFFEE FREE</Text>
                        <View style={{marginTop:10}}>
                        <Image source={IMAGE.ICON_SMILECOFFEE}
                                style={{ height: 100, width: 220 }}
                            >
                            </Image>
                        </View>
                        <TouchableOpacity style={{ marginTop: 20,marginBottom:50 }}
                            onPress={() => this.props.navigation.navigate('SignIn')}
                        >
                           
                        </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <TouchableOpacity style={{ marginTop: 20,marginBottom:50 }}
                            onPress={() => this.props.navigation.navigate('SignIn')}
                        >
                            <Text>Wherehouse</Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>
            </SafeAreaView>
        );
    }
}