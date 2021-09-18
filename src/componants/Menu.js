import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet, TouchableHighlight, StatusBar, Alert } from 'react-native';
import { IMAGE } from '../constants/image';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Star from 'react-native-star-view';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
export class Menu extends Component {
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


                <View style={{ flexDirection: 'column', backgroundColor: '#f5e9d1' }}>
                    <ScrollView

                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.container}>
                            {/* <Card > */}
                            <TouchableOpacity >
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10, paddingLeft: 20, paddingRight: 20, borderBottomColor: '#7b412d', borderBottomWidth: 8 }} >
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <View >
                                            <Image source={IMAGE.ICON_COFFEE}
                                                style={{ height: 45, width: 60 }}>
                                            </Image>
                                        </View>
                                        <Text style={{ paddingTop: 3, paddingLeft: 12, marginBottom: -5, fontSize: 12, alignItems: 'center', justifyContent: 'center' }}>Coffee</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10, paddingLeft: 20, paddingRight: 20 }} >
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <View style={{ paddingLeft: 15 }}>
                                            <Image source={IMAGE.ICON_TEA}
                                                style={{ height: 45, width: 35 }}>
                                            </Image>
                                        </View>
                                        <Text style={{ paddingTop: 3, paddingLeft: 18, marginBottom: -5, fontSize: 12, alignItems: 'center', justifyContent: 'center' }}>Tea</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10, paddingLeft: 20, paddingRight: 20 }} >
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <View >
                                            <Image source={IMAGE.ICON_FOOD}
                                                style={{ height: 45, width: 60 }}>
                                            </Image>
                                        </View>
                                        <Text style={{ paddingTop: 3, paddingLeft: 12, marginBottom: -5, fontSize: 12, alignItems: 'center', justifyContent: 'center' }}>Food</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10, paddingLeft: 20, paddingRight: 20 }} >
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <View  >
                                            <Image source={IMAGE.ICON_BEVERAGE}
                                                style={{ height: 45, width: 70 }}>
                                            </Image>
                                        </View>
                                        <Text style={{ paddingTop: 3, paddingLeft: 12, marginBottom: -5, fontSize: 12, alignItems: 'center', justifyContent: 'center' }}>Beverage</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                    >
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 15, paddingTop: 15 }}>Menu</Text>
                            <View style={styles.container2}>
                                <Card style={styles.card} >
                                    {/* <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('PeriodCalandar', { */}
                                    <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('EDDCalculator', {
                                        data: ''
                                    })}>
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 160, padding: 20, borderRadius: 50 }}>
                                                <Image source={IMAGE.ICON_COFFEE}
                                                    style={{ height: 100, width: 120 }}
                                                >
                                                </Image>
                                            </View>

                                        </View>
                                        <View style={{ marginLeft: 10, paddingRight: 10, marginTop: -15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 15 }}>Cappuccino</Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}> $10</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 11, color: 'gray' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                        </View>

                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.card]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}>
                                        {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('HealthDietChart')}> */}
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 160, padding: 10, borderRadius: 50 }}>
                                                <Image source={IMAGE.ICON_ICECOFFEE}
                                                    style={{ height: 120, width: 120 }}
                                                >
                                                </Image>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 8, paddingRight: 10, marginTop: -15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 15 }}> Ice Cofee</Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}> $15</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 11, color: 'gray' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                            </View>
                            <View style={styles.container2}>
                                <Card style={styles.card} >
                                    {/* <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('PeriodCalandar', { */}
                                    <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('EDDCalculator', {
                                        data: ''
                                    })}>
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 160, padding: 20, borderRadius: 50 }}>
                                                <Image source={IMAGE.ICON_LATE}
                                                    style={{ height: 100, width: 130 }}
                                                >
                                                </Image>
                                            </View>

                                        </View>
                                        <View style={{ marginLeft: 10, paddingRight: 10, marginTop: -15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 15 }}>Lathe</Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}> $10</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 11, color: 'gray' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                        </View>

                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.card]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}>
                                        {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('HealthDietChart')}> */}
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 160, padding: 10, borderRadius: 50 }}>
                                                <Image source={IMAGE.ICON_AMERICANO}
                                                    style={{ height: 120, width: 90 }}
                                                >
                                                </Image>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 8, paddingRight: 10, marginTop: -15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 15 }}> americano</Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}> $15</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 11, color: 'gray' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                            </View>
                            <View style={styles.container2}>
                                <Card style={styles.card} >
                                    {/* <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('PeriodCalandar', { */}
                                    <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('EDDCalculator', {
                                        data: ''
                                    })}>
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 160, padding: 20, borderRadius: 50 }}>
                                                <Image source={IMAGE.ICON_COFFEE}
                                                    style={{ height: 100, width: 120 }}
                                                >
                                                </Image>
                                            </View>

                                        </View>
                                        <View style={{ marginLeft: 10, paddingRight: 10, marginTop: -15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 15 }}>Cappuccino</Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}> $10</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 11, color: 'gray' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                        </View>

                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.card]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}>
                                        {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('HealthDietChart')}> */}
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 160, padding: 10, borderRadius: 50 }}>
                                                <Image source={IMAGE.ICON_ICECOFFEE}
                                                    style={{ height: 120, width: 120 }}
                                                >
                                                </Image>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 8, paddingRight: 10, marginTop: -15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 15 }}> Ice Cofee</Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}> $15</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 11, color: 'gray' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                            </View>
                            {/* <View style={styles.container}>
                                <Card style={[styles.card]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WeightGainDetailsAdd')}>
                                     
                                        <View style={[{ alignItems: "center" }, styles.touchableopacity]} >
                                            <View style={{ height: 80, padding: 15, backgroundColor: '#fceefd', borderRadius: 50 }}>
                                                <Image source={IMAGE.ICON_WEIGHT_SCALE}
                                                    style={{ height: 45, width: 45 }}
                                                >
                                                </Image>
                                            </View>
                                            <Text style={{ marginTop: 0, color: '#ff00da' }}>Weight Gain chart</Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>


                                <Card style={styles.card} >
                                    <TouchableOpacity style={styles.touchableopacity} onPress={() => this.props.navigation.navigate('BloodPresureDetailsAdd')}>
                                        <View style={{ alignItems: "center" }} >
                                            <View style={{ height: 80, padding: 15, backgroundColor: '#fdefe6', borderRadius: 50 }}>
                                                <Image source={IMAGE.ICON_BLOOD_PRESURE}
                                                    style={{ height: 50, width: 50 }}
                                                >
                                                </Image>
                                            </View>
                                            <Text style={{ marginTop: 0, color: '#ff6c00' }}>Blood presure</Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>

                            </View> */}
                        </View>
                    </ScrollView>
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
        backgroundColor: "#ff8d28",
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
    }, container: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff'

    }, container2: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#fff'

    }, card: {
        height: 220,
        backgroundColor: 'rgba(255, 255, 255,1)',
        borderRadius: 15,
        elevation: 1,
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: 'center',
        margin: 10
    }
});