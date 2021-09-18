import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { Avatar, Badge } from 'react-native-elements';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
export class AboutUsScreeen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-light" hidden={false} backgroundColor="#3B7457" />
                <CustomHeader title="About Us" isPost={false} isHome={true} bdcolor='#3B7457' bgcolor='#3B7457' navigation={this.props.navigation} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.container}>
                            <Card style={[styles.card,]} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedingTimeChart', {
                                    data: ''
                                })}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{}}>
                                            <Image source={IMAGE.ICON_COFFEE}
                                                style={{ height: 28, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>


                            <Card style={[styles.card]} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('UrinationTime')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{}}>
                                            <Image source={IMAGE.ICON_LEAF}
                                                style={{ height: 38, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Card style={[styles.card,]} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EliminationChart')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{}}>
                                            <Image source={IMAGE.ICON_POLYGON}
                                                style={{ height: 42, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Card style={[styles.card,]} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BathTracking')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{}}>
                                            <Image source={IMAGE.ICON_HOUSE}
                                                style={{ height: 40, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>

                        </View>

                        <View style={{
                            width: "90%", height: 130, backgroundColor: '#fff', elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5, marginTop: 15,
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '55%', padding: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}> Our Coffee</Text>
                                    <Text style={{ fontSize: 12 }}>
                                        We use the highest quality coffee
                                        beans, brewed to perfection by our
                                        expert Baristas every time.
                                    </Text>
                                </View>
                                <View style={{ padding: 10 }}>
                                    <Image source={IMAGE.ICON_ABTIMG1}
                                        style={{ height: 105, width: 140 }}
                                    />
                                </View>
                            </View>

                        </View>
                        <View style={{
                            width: "90%", height: 135, backgroundColor: '#fff', elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5, marginTop: 15,
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 10 }}>
                                    <Image source={IMAGE.ICON_ABTIMG2}
                                        style={{ height: 110, width: 140 }}
                                    />
                                </View>
                                <View style={{ width: '55%', padding: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}> Our Boxes</Text>
                                    <Text style={{ fontSize: 11 }}>
                                        The backbone of the business
                                        and the idea that started it all.
                                        We have thousands of recycled
                                        cardboard boxes in store. Pick-
                                        up 10 for free! Great for both the
                                        wallet and environment.
                                    </Text>
                                </View>

                            </View>

                        </View>
                        <View style={{
                            width: "90%", height: 140, backgroundColor: '#fff', elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5, marginTop: 15,
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '55%', padding: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Our Sustainability</Text>
                                    <Text style={{ fontSize: 11 }}>
                                        Marlen’s Warehouse is more than
                                        just a coffee shop. We’re an
                                        Australian first sustainability initiative,
                                        working with sustainable items to
                                        encourage recycling and a more
                                        sustainable circular economy

                                    </Text>
                                </View>
                                <View style={{ padding: 10 }}>
                                    <Image source={IMAGE.ICON_ABTIMG3}
                                        style={{ height: 115, width: 140 }}
                                    />
                                </View>
                            </View>

                        </View>
                        <View style={{
                            width: "90%", height: 135, backgroundColor: '#fff', elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5, marginTop: 15,
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 10 }}>
                                    <Image source={IMAGE.ICON_ABTIMG4}
                                        style={{ height: 110, width: 140 }}
                                    />
                                </View>
                                <View style={{ width: '55%', padding: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Our Honey</Text>
                                    <Text style={{ fontSize: 11 }}>
                                        Backyard honey extracted on
                                        site! Tastier than store bought (no
                                        nasty additives) and completely
                                        sustainable.

                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }

} const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 20,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
    }, card: {
        height: 72,
        backgroundColor: "white",
        borderRadius: 85,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 5
    }
});