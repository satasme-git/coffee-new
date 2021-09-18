import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  
} from 'react-native';
import {Badge} from 'react-native-elements';
import {IMAGE} from './constants/image';
import {Avatar} from 'react-native-elements';
import Database from './Database';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import Context from '../Context/context';


const db = new Database();
const styles = StyleSheet.create({
  text: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  textvalid: {
    backgroundColor: 'red',
  },
  textinvalid: {
    backgroundColor: '#009688',
  },
});

let aaa = 0;
export class CustomHeader extends Component {
  // state = {
  //   _cart_count: 0,
  // };

  constructor(props) {
    super(props);

    // this.props.navigation.navigate.userName;
    this.state = {
      isLoading: true,
      vale: 66,
      cart_qty: this.props.navigation.navigate.cart_qty,
      dbs: '',
      _cart_count: 0,
      _fodcart_count: 0,
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    });
    this.loadDbVarable = this.loadDbVarable.bind(this);
  }
  static contextType = Context;
  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
  }

  async componentDidMount() {
    const {navigation} = this.props;
    const myArray = await AsyncStorage.getItem('cus_id');

    this._unsubscribe = navigation.addListener('focus', () => {
      if (myArray != "") {
        db.initDB().then((result) => {
          this.loadData(result);
          this.loadFoodCart(result);
        });
        this.loadData();
      this.loadFoodCart();
      } else {
        this.setState({
          _cart_count: 0,
          _fodcart_count: 0,
          _cus_id: myArray,
        });
      }

      
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }

  loadData(result) {
    this.setState({
      dbs: result,
    });

    db.boxcartCont(this.state.dbs)
      .then((data) => {
        let cart_count = data;

        this.setState({
          isLoading: false,
          _cart_count: cart_count,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // db.cartCont(this.state.dbs)
    // .then((data) => {
    //   let foodcart_count = data;

    //   this.setState({
    //     isLoading: false,
    //     _fodcart_count: foodcart_count,
    //   });
    //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+foodcart_count);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  loadFoodCart(result) {
    this.setState({
      dbs: result,
    });

    db.cartCont(this.state.dbs)
      .then((data) => {
        let foodcart_count = data;


        this.setState({
          isLoading: false,
          _fodcart_count: foodcart_count,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // db.cartcount(this.state.dbs)
    //   .then((data) => {
    //   let cart_countnew = data;

    //   this.setState({
    //     isLoading: false,
    //     _fodcart_count: cart_countnew,
    //   });
    //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+cart_countnew);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  render() {
    let {
      navigation,
      isHome,
      title,
      iconColor,
      bgcolor,
      bdcolor,
      isPost,
      cart_qty,
    } = this.props;
    // cart_qty: this.props.navigation.navigate.cart_qty;

    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: bdcolor,
          height: 55,
          borderBottomColor: 'white',

          borderBottomWidth: 0,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {isHome ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon
                name="arrow-back-outline"
                iconStyle={{
                  fontWeight: 'normal',
                }}
                size={25}
                color="white"
                onPress={() => this.props.navigation.navigate('wherehouse')}
              />
              {/* <Image style={{ width: 28, height: 28, marginLeft: 0,padding:4 }}
                  source={IMAGE.ICON_MENU_ICON}
                  resizeMode="contain"

                /> */}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                backgroundColor: '#3B7457',
                padding: 5,
                paddingLeft: -5,
                width: 40,
                borderRadius: 15,
              }}
              onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back-outline"
                iconStyle={{
                  fontWeight: 'normal',
                }}
                size={25}
                color="white"
                onPress={() => this.props.navigation.goBack()}
              />
              {/* <Image style={{ width: 20, height: 20, marginLeft: 10 }}
                  source={IMAGE.ICON_BACK}
                  resizeMode="contain"
                /> */}
              {/* <Text>Back</Text> */}
            </TouchableOpacity>
          )}
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: 'normal',
              color: 'white',
            }}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {isPost == 1 ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Cart')}>
              <View style={{padding: 10, marginLeft: 60}}>
                <Icon
                  name="cart-outline"
                  iconStyle={{
                    fontWeight: 'normal',
                  }}
                  size={26}
                  color="white"
                />
                <Badge
                  status="error"
                  value={this.context.catVal}
                  containerStyle={{position: 'absolute', left: 29, top: 3}}
                />
              </View>
            </TouchableOpacity>
          ) : isPost == 2 ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Boxes Cart')}>
              <View style={{padding: 10, marginLeft: 60}}>
                {/* <Icon
                  name="shopping-cart"
                  type="font-awesome"
                  color="white"
                  iconStyle={{fontSize: 30, fontWeight: 'normal'}}
                /> */}
                <Icon
                  name="cart-outline"
                  iconStyle={{
                    fontWeight: 'normal',
                  }}
                  size={26}
                  color="white"
                />
                <Badge
                  status="error"
                  value={this.state._cart_count}
                  containerStyle={{position: 'absolute', left: 29, top: 3}}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
