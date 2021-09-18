import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { IMAGE } from '../constants/image';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
export class FirstPage extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>

                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
                <View style={{ backgroundColor: '#dd0506', height: 80, zIndex: -1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 30, paddingTop: 30 }}>Marlen's Warehouse</Text>
                </View>
                <Image source={IMAGE.ICON_ROOF}
                    style={{ height: 80, width: 400 }}>
                </Image>
                <Image source={IMAGE.ICON_COFEESHOP}
                    style={{ height: 180, width: 400, zIndex: -1 }}>
                </Image>

                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('EDDCalculator', {
                        data: ''
                    })}>
                        <View style={[{ alignItems: "center" }]} >
                        <View style={[{ height: 90, padding: 20, backgroundColor: '#fff', borderRadius: 50 },styles.shaddow]}>
                                <Image source={IMAGE.ICON_INTRACT}
                                    style={{ height: 55, width: 55 }}
                                >
                                </Image>
                            </View>

                            <Text style={{ marginTop: 5, color: '#000' }}>Interact</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}>
                        {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('HealthDietChart')}> */}
                        <View style={[{ alignItems: "center" }, styles.touchableopacity]} >
                        <View style={[{ height: 90, padding: 20, backgroundColor: '#fff', borderRadius: 50 },styles.shaddow]}>
                                <Image source={IMAGE.ICON_INVOLVE}
                                     style={{ height: 55, width: 55 }}
                                >
                                </Image>
                            </View>
                            <Text style={{ marginTop: 5, color: '#000' }}>Involve</Text>

                        </View>
                    </TouchableOpacity>




                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('EDDCalculator', {
                        data: ''
                    })}>
                        <View style={{ alignItems: "center" }} >
                            <View style={[{ height: 90, padding: 20, backgroundColor: '#fff', borderRadius: 50 },styles.shaddow]}>
                                <Image source={IMAGE.ICON_INTEGRETE}
                                     style={{ height: 55, width: 55 }}
                                >
                                </Image>
                            </View>

                            <Text style={{ marginTop: 5, color: '#000' }}>Integrate</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}>
                        {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('HealthDietChart')}> */}
                        <View style={[{ alignItems: "center", }, styles.touchableopacity]} >
                        <View style={[{ height: 90, padding: 20, backgroundColor: '#fff', borderRadius: 50 },styles.shaddow]}>
                                <Image source={IMAGE.ICON_INVESTMENT}
                                    style={{ height: 55, width: 55 }}
                                >
                                </Image>
                            </View>
                            <Text style={{ marginTop: 5, color: '#000' }}>Invest</Text>
                        </View>
                    </TouchableOpacity>




                </View>
                {/* <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SettingDetail')}

          >
            <Text>tEST dCRENN</Text>
   
          </TouchableOpacity> */}
                {/* </View> */}

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    overview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 25,
    },
    // card: {
    //     borderWidth: 1,
    //     padding: 25,
    //     marginTop: 25,
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 0,
    //     },
    //     shadowOpacity:1,
    //     shadowRadius: 10,

    //     elevation: 11,
    // }
    card: {
        height: 115,
        // width: (Dimensions.get("window").width / 2) - 20,
        // width: "45%",
        backgroundColor: 'rgba(255, 255, 255,1)',
        borderRadius: 15,
        // padding: 10,
        elevation: 1,
        // shadowColor: '#fff',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: 'center',



        margin: 5
    }, cardHorizontal: {
        height: 150,
        backgroundColor: 'white',
        // width: 300,
        width: (Dimensions.get("window").width) - 55,
        // width: "90%",
        // backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        // alignItems: 'center',


        margin: 5
    }, scrollContainer: {
        flex: 1,
    }, container: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15,
        // paddingLeft:30,
        // paddingRight:30,
        marginHorizontal: 30,
    }, touchableopacity: {
        height: 115,
        // width: (Dimensions.get("window").width / 2) - 20,

        alignItems: 'center',
        justifyContent: 'center',
        width: 165,
        paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 10,
       
       
    },
    periodcard: {
        height: 115,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        elevation: 1,
        // shadowColor: 'gray',
        shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.2,
        shadowRadius: 8,
        // alignItems: 'center',
        margin: 5,
        padding: 15

    }, brestposition3: {
        width: 260,
        height: 260,
        marginLeft: -80,
        marginTop: -30,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 178, 0.8)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition4: {
        width: 170,
        height: 170,
        // marginRight: 12,
        marginTop: 12,
        marginLeft: -42,
        backgroundColor: 'rgba(243, 242,242, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }
    , brestposition5: {
        width: 260,
        height: 260,
        marginLeft: 280,
        marginTop: 390,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 175, 0.5)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition6: {
        width: 140,
        height: 140,
        // marginRight: 12,
        marginTop: 450,
        marginLeft: 338,
        backgroundColor: 'rgba(242, 242,242, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    },shaddow:{
        elevation: 1,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        // alignItems: 'center',
        // margin: 5,
        // padding: 15
    }
});
