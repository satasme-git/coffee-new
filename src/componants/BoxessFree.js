import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {IMAGE} from '../constants/image';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {CustomHeader} from '../index';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {List, ListItem, Left, Body, Right} from 'native-base';
import stripe from 'tipsi-stripe';

import UIStepper from 'react-native-ui-stepper';

import {TagSelect} from 'react-native-tag-select';
import AsyncStorage from '@react-native-community/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import Database from '../Database';
const db = new Database();
stripe.setOptions({
  publishableKey: 'pk_test_Wim6Z9pN58qzMYDDXvsPMrR0',
});

export  class BoxessFree extends Component {
  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
    success: null,
    modalVisible: false,
    show: false,

    _subtitle: '',
  };

  constructor(props) {
    super(props);
   
    this.state = {
      isLoading: true,
      box_data: [],
      _box_image: 'cardboard22.png',
      _title: '',
      _description: '',
      _price: 0,
      _pOnePrice: 0,
      _qty: 1,
      _box_id: 1,
      dbs: '',
      emptyCartButton: true,
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    });
    this.loadDbVarable = this.loadDbVarable.bind(this);
  }
  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    
  }

  componentDidMount() {
    this.getFoodById();
    this.getFirstFood();
  }
  checkToken = async () => {
    const token = await AsyncStorage.getItem('cus_id');

    if (token) {
      this.addToCart();
    } else {
      this.props.navigation.navigate('SignIn');
    }
  };
  getFirstFood() {
    let {Id, Price, title, description, image} = this.props;
    fetch('https://boxesfree.shop/admin/boxes_resi_first/', {
      method: 'get',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
     

        for (var i = 0; i < responseJson.length; i++) {
          Id = responseJson[i].id;
          title = responseJson[i].box_title;
          description = responseJson[i].box_description;
          image = responseJson[i].box_image;
          Price = responseJson[i].box_price;
        }

        this.setState({
          isLoading: false,
          _box_id: Id,
          _title: title,
          _description: description,
          _box_image: image,
          _price: Price,
          emptyCartButton: false,
        });
 
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getFoodById() {
    fetch('https://boxesfree.shop/public/admin/boxes', {
      method: 'get',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          box_data: responseJson,
          // emptyCartButton: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  changeImage(iamge, title, box_description, price, id) {
    this.setState({
      isLoading: false,
      _box_image: iamge,
      _title: title,
      _description: box_description,
      _pOnePrice: price,
      _price: price,
      _box_id: id,
    });
  }
  setValue = (value) => {
    this.setState({
      isLoading: false,

      _qty: value,
    });
  };

  addToCart = () => {
    let {bId, bPrice, bQty, newPrice = 0, innervalue = 0} = this.props;
    let dataa = {
      b_id: this.state._box_id,
      // p_name: this.state._name,
      b_title: this.state._title,
      b_category: 1,
      bOnePrice: this.state._price,
      // _pOnePrice:this.state._price,
      b_price: parseFloat(this.state._price) * parseFloat(this.state._qty),
      b_description: this.state._description,
      b_image: this.state._box_image,
      bQty: this.state._qty,
    };
    db.listCartBoxItems(this.state.dbs)
      .then((data) => {
        let result = data;
        if (result == 0) {
          db.addboxtocart(this.state.dbs, dataa)
            .then((result) => {
              this.props.navigation.navigate('Boxes Cart');
            })
            .catch((err) => {
              console.log(err);
            });

          this.setState({
            isLoading: false,
          });
        } else {
          for (var i = 0; i < result.length; i++) {
            bId = result[i].bId;

            if (result[i].bId == this.state._box_id) {
              innervalue = 1;
              bPrice = result[i].bPrice;
              bQty = result[i].bQty;
            }
          }
          if (innervalue == 1) {
            newPrice =
              (parseFloat(bQty) + parseFloat(this.state._qty)) *
              this.state._pOnePrice;

            db.updateBoxCart(
              this.state.dbs,
              this.state._qty,
              newPrice,
              this.state._box_id,
            )
              .then((result) => {
                this.props.navigation.navigate('Boxes Cart');
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            db.addboxtocart(this.state.dbs, dataa)
              .then((result) => {
                this.props.navigation.navigate('Boxes Cart');
              })
              .catch((err) => {
                console.log(err);
              });
            this.setState({
              isLoading: false,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    db.cartCont(this.state.dbs)
      .then((data) => {
        let cart_count = data;

        this.setState({
          isLoading: false,
          _aaa: cart_count,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  renderItem = ({item}) => {
    return (
      // <View>
      <View style={styles.container1}>
        {/* <View style={{ }}> */}
        <Card style={[styles.card, {backgroundColor: 'white'}]}>
          <TouchableOpacity
            onPress={() =>
              this.changeImage(
                item.box_image,
                item.box_title,
                item.box_description,
                item.box_price,
                item.id,
              )
            }>
            <View style={{alignItems: 'center'}}>
              <View style={{height: 50, padding: 5}}>
                <ImageBackground
                  source={{
                    uri:
                      'https://boxesfree.shop/public/images/Box/' +
                      item.box_image,
                  }}
                  style={{
                    bottom: 0,
                    resizeMode: 'cover',
                    width: 55,
                    height: 60,
                  }}></ImageBackground>
              </View>

              <Text style={{marginTop: 0, fontSize: 12}}> </Text>
            </View>
          </TouchableOpacity>
          <Text> {item.box_name}</Text>
        </Card>
      </View>
    );
  };
  keyExtractor = (item, index) => index.toString();
  render() {
    let {isLoading} = this.state;
    const {loading, token, success, response} = this.state;

    if (isLoading) {
      return <BarIndicator color="#00897b" />;
    } else {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F2F2F2'}}>
          <StatusBar barStyle="light-content" backgroundColor="#3B7457" />
          <ParallaxScroll
            renderHeader={({animatedValue}) => (
              <View animatedValue={animatedValue}>
                {/* <Text>asdasdad</Text> */}
                <CustomHeader
                  title="Boxes"
                  // isPost={false}
                  isPost={2}
                  isHome={true}
                  bdcolor=""
                  bgcolor="white"
                  navigation={this.props.navigation}
                />
              </View>
            )}
            headerHeight={50}
            isHeaderFixed={false}
            parallaxHeight={350}
            headerBackgroundColor="rgba(0,0,0,0.01)"
            fadeOutParallaxBackground={true}
            fadeOutParallaxForeground={true}
            renderParallaxBackground={({animatedValue}) => (
              <View animatedValue={animatedValue}>
                <View style={{backgroundColor: '#3B7457', padding: 60}}>
                  <ImageBackground
                    source={{
                      uri:
                        'https://boxesfree.shop/public/images/Box/' +
                        this.state._box_image,
                    }}
                    style={{
                      bottom: 0,
                      resizeMode: 'cover',
                      width: '100%',
                      height: '100%',
                    }}></ImageBackground>
                </View>
              </View>
            )}
            renderParallaxForeground={({animatedValue}) => (
              <View
                style={{
                  marginTop: 280,
                  paddingLeft: 15,
                  elevation: 5,

                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 3},
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                }}
                animatedValue={animatedValue}>
                <Text
                  style={{fontWeight: 'normal', fontSize: 18, color: 'white'}}>
                  Residential Boxes
                </Text>
              </View>
            )}
            parallaxBackgroundScrollSpeed={5}
            parallaxForegroundScrollSpeed={2.5}>
            <View
              style={{
                height: 702,
                bottom: 35,
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: '#F2F2F2',
              }}>
              <View style={{padding: 15}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {this.state._title}
                </Text>
                <Text>{this.state._description}</Text>
              </View>
              <View style={{paddingLeft: 20, paddingRight: 10}}>
                <View>
                  <FlatList
                    horizontal
                    // contentContainerStyle={{
                    //   paddingTop: StatusBar.currentHeight || 0,
                    // }}
                    ListEmptyComponent={this.emptyComponent}
                    scrollEnabled={true}
                    keyExtractor={this.keyExtractor}
                    data={this.state.box_data}
                    renderItem={this.renderItem}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    marginTop: 15,
                  }}>
                  <View>
                    <Text>Total</Text>

                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                        color: 'black',
                        marginTop: -2,
                      }}>
                      A${' '}
                      {Math.floor(this.state._price * this.state._qty * 100) /
                        100}
                      {/* {this.state._price *
                        parseFloat(this.state._qty)} */}
                    </Text>
                  </View>
                  <View style={{marginTop: 22}}>
                    <UIStepper
                      borderRadius={25}
                      height={40}
                      width={130}
                      // value={1}
                      initialValue={1}
                      minimumValue={1}
                      borderColor={'#00897b'}
                      tintColor={'#00897b'}
                      displayValue={true}
                      onValueChange={(value) => {
                        this.setValue(value);
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View></View>
                </View>
              </View>
              
            </View>
            
          </ParallaxScroll>
          <View
            style={{
              width:'99%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,

            }}>
            <View
              style={{
                padding: 15,
                // flexDirection: 'row',
              }}>
             

              {token == null ? (
              
              <Button
              // loading={loading}
              title="Make Order"
              activeOpacity={0.5}
              disabled={this.state.emptyCartButton}
              titleStyle={{color: 'white'}}
              buttonStyle={
                (styles.submitText,
                {
                  backgroundColor: '#00897b',
                  borderRadius: 15,
                  width: '100%',
                  borderColor: 'white',
                  color: '#ccc',
                  padding: 15,
                  borderWidth: 1,
                  // paddingHorizontal: 130,
                })
              }
              // this.checkToken();
              
              onPress={this.checkToken}
            />

                // <TouchableOpacity
                //   style={styles.buttonstyle}
                //   loading={loading}
                //   onPress={this.addToCart}
             
                // >
                //   <Text style={{color: 'white'}}>Make Order</Text>
                // </TouchableOpacity>
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
                          width: '100%',
                          borderColor: 'white',
                          color: '#ccc',
                          padding: 15,
                          borderWidth: 1,
                          paddingHorizontal: 82,
                        })
                      }
                      onPress={this.doPayment}
                    />
                  )}
                  {success && (
                    <View>
                      <Text>asdasd</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
        
           
          </View>
          </SafeAreaView>
        
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -5,
    // paddingTop: 5,
    // paddingLeft: 10,
    // paddingRight: 10,
    // bottom: 70,
    // zIndex: 5,
  },
  buttongeart: {
    backgroundColor: 'white',
    borderColor: '#00897b',
    borderWidth: 1,
    borderRadius: 15,
    width: '17%',
    marginRight: 10,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonstyle: {
    backgroundColor: '#00897b',
    borderRadius: 15,
    width: '100%',
    padding: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 105,
    // width: (Dimensions.get("window").width / 2) - 20,
    // width: "45%",
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 9,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',

    margin: 5,
  },
});
