import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import {IMAGE} from '../constants/image';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Avatar, Divider} from 'react-native-elements';
import Star from 'react-native-star-view';
import {CustomHeader} from '../index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UIStepper from 'react-native-ui-stepper';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Database from '../Database';
import {TagSelect} from 'react-native-tag-select';
import * as Animatable from 'react-native-animatable';
import SwitchSelector from 'react-native-switch-selector';
import {Button} from 'react-native-elements';
import Context from '../../Context/context';
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
const db = new Database();

const sugar = [
  {label: 'White', value: '15'},
  {label: 'Brown', value: '30'},
];

export class CofeeDetails extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isLoading: true,
      _aaa: 0,
      _price: 0,
      _name: this.props.route.params.item_nme,
      _id: this.props.route.params.id,
      _image: this.props.route.params.img,
      dbs: '',
      _qty: 1,
      value: 25,
      labelSizes: 18,
      colors: 'black',
      position: 0,
      addextra_total: 0,
      sml_val: 0,
      _size: 'Small',
      gros_total: 0,
      SelectedButton: '',
      param_price: this.props.route.params.price,
      _coffeeAditionValue: 0,
      addExtra_val: '',
      options: [{label: 'Small', value: '0'}],
      data: [],
      emptyCartButton: true,
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    });
    this.loadDbVarable = this.loadDbVarable.bind(this);
  }

  static contextType = Context;

  checkToken = async () => {
    const token = await AsyncStorage.getItem('cus_id');

    if (token) {
      this.addToCart();
    } else {
      this.props.navigation.navigate('SignIn');
    }
  };
  changeSML(value) {
    var size = '';
    for (var i = 0; i < this.state.options.length; i++) {
      // pPrice = this.state.options[i].label;
      if (this.state.options[i].value == value) {
        size = this.state.options[i].label;
      }
    }
    var smlval = value;
    var total = parseFloat(smlval);

    this.setState({
      sml_val: total,
      _size: size,
    });
  }

  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    db.cartCont(this.state.dbs)
      .then((data) => {
        let cart_count = data;

        this.setState({
          _aaa: cart_count,
        });
        // this.context.addCart(""+(data+1));


        // console.log("cart count is >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+cart_count);
    
        // AsyncStorage.setItem('cart_Value', ""+(data+1));
      
      })
      .catch((err) => {
        console.log(err);
      });

  



  }
  getFoodById() {
    fetch('https://boxesfree.shop/getFoodById/' + this.props.route.params.id, {
      method: 'get',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var result = [];
        var addExtra = [];
        var smallPrice = 0;
        var datas = JSON.stringify(responseJson.details);

        if (responseJson.details.length != 0) {
          smallPrice = responseJson.details[0].price;

          responseJson.details.forEach((subProduct) => {
            result.push({label: subProduct.size, value: subProduct.price});
          });
          responseJson.data.forEach((extra) => {
            addExtra.push({id: extra.id, label: extra.label, val: extra.val});
          });

          this.setState(
            {
              isLoading: false,
              options: result,
              data: addExtra,
              _coffeeAditionValue: 1,
              sml_val: smallPrice,
              emptyCartButton: false,
            },
            function () {},
          );
        } else {
          this.setState(
            {
              isLoading: false,
              sml_val: responseJson.price,
              emptyCartButton: false,
            },
            function () {},
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addToCart = () => {
    let {pId, pOnePrice, pQty, newPrice = 0, innervalue = 0} = this.props;
    let dataa = {
      p_id: this.state._id,
      p_name: this.state._name,
      p_price:
        (this.state.addextra_total + parseFloat(this.state.sml_val)) *
        parseFloat(this.state._qty),
      p_description: this.props.route.params.description,
      p_image: this.state._image,
      addExtra_val: this.state.addExtra_val,
      pQty: this.state._qty,
      sml_val: this.state.sml_val,
      size: this.state._size,
    };
    db.listCartItems(this.state.dbs)
      .then((data) => {
        let result = data;
        if (result == 0) {
          db.cart_item_exist(this.state.dbs, dataa)
            .then((data) => {
              let cart_exist = data;

              if (cart_exist != 0) {
                db.listCartDataTest(this.state.dbs)
                  .then((data) => {
                    let result = data;
                    let pPrice;
                    for (var i = 0; i < result.length; i++) {
                      pPrice = result[i].pSize;
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                // newPrice = (pQty + 1) * pOnePrice;
                // db.updateCart(this.state.dbs, newPrice, this.state._id)
                //   .then((result) => {
                //     this.props.navigation.replace('Cart');
                //   })
                //   .catch((err) => {
                //     console.log(err);
                //   });
              } else {
                db.addtocart(this.state.dbs, dataa)
                  .then((result) => {
                    db.addTopins(this.state.dbs, dataa, result)
                      .then((result) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                    this.props.navigation.replace('Cart');
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                this.setState({
                  isLoading: false,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          for (var i = 0; i < result.length; i++) {
            pId = result[i].pId;

            if (result[i].pId == this.state._id) {
              innervalue = 1;
              pOnePrice = result[i].pOnePrice;
              pQty = result[i].pQty;
            }
          }
          if (innervalue == 1) {
            newPrice = (pQty + 1) * pOnePrice;
            db.cart_item_exist(this.state.dbs, dataa)
              .then((data) => {
                let cart_exist = data;
                if (cart_exist != 0) {
                  newPrice = (pQty + parseFloat(this.state._qty)) * pOnePrice;
                  db.updateCart(
                    this.state.dbs,
                    this.state._qty,
                    newPrice,
                    this.state._id,
                  )
                    .then((result) => {
                      this.props.navigation.replace('Cart');
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  db.addtocart(this.state.dbs, dataa)
                    .then((result) => {
                      db.addTopins(this.state.dbs, dataa, result)
                        .then((result) => {})
                        .catch((err) => {
                          console.log(err);
                        });
                      this.props.navigation.replace('Cart');
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  this.setState({
                    isLoading: false,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
            // db.updateCart(this.state.dbs, newPrice, this.state._id)
            //   .then((result) => {
            //     this.props.navigation.replace('Cart');
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
          } else {
            db.cart_item_exist(this.state.dbs, dataa)
              .then((data) => {
                let cart_exist = data;

                if (cart_exist != 0) {
                  newPrice = (pQty + 1) * pOnePrice;
                  db.updateCart(this.state.dbs, newPrice, this.state._id)
                    .then((result) => {
                      this.props.navigation.replace('Cart');
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  db.addtocart(this.state.dbs, dataa)
                    .then((result) => {
                      db.addTopins(this.state.dbs, dataa, result)
                        .then((result) => {})
                        .catch((err) => {
                          console.log(err);
                        });
                      this.props.navigation.replace('Cart');
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  this.setState({
                    isLoading: false,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });

            // db.addtocart(this.state.dbs, dataa)
            //   .then((result) => {
            //     this.props.navigation.replace('Cart');
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
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
          _aaa: cart_count,
        });
      })
      .catch((err) => {
        console.log(err);
      });


      
      var countcart=this.state._aaa+1
      this.context.addCart(countcart);



      // this.context.addNewTask(responseJson);


      // const jsonValue = JSON.stringify(responseJson);
      AsyncStorage.setItem('cart_ccount', ""+countcart);
      AsyncStorage.setItem('cart_Value', ""+countcart);
      




  };

  insertInvoice = () => {
    const myArray = AsyncStorage.getItem('cus_id');
    const {_id} = this.state;
    const {_qty} = this.state;

    fetch('https://boxesfree.shop/images/food/api/neworder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state._cus_id,
        foods: [
          {
            product_id: _id,
            qty: _qty,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((customerselect) => {
        Alert.alert(JSON.stringify(customerselect));
      });
  };
  async componentDidMount() {
    this.getFoodById();
    const myArray = await AsyncStorage.getItem('cus_id');
    this.setState({
      isLoading: false,
      _cus_id: myArray,
    });
  }
  setValue = (value) => {
    var price =
      (this.state.addextra_total + parseFloat(this.state.sml_val)) * value;
    this.setState({
      isLoading: false,
      _price: price,
      _qty: value,
    });
  };
  // _handleClick(button) {
  //   var smlval = 0;
  //   if (button == "1") {
  //     smlval = 10;
  //   } else if (button == "2") {
  //     smlval = 20;
  //   } else if (button == "3") {
  //     smlval = 30;
  //   }

  //   this.setState({
  //     SelectedButton: button,
  //     sml_val: smlval
  //   })
  // }
  _handleClick3(button) {
    var responsejson = JSON.stringify(this.tag.itemsSelected);
    const valuesArray = JSON.parse(responsejson);

    var total = 0;
    valuesArray.map((item) => {
      total += parseFloat(item.val);
    });
    this.setState({
      addextra_total: total,
      addExtra_val: valuesArray,
    });
  }
  render() {
    let {isLoading} = this.state;

    const {id, img, item_nme, description, price} = this.props.route.params;
    const starStyle = {
      width: 100,
      height: 20,
      marginBottom: 0,
      marginTop: 0,
    };
    if (isLoading) {
      return <BarIndicator color="#fbb146" />;
    } else {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#3B7457'}}>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#3B7457"
          />
          <CustomHeader
            title=""
            isPost
            isHome={false}
          
            bdcolor="#3B7457"
            navigation={this.props.navigation}
          />
      

{/* <CustomHeader title="Our Menu" isPost isHome={false}  bgcolor='red' bdcolor='#3B7457' navigation={this.props.navigation} /> */}
          <View style={styles.header}>
            <View
              style={{
                width: '75%',
                height: '95%',
                borderRadius: 200,
                backgroundColor: '#428362',
                zIndex: -1,
                position: 'absolute',
                marginLeft: 55,
              }}></View>
            <Animatable.View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 30,
                marginTop: 0,
              }}
              animation="bounceInDown">
              <ImageBackground
                source={{uri: 'https://boxesfree.shop/images/food/' + img}}
                style={{
                  height: '105%',
                  width: '100%',
                  resizeMode: 'contain',
                  zIndex: -1,
                }}></ImageBackground>
            </Animatable.View>
            <View
              style={{
                flexDirection: 'row-reverse',
                marginHorizontal: 30,
                top: -25,
              }}>
              {/* <Avatar
                rounded
                size={48}
                containerStyle={{
                  backgroundColor: 'white',
                  shadowColor: 'rgba(0,0,0, .4)', // IOS
                  shadowOffset: {height: 2, width: 5}, // IOS
                  shadowOpacity: 3, // IOS
                  shadowRadius: 5,
                  elevation: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="heart-outline"
                  size={25}
                  style={{color: 'gray', padding: 11}}
                />
              </Avatar> */}
            </View>
          </View>

          <Animatable.View style={styles.footer} animation="fadeInUp">
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}>
              <View style={{paddingLeft: 20, paddingRight: 10}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 28,
                    paddingBottom: 10,
                    fontWeight: 'bold',
                  }}>
                  {item_nme}
                </Text>
                <Star score={4.7} style={starStyle} />
                <Text
                  style={{
                    color: 'gray',
                    textAlign: 'justify',
                    fontSize: 15,
                    marginBottom: 10,
                  }}>
                  {description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}></View>

                {this.state._coffeeAditionValue == 1 ? (
                  <View>
                    <Animatable.View
                      animation="flipInX"
                      style={{marginBottom: 20}}>
                      <SwitchSelector
                        options={this.state.options}
                        initial={0}
                        selectedColor={'white'}
                        buttonColor={'#00897b'}
                        borderColor={'white'}
                        height={45}
                        onPress={(value) => this.changeSML(value)}
                      />
                    </Animatable.View>

                    <View
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                      }}>
                      <Text style={{marginBottom: 10}}>Add Extra</Text>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <TagSelect
                          data={this.state.data}
                          max={3}
                          ref={(tag) => {
                            this.tag = tag;
                          }}
                          onItemPress={() => this._handleClick3(this.tag)}
                        />
                      </ScrollView>
                    </View>

                    <View style={{marginTop: 10, width: 140}}>
                      <Text style={{paddingVertical: 8}}>Sugar Type </Text>
                      <SwitchSelector
                        options={sugar}
                        initial={0}
                        selectedColor={'white'}
                        buttonColor={'brown'}
                        borderColor={'white'}
                        height={35}
                      />
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}
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
                        fontSize: 38,
                        color: 'red',
                        marginTop: -2,
                      }}>
                      A${' '}
                      {(this.state.addextra_total +
                        parseFloat(this.state.sml_val)) *
                        parseFloat(this.state._qty)}
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
                  <View>
                    {/* <TouchableOpacity style={styles.button} onPress={this.insertInvoice}>
            
                      <Text style={styles.buttonText}>Make Order</Text>
                    </TouchableOpacity>
                     */}
                    {/* <TouchableOpacity style={styles.button} onPress={this.addToCart}>
              
                      <Text style={styles.buttonText}>add to cart</Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View style={{padding: 10}}>
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
                  
                  onPress={this.checkToken}
                />

                {/* <TouchableOpacity
                  style={styles.buttonstyle}
                  onPress={this.addToCart}>
                  <Text style={{color: 'white'}}>Make Order</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Animatable.View>
        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  sml_button: {
    height: 45,
    width: 105,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  header: {
    flex: 2,
    backgroundColor: '#3B7457',
  },
  footer: {
    backgroundColor: '#F2F2F2',
    flex: 3,
    zIndex: -1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingRight: 10,
    paddingTop: 10,
  },

  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    marginTop: -5,
    marginLeft: 18,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
  brestposition3: {
    width: 260,
    height: 260,
    marginRight: -30,
    marginTop: -30,
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(102, 51, 33, 0.8)',
    borderRadius: 130,
    zIndex: -2,
    position: 'absolute',
  },
  brestposition4: {
    width: 170,
    height: 170,
    marginTop: 12,
    marginLeft: 42,
    backgroundColor: 'rgba(123, 65, 45, 1)',
    borderRadius: 110,
    zIndex: -1,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#00897b',
    padding: 15,
    borderRadius: 25,
    width: 350,
    marginTop: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
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
    backgroundColor: '#00897b',
    borderRadius: 15,
    // width: '78%',
    width: '100%',
    padding: 0,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    marginLeft: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333',
  },
  itemSelected: {
    backgroundColor: '#333',
  },
  labelSelected: {
    color: '#FFF',
  },
});
