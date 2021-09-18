import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Icon, Badge } from 'react-native-elements';
import Database from './Database';
const db = new Database();
export class CartComponant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart_count:0,
            dbs: '',
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        this.getCartData();
        // this.viewListData();
    }
    getCartData() {

        db.cartCont(this.state.dbs).then((data) => {
    
            if (data != null) {

                this.setState({
                    cart_count: data,
                    isLoading: false,
                });
            }
        });
      
        // db.cartCont(this.state.dbs).then((results) => {
        //     result = results;
        //     for (var i = 0; i < result.length; i++) {
        //         pPrice = result[i].pPrice;
        //         total += parseFloat(pPrice);

        //     }

        //     this.setState({
        //         isLoading: false,
        //         _list_elimination: results,
        //         _total: total
        //     });
        // }).catch((err) => {
        //     console.log(err);
        // })


    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                <View style={{ padding: 20, marginRight: 10 }}>
                    <Icon
                        name='shopping-cart'
                        type='font-awesome'
                        color='black'
                        iconStyle={{ fontSize: 30, fontWeight: 'normal' }}
                    />
                    <Badge
                        status="error"
                        value={this.state.cart_count}
                        containerStyle={{ position: 'absolute', left: 40, top: 15 }}
                    />

                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    profile: {
        width: 80,
        height: 80,
        borderWidth: 8,
        borderRadius: 40,
        borderColor: '#fff'
    }
});