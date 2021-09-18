import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { IMAGE } from '../constants/image';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Star from 'react-native-star-view';

export class PlaceOrder extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const starStyle = {
            width: 100,
            height: 20,
            marginBottom: 20,
        };
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f5e9d1' }}>

                {/* <View style={styles.header}>
                    <View style={{ marginTop: 0, marginLeft: 20, marginBottom: 0, }}>
                        <Text style={{ fontSize: 25, marginTop: 30, zIndex: 1, fontWeight: 'bold', color: 'white' }}>Cappuccino</Text>
                        <Text style={{ fontSize: 15, color: '#dadada' }}>Cappuccino cofee with some</Text>
                        <Text style={{ fontSize: 15, color: '#dadada' }}>extra milk</Text>

                        <View style={{ paddingLeft: 40, justifyContent: 'center', alignContent: 'center', }}>
                            <Image source={IMAGE.ICON_COFFEE}
                                style={{ height: 220, width: 255 }}
                            >
                            </Image>
                        </View>

                    </View>
                    <View style={{ position: 'absolute', marginTop: 0, marginLeft: -40 }}>
                        <View >

                            <View style={styles.brestposition3}></View>
                            <View style={styles.brestposition4}></View>
                        </View>
                    </View>
                </View> */}
                <View style={{ backgroundColor: '#f5e9d1', }}>
                    {/* <View style={{ flexDirection: 'row-reverse', marginHorizontal: 5, zIndex: 5, }}>
<Text>dasdasdad</Text>

                    </View> */}
                    <View style={{ marginLeft: 20, marginTop: 50 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Shopping cart</Text>
                        <Text style={{ fontSize: 13, }}>A total 3 Pieces</Text>
                    </View>
                    <View style={{ padding: 20, }}>


                        <View style={{ flexDirection: 'row', paddingTop: 25 }}>
                            <View style={{ backgroundColor: '#ff8d28', height: 100, width: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={IMAGE.ICON_COFFEE}
                                    style={{ height: 65, width: 80 }}>
                                </Image>
                            </View>
                            <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15 }}> Cappuccino</Text>
                                <Text style={{ fontSize: 11, color: 'gray', paddingLeft: 20, paddingTop: 5, marginRight: 100 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 13, paddingLeft: 20, paddingTop: 7 }}>$ 10</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 25 }}>
                            <View style={{ backgroundColor: '#ffba00', height: 100, width: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={IMAGE.ICON_LATE}
                                    style={{ height: 65, width: 80 }}>
                                </Image>
                            </View>
                            <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15 }}> Lathe</Text>
                                <Text style={{ fontSize: 11, color: 'gray', paddingLeft: 20, paddingTop: 5, marginRight: 100 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 13, paddingLeft: 20, paddingTop: 7 }}>$ 10</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 25 }}>
                            <View style={{ backgroundColor: '#7b412d', height: 100, width: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={IMAGE.ICON_ICECOFFEE}
                                    style={{ height: 65, width: 80 }}>
                                </Image>
                            </View>
                            <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15 }}> Ice Coffee</Text>
                                <Text style={{ fontSize: 11, color: 'gray', paddingLeft: 20, paddingTop: 5, marginRight: 100 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 13, paddingLeft: 20, paddingTop: 7 }}>$ 10</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:70 }}>
                            <View>
                                <Text>Total</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#7b412d' }}>$ 30</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.button}>
                                    {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('BMIMeter')}> */}
                                    <Text style={styles.buttonText}>Place Order</Text>
                                </TouchableOpacity>
                            </View>

                        </View>




                        {/* <Text style={{ color: '#7b412d', fontSize: 20, paddingBottom: 10, fontWeight: 'bold' }}>Product Description</Text>
                        <Text style={{ color: 'gray', textAlign: 'justify', fontSize: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin est neque, et volutpat nulla tincidunt id. In id sem id nulla eleifend mollis. Maecenas sed varius ante. Nulla fringilla posuere finibus. Vestibulum dapibus interdum mi non faucibus. Ut nec nisi a nisl suscipit tristique eget eu eros. Quisque egestas magna libero. Nunc nec turpis a libero cursus facilisis. Nullam venenatis dolor eget nunc vestibulum, sit amet posuere nisi fringilla. Phasellus aliquet ultrices pellentesque.</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text>Total</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#7b412d' }}>$ 29.50</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.button}>

                                    <Text style={styles.buttonText}>Place Order</Text>
                                </TouchableOpacity>
                            </View>

                        </View> */}

                    </View>
                    <View>

                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({





    header: {
        flex: 2,
        backgroundColor: '#7b412d'
    }, footer: {
        backgroundColor: '#f5e9d1',
        flex: 3,
        // flex: 1,
        // flexDirection: 'row',

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingRight: 10,
        paddingTop: 10

    }, button: {

        backgroundColor: "red",
        padding: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        marginTop: -5,
        marginLeft: 18,
        marginBottom: 10,
        // marginVertical: 5,
        //  zIndex:5
    }, buttonText: {
        fontSize: 15,
        color: '#fff',
    }
    , brestposition3: {
        width: 260,
        height: 260,
        marginRight: -30,
        marginTop: -30,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(102, 51, 33, 0.8)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition4: {
        width: 170,
        height: 170,
        // marginRight: 12,
        marginTop: 12,
        marginLeft: 42,
        backgroundColor: 'rgba(123, 65, 45, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }, button: {
        backgroundColor: "#7b412d",
        padding: 15,
        borderRadius: 25,
        // width:'200',
        width: 190,

        marginTop: 13,
        //marginLeft: 18,
        // marginVertical: 5
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
});