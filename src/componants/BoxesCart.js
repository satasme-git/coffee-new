import React, {PureComponent} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {List, ListItem, Left, Body, Right} from 'native-base';
import {Icon, Avatar, Button} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Database from '../Database';
import {parse} from 'react-native-svg';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

import stripe from 'tipsi-stripe';
import SwitchSelector from 'react-native-switch-selector';
import Modal from 'react-native-modal';
import {PaymentCardTextField} from 'tipsi-stripe';
import creditCardType from 'credit-card-type';
import {CustomHeader} from '../index';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const db = new Database();

stripe.setOptions({
  publishableKey: 'pk_test_Wim6Z9pN58qzMYDDXvsPMrR0',
});

const sugar = [
  {label: 'Cash payment', value: '1'},
  {label: 'Card payment', value: '2'},
];
export class BoxesCart extends PureComponent {
  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
    success: null,
    modalVisible: false,
    show: false,
    show2: false,
    // _alert_heading: 'defaultt',
    _subtitle: '',

    text: '',

    number: '',
    month: '',
    year: '',
    cvc: '',
    valid: '',
    name: '',

    errorMsg: '',

    indicatorShow: false,
   
  };

  handleOpen() {
    this.setState({show: true});
  }
  handleOpen2() {
    this.setState({show2: true});
  }
  handleClose = () => {
    this.setState({show: false});
    this.props.navigation.navigate('BoxessFree');
  };
  handleClose2 = () => {
    this.setState({show2: false});
    this.setState({token: null});
    // this.props.navigation.navigate('TabScreentest');
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  constructor(props) {
    super(props);
    this.state = {
      dbs: '',
      _list_elimination: [],
      _pQty: 1,
      _pPrice: 5,
      _total: 0,
      tokenId: '',
      loading: true,
      showAlert: false,
      _cus_id: '',
      _rbsheet_height: 80,
      _alert_heading: 'defaultt',
      cart_details: '',
      _payment_method: 'Cash',
      pressed: false,
      _category: '',
      emptyCartButton: false,
      isVisible2: false,
      _deleteId:-1
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    });
    this.loadDbVarable = this.loadDbVarable.bind(this);
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  changeSML(value) {
    var smlval = value;

    if (value == 1) {
      this.setState({
        _alert_heading: 'Order Successful',
        _subtitle: 'Thank you! Order is complete',
        _payment_method: 'Cash',
      });

      this.emptyCartData();
    }
    if (value == 2) {
      this.setState({
        _alert_heading: 'Payment Successful',
        _subtitle: 'Thank you! Payment is complete',
        _payment_method: 'Card',
      });
      // this.handleCardPayPress();
      this.setModalVisible(true);
      this.RBSheet.close();
    }
  }
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
    this.props.navigation.navigate('BoxessFree');
  };

  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    this.getCartData();
  }
  setRbsheet_height() {
    this.setState({
      _rbsheet_height: 80,
    });
    this.RBSheet.open();
  }

  getCartData() {
    let {bPrice, result, total = 0, category} = this.props;
    db.listBoxCartData(this.state.dbs)
      .then((results) => {
        result = results;
      
        if (result == 0) {
          this.setState({
            isLoading: false,
            emptyCartButton: true,
            _list_elimination: results,
            _total: total,
          });
        } else {
          var jsonTextValues = [];
          result.map((item, index) => {
            jsonTextValues.push({
              label: item.bId,
              value: item.bName,
            });
          });

          for (var i = 0; i < result.length; i++) {
            bPrice = result[i].bPrice;
            total += parseFloat(bPrice);
            category = result[i].bCategory;
          }

          this.setState({
            isLoading: false,
            _list_elimination: results,
            _total: total,
            _category: category,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  substracttem(id, price, qty) {
    var price1 = price * (qty - 1);
    let data = {
      bQty: this.state._pQty,
      _pPrice: price1,
      bId: id,
    };
    db.subItemBoxQty(this.state.dbs, data)
      .then((result) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addItem(id, price, qty) {
    var price1 = price * (qty + 1);
    let data = {
      bQty: this.state._pQty,
      _pPrice: price1,
      bId: id,
    };

    db.addItemBoxQty(this.state.dbs, data)
      .then((result) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteData(id) {
    this.setState({
      isVisible2: true,
      _deleteId:id
    });

    // db.deleteBoxCartItem(this.state.dbs, id)
    //   .then((result) => {
    //     this.getCartData();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState = {};
    //   });
  }

  deleteCartItemByModal(){
    const id=this.state._deleteId;
  
    db.deleteBoxCartItem(this.state.dbs, id)
    .then((result) => {
      this.getCartData();
    })
    .catch((err) => {
      console.log(err);
      this.setState = {};
    });
      this.setState({
        _deleteId:-1
      });
  }

  // getData() {
  //   let {pPrice, total = 0} = this.props;
  //   db.listCartItems(this.state.dbs)
  //     .then((data) => {
  //       let result = data;

  //       for (var i = 0; i < result.length; i++) {
  //         pPrice = result[i].pPrice;
  //         total += parseFloat(pPrice);
  //       }
  //       this.setState({
  //         isLoading: false,
  //         _list_elimination: data,
  //         _total: total,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('cus_id');

    this.setState({
      isLoading: false,
      _cus_id: myArray,
    });
  }

  cardDetailsWrong() {
    this.handleOpen2();
  }

  doPayment = async () => {
    this.setState({
      pressed: true,
    });

    // Use firebase serve for local testing if you don't have a paid firebase account
    fetch(
      'https://us-central1-coffee-app-fb513.cloudfunctions.net/payWithStripe',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.floor(this.state._total * 100),
          currency: 'aud',
          token: this.state.token,

          // amount: Math.floor(this.state._total * 100),
          // currency: 'usd',
          // token: this.state.token,
        }),
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);

        this.setState({
          success: responseJson.status == 'succeeded' ? true : false,
          response: responseJson,
        });

        if (responseJson.status == 'succeeded') {
          this.emptyCartData();
        } else {
          this.cardDetailsWrong();
        }
      })
      .catch((error) => {
        this.cardDetailsWrong();
        console.error(error);
      });
  };

  emptyCartData() {
    this.cart_data();
    db.deleteBoxCartData(this.state.dbs)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });

    this.handleOpen();
  }

  // testcartdetails() {

  //   db.listCartDataTest(this.state.dbs)
  //   .then((result) => {

  //     console.log("asdasdasdasd"+result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
  cart_data = async () => {
    let qty, bQty, bPrice, id;
    let order_id =
      new Date().getMonth() +
      '' +
      new Date().getFullYear() +
      '' +
      new Date().getHours() +
      '' +
      new Date().getMinutes() +
      '' +
      new Date().getSeconds();

    fetch('https://boxesfree.shop/api/cart_box_data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: order_id,
        cus_id: this.state._cus_id,
        order_total: this.state._total,
        payment_method: this.state._payment_method,
        bCategory: this.state._category,
        result: this.state._list_elimination,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < this.state._list_elimination.length; i++) {
          id = this.state._list_elimination[i].bId;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleCardPayPress = async () => {
    stripe.setOptions({
      publishableKey: 'pk_live_cVXHeRbbcgl00vzc2kgb6vyy',
      // androidPayMode: 'live',
    });

    this.setState({indicatorShow: true});
    // console.log(this.state.number + '    ' + this.state.month);

    const params = {
      // mandatory

      // number: '4283980008203799',
      // expMonth: 8,
      // expYear: 22,
      // cvc: '100',

      // optional
      name: this.state.name,
      // currency: 'usd',
      // addressLine1: '123 Test Street',
      // addressLine2: 'Apt. 5',
      // addressCity: 'Test City',
      // addressState: 'Test State',
      // addressCountry: 'Test Country',
      // addressZip: '55555',

      number: this.state.number,
      expMonth: this.state.month,
      expYear: this.state.year,
      cvc: this.state.cvc,
    };

    try {
      // this.setState({loading: true, token: null});
      const token = await stripe.createTokenWithCard(params);

      // this.setState({indicatorShow:false})
      console.log('token is ' + JSON.stringify(token));
      this.setState({
        loading: false,
        token: token.tokenId,
        indicatorShow: false,
      });
      this.setState({errorMsg: ''});
      this.setModalVisible(false);
    } catch (error) {
      // this.setState({loading: false, indicatorShow: false});
      // console.log(error);
      // this.setState({errorMsg: "You can't use test cards"});
      // this.setState({indicatorShow:false})
    }

    //   this.setState({
    //     loading: false,
    //     token:token.tokenId,
    //   });
    // console.log('token is ' + JSON.stringify(token))
  };

  renderItem = ({item}) => {
    return (
      <Animatable.View animation="flipInX">
        <ListItem
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            marginBottom: 15,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 1,
            shadowRadius: 20,
            marginLeft: 0,
          }}>
          <Left style={{paddingLeft: 10}}>
            <View>
              <Image
                source={{
                  uri: 'https://boxesfree.shop/images/Box/' + item.bImage,
                }}
                style={{width: 90, height: 80}}
              />
            </View>
          </Left>
          <Body style={{marginLeft: -120}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 3,
              }}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold',width:'72%'}}>
                {item.bTitle}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  width: 68,
                  height:31,
                  paddingLeft: 10,
                  paddingRight: 10,
                  padding: 5,
                  borderRadius: 20,
                  alignItems: 'center',
                  right: -10,
                }}
                onPress={() => {
                  this.deleteData(item.cId);
                }}>
                <Text style={{color: 'white',fontSize:13}}>Remove</Text>
              </TouchableOpacity>
            </View>

            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontSize: 10, color: 'gray'}}>
              {item.bDescription}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View
                style={{
                  backgroundColor: 'gray',
                  borderRadius: 10,
                  marginTop: 2,
                  width: 16,
                  height: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  type="font-awesome"
                  color="gray"
                  iconStyle={{fontSize: 11}}
                  name="dollar"
                  color="white"
                  onPress={() => {}}
                />
              </View>
              <Text
                style={(styles.dateText, {marginLeft: 5, fontWeight: 'bold'})}>
                {item.bPrice}{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Avatar
                rounded
                showEditButton
                size={26}
                icon={{name: 'minus', type: 'font-awesome', color: '#2e7d32'}}
                containerStyle={{
                  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                  shadowOffset: {height: 3, width: 8},
                  borderWidth: 1,
                  borderColor: 'white', // IOS
                  shadowOpacity: 3, // IOS
                  shadowRadius: 5,
                  elevation: 2,
                  backgroundColor: '#b2dfdb',
                }}
                onPress={() =>
                  this.substracttem(item.bId, item.bOnePrice, item.bQty)
                }
              />
              <Text
                style={{
                  color: 'gray',
                  paddingLeft: 10,
                  paddingEnd: 10,
                  paddingTop: 5,
                }}>
                {item.bQty}
              </Text>
              <Avatar
                rounded
                showEditButton
                size={26}
                icon={{name: 'plus', type: 'font-awesome', color: '#2e7d32'}}
                containerStyle={{
                  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                  shadowOffset: {height: 3, width: 8},
                  borderWidth: 1,
                  borderColor: 'white', // IOS
                  shadowOpacity: 3, // IOS
                  shadowRadius: 5,
                  elevation: 2,
                  backgroundColor: '#b2dfdb',
                }}
                onPress={() =>
                  this.addItem(item.bId, item.bOnePrice, item.bQty)
                }
              />
            </View>
          </Body>
          {/* <Right style={{bottom: 40}}>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ff4081',
                  width: 70,
                  paddingLeft: 10,
                  paddingRight: 10,
                  padding: 5,
                  borderRadius: 20,
                  alignItems: 'center',
                  right: -10,
                }}
                onPress={() => {
                  this.deleteData(item.cId);
                }}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Right> */}
        </ListItem>
      </Animatable.View>
    );
  };

  handleFieldParamsChange = (valid, params) => {
    var visaCards = creditCardType(params.number);
    this.setState({
      number: params.number,
      month: params.expMonth,
      year: params.expYear,
      cvc: params.cvc,
      valid: valid,
    });
    // console.log(`
    //   Valid: ${valid}
    //   Number: ${params.number || '-'}
    //   Month: ${params.expMonth || '-'}
    //   Year: ${params.expYear || '-'}
    //   CVC: ${params.cvc || '-'}
    //   cardtype: ${visaCards[0].type}
    // `);
  };

  isPaymentCardTextFieldFocused = () => this.paymentCardInput.isFocused();

  focusPaymentCardTextField = () => this.paymentCardInput.focus();

  blurPaymentCardTextField = () => this.paymentCardInput.blur();

  resetPaymentCardTextField = () => this.paymentCardInput.setParams({});
  keyExtractor = (item, index) => index.toString();
  render() {
    const {loading, token, success, response,isVisible2} = this.state;
    const {movies} = this.state;

    if (success == true) {
    }
    const {modalVisible} = this.state;

    const {showAlert} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <SCLAlert
          theme="success"
          show={this.state.show}
          title={this.state._alert_heading}
          subtitle={this.state._subtitle}
          onRequestClose={this.handleClose}
          cancellable={false}>
          <SCLAlertButton theme="success" onPress={this.handleClose}>
            Done
          </SCLAlertButton>
        </SCLAlert>
        <SCLAlert
          theme="danger"
          show={this.state.show2}
          title={'Error'}
          subtitle={'Check Your Card Details'}
          onRequestClose={this.handleClose2}
          cancellable={false}>
          <SCLAlertButton theme="danger" onPress={this.handleClose2}>
            Done
          </SCLAlertButton>
        </SCLAlert>

        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3B7457"
        />
          <CustomHeader
          title=""
          isHome={false}
          bdcolor="#3B7457"
          bgcolor="#3B7457"
          navigation={this.props.navigation}
        />
        <View style={{flex: 1}}>

        <Modal
            isVisible={isVisible2}
            // isVisible={true}
            backdropOpacity={0.5}
            animationIn={'bounceIn'}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: -30,
                  zIndex: 1,
                }}>
                <View
                  style={{
                    backgroundColor: '#ea3f37',
                    height: 40,
                    width: windowWidth - 100,
                    borderTopLeftRadius: 5,
                    alignItems: 'center',
                    padding: 10,
                    flexDirection: 'row',
                  }}>
                  <MaterialIcons
                    name="error"
                    size={25}
                    color={'white'}
                    style={{alignSelf: 'center', paddingRight: 10}}
                  />

                  <Text style={{color: 'white'}}>Remove item</Text>
                </View>
                <View
                  style={{
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderRightWidth: 20,
                    borderTopWidth: 40,
                    borderRightColor: 'transparent',
                    borderTopColor: '#ea3f37',
                  }}
                />
                <View
                  style={{
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: 5,
                    borderRightWidth: 5,
                    borderBottomWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: '#940700',
                    marginLeft: -5,
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  paddingTop: 40,
                  borderRadius: 5,
                }}>
                <Text style={{fontSize: 14}}>
                  Are you sure you want to remove this item from cart ?
                </Text>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Button
                    title="Cancel"
                    titleStyle={{color: 'black', fontSize: 17}}
                    buttonStyle={{
                      alignSelf: 'flex-end',
                      marginTop: 10,
                      paddingVertical: 5,
                      borderColor: 'green',
                      paddingHorizontal: 20,
                      backgroundColor: 'white',
                      borderWidth: 2,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    onPress={() =>
                      this.setState({
                        isVisible2: false,
                      })
                    }
                  />
                  <Button
                    title="Ok"
                    titleStyle={{color: 'black', fontSize: 17}}
                    buttonStyle={{
                      alignSelf: 'flex-end',
                      marginTop: 10,
                      paddingVertical: 5,
                      borderColor: '#ea3f37',
                      paddingHorizontal: 20,
                      backgroundColor: 'white',
                      borderWidth: 2,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      this.setState({
                        isVisible2: false,
                      });
                      {
                       this.deleteCartItemByModal();
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>


          <Modal
            isVisible={this.state.modalVisible}
            // isVisible={true}

            animationIn={'slideInDown'}
            avoidKeyboard={false}
            onBackButtonPress={() => this.setState({modalVisible: false})}
            // onShow={()=>{this.blurPaymentCardTextField()}}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  paddingVertical: 10,
                  alignSelf: 'flex-start',
                }}>
                Enter Your Card
              </Text>
              <Animatable.View
                easing="ease-in"
                animation="flipInY"
                duration={2000}>
                <Image
                  source={require('../images/card.png')}
                  style={{width: 160, height: 120, resizeMode: 'contain'}}
                />
              </Animatable.View>
              {/* <Text style={{alignSelf:'flex-start',padding:5,color:'#787878',fontSize:16}}>Name</Text>
          <TextInput
            style={styles.field}
            onChangeText={(tex)=>this.setState({name:tex})}
            value={this.state.name}
            placeholder={'Name'}
            autoFocus={true}
            ref={(ref) => { this.FirstInput = ref; }}
          /> */}
              <Text
                style={{
                  alignSelf: 'flex-start',
                  padding: 5,
                  color: '#787878',
                  fontSize: 16,
                }}>
                Card
              </Text>
              <PaymentCardTextField
                ref={(ref) => {
                  this.paymentCardInput = ref;
                }}
                style={styles.field}
                disabled={false}
                onParamsChange={this.handleFieldParamsChange}
                editable={false}
                selectTextOnFocus={false}
              />
              {this.state.indicatorShow == true ? (
                <ActivityIndicator
                  style={{padding: 15}}
                  size="large"
                  color="#449aeb"
                />
              ) : (
                <Text style={{color: '#d81a1a', fontSize: 16, padding: 5}}>
                  {this.state.errorMsg}
                </Text>
              )}

              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Text
                  style={{color: '#1f8aff', fontSize: 16, padding: 5}}
                  onPress={() => this.setModalVisible(false)}>
                  Cancel
                </Text>
                <Text
                  style={{
                    color: this.state.valid == true ? '#1f8aff' : '#a6d1fe',
                    fontSize: 16,
                    padding: 5,
                  }}
                  onPress={
                    this.state.valid == true
                      ? () => this.handleCardPayPress()
                      : () => {}
                  }>
                  Done
                </Text>
              </View>
            </View>
          </Modal>

          <View style={{marginLeft: 20, marginTop: 30}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>My Order</Text>
          </View>
          <View style={styles.container}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <FlatList
                contentContainerStyle={{
                  padding: 15,
                  paddingTop: StatusBar.currentHeight || 0,
                }}
                ListEmptyComponent={this.emptyComponent}
                scrollEnabled={false}
                keyExtractor={this.keyExtractor}
                data={this.state._list_elimination}
                renderItem={this.renderItem}
              />
            </ScrollView>

            <View>
              <View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <View style={{padding: 10, flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column', width: 120}}>
                    <Text
                      style={{
                        paddingLeft: 13,
                        fontWeight: 'normal',
                        fontSize: 15,
                      }}>
                      Total
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 13,
                        // paddingRight: 13,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      A${Math.floor(this.state._total * 100) / 100}
                    </Text>
                  </View>

                  {token == null ? (
                    // <TouchableOpacity
                    //   style={styles.buttonstyle}
                    //   loading={loading}
                    //   disabled={this.state.emptyCartButton}
                    //   onPress={() => this.setRbsheet_height()}>
                    //   <Text style={{color: 'white'}}>Check out</Text>
                    // </TouchableOpacity>

                    <Button
                      // loading={loading}
                      title="Check out"
                      activeOpacity={0.5}
                      disabled={this.state.emptyCartButton}
                      titleStyle={{color: 'white'}}
                      buttonStyle={
                        (styles.submitText,
                        {
                          backgroundColor: '#00897b',
                          borderRadius: 15,
                          width: '105%',
                          borderColor: 'white',
                          color: '#ccc',
                          padding: 15,
                          borderWidth: 1,
                          // paddingHorizontal: 82,
                        })
                      }
                      onPress={() => this.setRbsheet_height()}
                    />
                  ) : (
                    <View>
                      {token && (
                        <Button
                          loading={loading}
                          title="Pay"
                          activeOpacity={0.5}
                          disabled={this.state.pressed}
                          titleStyle={{color: 'white'}}
                          buttonStyle={
                            (styles.submitText,
                            {
                              backgroundColor: 'red',
                              borderRadius: 15,
                              width: '115%',
                              borderColor: 'white',
                              color: '#ccc',
                              padding: 15,
                              borderWidth: 1,
                              // paddingHorizontal: 82,
                            })
                          }
                          onPress={this.doPayment}
                        />
                      )}
                      {success && <></>}
                    </View>
                  )}
                </View>
              </View>
              <RBSheet
                ref={(ref) => {
                  this.RBSheet = ref;
                }}
                animationType="slide"
                closeOnDragDown={false}
                closeOnDragUp={false}
                closeOnPressMask={true}
                height={this.state._rbsheet_height}
                openDuration={80}
                customStyles={{
                  container: {
                    alignItems: 'center',

                    backgroundColor: 'white',
                    borderRadius: 20,
                  },
                  wrapper: {
                    backgroundColor: 'transparent',
                  },
                }}>
                <View
                  style={{
                    height: 80,
                    width: '100%',
                    backgroundColor: '#009984',
                    borderRadius: 20,
                    marginTop: 3,
                    padding: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', padding: 6}}>
                      <Text style={{color: 'white', fontSize: 16}}>
                        Payment{' '}
                      </Text>
                      <Text style={{color: 'white', fontSize: 16}}>
                        Method :
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '75%',
                        alignItems: 'flex-end',
                        marginTop: 5,
                      }}>
                      <SwitchSelector
                        options={sugar}
                        initial={0}
                        selectedColor={'white'}
                        borderWidth={2}
                        buttonColor={'#009984'}
                        borderColor={'white'}
                        borderWidth={0.2}
                        hasPadding
                        height={45}
                        onPress={(value) => this.changeSML(value)}
                        // width={50}
                      />
                    </View>
                  </View>
                </View>
              </RBSheet>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    backgroundColor: 'red',

    borderRadius: 25,

    width: 110,
  },
  buttonstyle: {
    backgroundColor: '#009984',
    borderRadius: 15,
    width: '67%',
    padding: 0,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paybuttonstyle: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: '70%',
    padding: 0,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#787878',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
