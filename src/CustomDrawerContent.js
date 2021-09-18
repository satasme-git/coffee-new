import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking
} from 'react-native';
// import {Icon} from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from '../Context/context';
import Database from './Database';
const db = new Database();

export class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      dbs: '',
      abc: null,
      login_title: '',
      _id: '',
      _name: '',
      _email: '',
      _cus_id: '',
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

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };


  static contextType = Context;


  async componentDidMount() {
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.loadVal();
      this.getoprofileDetails();
    });
    this.getoprofileDetails();
    this.loadVal();
  }

  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }
  async getoprofileDetails() {
    const myArray = await AsyncStorage.getItem('cus_id');
    const name = await AsyncStorage.getItem('cus_name');


    fetch('https://boxesfree.shop/api/profile/' + myArray, {
      method: 'post',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 2,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          _id: responseJson.id,
          _name: name,
          _email: responseJson.email,
          // _cus_id: myArray,
          abc: responseJson.image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async loadVal() {
    let loginval = null;
    AsyncStorage.getItem('cus_id').then((value) => {
      loginval = value;
      if (loginval == null) {
        this.setState({
          login_title: 'Login',
        });
      } else {
        this.setState({
          login_title: 'Log Out',
        });
      }
    });
  }
  doLogout() {


    AsyncStorage.removeItem('cus_name').then((res) => {
      this.props.navigation.navigate('SignIn');
      AsyncStorage.removeItem('cus_id');
      AsyncStorage.removeItem('userInfo');
      AsyncStorage.removeItem('menu');

      AsyncStorage.setItem('cart_Value', "0");
      // AsyncStorage.removeItem('cart_Value');
      this.context.addCart("0");

      this.context.addNewTask("");
    });
  
 
      db.deleteCartData(this.state.dbs)
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
  
   
    
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <ImageBackground
            source={require('./images/undraw_pilates_gpdb.png')}
            style={{
              width: 300,
              paddingLeft: 30,
              paddingBottom: 0,
              paddingTop: 13,
              backgroundColor: '#0C5D39',
            }}>
            {this.context.name != null ?
              <Avatar
                rounded
                showEditButton
                size={75}
                source={
                  this.context.name.image != null
                    ? {
                      uri:
                        'https://boxesfree.shop/images/Customer/' +
                        this.context.name.image,
                    }
                    : require('./images/profiled.png')
                }
                // source={require('./images/profiled.png')}
                // onEditPress={() => console.log('edit button pressed')}
                // onLongPress={() => console.log('component long pressed')}
                // onPress={() => this.props.navigation.navigate('ProfileImageView')}
                editButton={{
                  name: 'edit',
                }}>

              </Avatar>
              : <Avatar
                rounded
                showEditButton
                size={75}
                source={require('./images/profiled.png')
                }

                editButton={{
                  name: 'edit',
                }}>

              </Avatar>}

            {/* <Text>car val is : {this.context.catVal}</Text>
<Text>imagel is : {this.context.name.image}</Text> */}
            <Text style={{ color: 'white', fontSize: 15, marginVertical: 1 }}>
              {/* {this.state._name} */}
              {this.context.name != null ?
                this.context.name.name : ""}
            </Text>


            <Text
              style={{
                color: 'white',
                fontSize: 15,
                marginTop: -5,
                marginBottom: 10,
              }}>
              {this.context.name != null ? this.context.name.email : ""}
              {/* {this.state._email} */}
            </Text>
          </ImageBackground>

          <View
            style={{
              backgroundColor: 'white',
              paddingTop: 5,
              paddingBottom: 10,
              opacity: 0.9,
            }}>
            {/* <TouchableOpacity style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('SignIn')}>
                            <View style={{ flexDirection: "row", padding: 5, backgroundColor: '#3B7457' }}>
                                <Icon

                                    name='user'
                                    type='font-awesome'
                                    color='white'
                                    iconStyle={{ fontSize: 25, fontWeight: 'normal', paddingLeft: 15, paddingRight: 15, paddingTop: 3 }}
                                />
              
                                <Text style={{ paddingLeft: 5, paddingTop: 8, paddingBottom: 11, color: 'white' }}>Login Or Register </Text>
                            </View>

                        </TouchableOpacity> */}
            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('wherehouse')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="home-outline"
                  iconStyle={{
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 4,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  Home{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('OrderHistory')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="receipt-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  Order History{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              // this.props.navigation.navigate('TabScreentest', {
              //   categpry_name: item.name,
              // })
              onPress={() =>
                this.props.navigation.navigate('TabScreentest', {
                  categpry_name: 'Coffee',
                })
              }>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="fast-food-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  Menu{' '}
                </Text>
              </View>
            </TouchableOpacity>

            <Collapse
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}>
              <CollapseHeader>
                <View style={{ width: '100%' }}>
                  {/* <TouchableOpacity style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]} activeOpacity={0.5} > */}
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      backgroundColor: 'white',
                      paddingLeft: 20,
                    }}>
                    <Icon
                      name="cube-outline"
                      iconStyle={{
                        fontSize: 25,
                        fontWeight: 'normal',
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 3,
                      }}
                      size={23}
                      color="black"
                    />
                    <View style={styles.SeparatorLine} />
                    <Text
                      style={{
                        paddingLeft: 20,
                        paddingTop: 5,
                        paddingBottom: 11,
                        color: 'black',
                      }}>
                      Boxes{' '}
                    </Text>
                  </View>
                </View>
              </CollapseHeader>

              <CollapseBody>
                <Collapse>
                  <CollapseHeader>
                    <TouchableOpacity
                      style={[
                        { borderBottomWidth: 0.5, borderBottomColor: 'white' },
                      ]}
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.navigation.navigate('BoxessFree')
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 5,
                          paddingLeft: 55,
                          backgroundColor: '#F2F2F2',
                          paddingTop: 15
                        }}>
                        <Icon
                          name="radio-button-on-outline"
                          iconStyle={{
                            fontWeight: 'normal',
                            paddingLeft: 5,
                            paddingRight: 15,
                          }}
                          size={15}
                          color="black"
                        />
                        <Text
                          style={{
                            paddingLeft: 10,
                            paddingTop: 0,
                            paddingBottom: 10,
                            color: 'black',
                          }}>
                          Residential Boxes{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        { borderBottomWidth: 0.5, borderBottomColor: 'white' },
                      ]}
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.navigation.navigate('CommercialBoxes')
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 5,
                          paddingLeft: 55,
                          backgroundColor: '#F2F2F2',
                          paddingTop: 15
                        }}>

                        <Icon
                          name="radio-button-on-outline"
                          iconStyle={{
                            fontWeight: 'normal',
                            paddingLeft: 5,
                            paddingRight: 15,
                          }}
                          size={15}
                          color="black"
                        />
                        <Text
                          style={{
                            paddingLeft: 10,
                            paddingTop: 0,
                            paddingBottom: 11,
                            color: 'black',
                          }}>
                          Commercial Boxes{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[{}]}
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.navigation.navigate('HomeAppliance')
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 5,
                          paddingLeft: 55,
                          backgroundColor: '#F2F2F2',
                          paddingTop: 15
                        }}>

                        <Icon
                          name="radio-button-on-outline"
                          iconStyle={{
                            fontWeight: 'normal',
                            paddingLeft: 5,
                            paddingRight: 15,
                          }}
                          size={15}
                          color="black"
                        />
                        <Text
                          style={{
                            paddingLeft: 10,
                            paddingTop: 0,
                            paddingBottom: 11,
                            color: 'black',
                          }}>
                          Home Appliance Boxes{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </CollapseHeader>
                </Collapse>
                {/* </Animatable.View> */}
              </CollapseBody>
            </Collapse>

            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('Events')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="images-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  Events{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('Profile')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="wallet-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  My Points{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('WhereHouse')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="card-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  Loyalty Card{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 0.4,
                borderBottomColor: 'black',
              }}></View>
            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => { this.dialCall(+61393510574) }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="call-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  Contact{' '}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('AboutUsScreeen')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="grid-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  About Us{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('TermsAndConditions')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '457',
                  marginLeft: 15,
                }}>
                <Icon
                  name="newspaper-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  Terms and Conditions{' '}
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                borderBottomWidth: 0.4,
                borderBottomColor: 'black',
              }}></View>

            <TouchableOpacity
              style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]}
              activeOpacity={0.5}
              onPress={() => this.doLogout()}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: 'white',
                  marginLeft: 15,
                }}>
                <Icon
                  name="power-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                  size={23}
                  color="black"
                />

                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 11,
                    color: 'black',
                  }}>
                  {this.state.login_title}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  profile: {
    width: 80,
    height: 80,
    borderWidth: 8,
    borderRadius: 40,
    borderColor: '#fff',
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    // backgroundColor: '#f78a2c',
    //borderWidth: .5,
    // borderColor: '#fff',
    height: 50,

    //borderRadius: 5,
    // margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    // color:'#fff'
  },
});
