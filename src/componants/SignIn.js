import React, {Component} from 'react';
import {
  StatusBar,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import {IMAGE} from '../constants/image';
import {CustomHeader} from '../index';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import {Validation} from '../components/Validation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Context from '../../Context/context';

import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInputEmail: '',
      TextInputPassword: '',

      evalidate: true,
      pvalidate: true,
      emsg: '',
      pmsg: '',

      isVisible: false,
      isVisible2: false,
      _redirectcofee: false,
    };
  }
  static contextType = Context;
  InputUsers = () => {
    const {TextInputEmail} = this.state;
    const {TextInputPassword} = this.state;

    fetch('https://boxesfree.shop/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: TextInputEmail,
        user_password: TextInputPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // id = "";
        // user_email = "";
        // user_password = "";
        // this.setState({
        //     isLoading: false,
        // }, function () {
        //     // In this block you can do something with new state.
        // });
        console.log(responseJson);

        if (responseJson.validation == null) {
          null;
        } else {
          if (
            responseJson.validation.email == null &&
            responseJson.validation.password == null
          ) {
            this.setState({
              emsg: 'Email is Required',
              pmsg: 'Password is Required',
              evalidate: responseJson.status,
              pvalidate: responseJson.status,
            });
          } else if (responseJson.validation.email == null) {
            this.setState({
              emsg: 'Email is Required',
              evalidate: responseJson.status,
              pvalidate: true,
            });
          } else if (responseJson.validation.password == null) {
            this.setState({
              pmsg: 'Password is Required',
              pvalidate: responseJson.status,
              evalidate: true,
            });
          } else if (
            responseJson.validation.password !== null ||
            (responseJson.validation.email !== null &&
              responseJson.status == true)
          ) {
            let emailValidateregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         

            if (emailValidateregex.test(responseJson.validation.email) == false) {
              this.setState({
                emsg: 'Invalid email address',
              evalidate: responseJson.status,
              pvalidate: true,
              })
            }else{
             
              this.setState({
                pmsg: responseJson.msg,
                emsg: responseJson.msg,
                pvalidate: true,
                evalidate: true,
                isVisible2: true,
              });
            }

        
            // Alert.alert(
            //   'Error', responseJson.msg, [
            //   {text: 'OK'},
            // ]);
          }
        }

        var logimsg = responseJson.msg;
        if (responseJson.id != undefined) {
          AsyncStorage.setItem('cus_id', '' + responseJson.id).then(
            (responseJson) => {
              AsyncStorage.getItem('menu').then((value) => {
                if (value == 1) {
                  // Alert.alert('Success', 'You are successfully logged', [
                  //   {text: 'OK'},
                  // ]);
                  this.setState({
                    isVisible: true,
                    _redirectcofee: true,
                  });
                  this.context.setState({
                    name: responseJson.id,
                  });

                  // this.props.navigation.navigate('CofeeDetails');
                } else {
                  //  this.props.navigation.navigate('wherehouse');

                  //  showMessage({
                  //   message: 'Login success',
                  //   description:  logimsg,
                  //   backgroundColor: 'green',
                  // });
                  // Alert.alert("Login success");
                  // Alert.alert('Alert Title', 'My Alert Msg', [
                  //   {
                  //     text: 'Cancel',
                  //     onPress: () => console.log('Cancel Pressed'),
                  //     style: 'cancel',
                  //   },
                  //   {text: 'OK', onPress: () => console.log('OK Pressed')},
                  // ]);
                  // Alert.alert(
                  //   'Success', 'You are successfully logged', [
                  //   {text: 'OK', onPress: () => console.log('OK Pressed')},
                  // ]);
                  // this.props.navigation.navigate('wherehouse');

                  this.setState({
                    isVisible: true,
                  });
                }
              });

              // if(value==1){

              // }else{
              //   this.props.navigation.navigate('MainHome');
              // }
            },
          );
          this.context.addNewTask(responseJson);


          const jsonValue = JSON.stringify(responseJson);
          AsyncStorage.setItem('userInfo', jsonValue);

          

          // AsyncStorage.setItem('user_info', responseJson);
          AsyncStorage.setItem('cus_name', responseJson.name);
        } else {
          // showMessage({
          //   message: 'Login Fail',
          //   description: responseJson.msg,
          //   backgroundColor: 'red',
          // });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const {isVisible, isVisible2} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlashMessage id={2} duration={1000} />

        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3B7457"
        />

        <View
          style={{
            color: 'white',
            backgroundColor: '#3B7457',
            alignItems: 'flex-end',
            paddingTop: 5,
            paddingEnd: 20,
            paddingBottom: 5,
          }}>
          <Button
            title="Skip"
            type="outline"
            titleStyle={{color: 'white', fontWeight: 'normal', fontSize: 14}}
            buttonStyle={{
              borderRadius: 25,
              width: 80,
              borderColor: 'white',
              color: '#ccc',
              padding: 7,
              borderWidth: 0.5,
              marginBottom: 0,
            }}
            onPress={() => this.props.navigation.navigate('drawer')}
          />
        </View>
        <LinearGradient colors={['#F2F2F2', '#F2F2F2']} style={styles.gradient}>
          {/* <CustomHeader title="" isHome={false} bdcolor='#00897b' navigation={this.props.navigation} /> */}
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingVertical: 0,
              }}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    marginTop: 15,
                    color: 'black',
                  }}>
                  Welcome{' '}
                </Text>
                <Text style={{fontSize: 14, color: 'gray', marginBottom: 25}}>
                  Use email to Login
                </Text>
              </View>

              {/* manoj */}
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

                      <Text style={{color: 'white'}}>Error</Text>
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
                    <Text style={{fontSize: 16}}>
                      Invalid Username or Password
                    </Text>

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
                      onPress={() =>
                        this.setState({
                          isVisible2: false,
                        })
                      }
                    />
                  </View>
                </View>
              </Modal>

              <Modal
                isVisible={isVisible}
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
                        backgroundColor: 'green',
                        height: 40,
                        width: windowWidth - 100,
                        borderTopLeftRadius: 5,
                        alignItems: 'center',
                        padding: 10,
                        flexDirection: 'row',
                      }}>
                      <MaterialIcons
                        name="done"
                        size={25}
                        color={'white'}
                        style={{alignSelf: 'center', paddingRight: 10}}
                      />

                      <Text style={{color: 'white'}}>Success</Text>
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
                        borderTopColor: 'green',
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
                        borderBottomColor: '#104c2e',
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
                    <Text style={{fontSize: 16}}>
                      You are successfully logged
                    </Text>

                    <Button
                      title="Ok"
                      titleStyle={{color: 'black', fontSize: 17}}
                      buttonStyle={{
                        alignSelf: 'flex-end',
                        marginTop: 10,
                        paddingVertical: 5,
                        borderColor: '#3B7457',
                        paddingHorizontal: 20,
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        this.setState({
                          isVisible: false,
                        });
                        {
                          this.state._redirectcofee != true
                            ? this.props.navigation.navigate('wherehouse')
                            : this.props.navigation.navigate('CofeeDetails');
                        }
                      }}
                    />
                  </View>
                </View>
              </Modal>

              <Animatable.View
                animation="flipInY"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Image
                  style={{width: 140, height: 120, marginLeft: 0}}
                  source={IMAGE.ICON_MALOGO}
                  resizeMode="contain"
                />
              </Animatable.View>
              <Animatable.View animation="fadeInUp">
                <Text
                  style={{
                    color: 'black',
                    paddingVertical: 5,
                    marginLeft: 2,
                    marginTop: 30,
                  }}>
                  User Name :
                </Text>

                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderColor: 'black',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                  }}>
                  <Icon
                    name="email"
                    size={20}
                    style={{color: 'gray', paddingRight: 5}}
                  />
                  <TextInput
                    blurOnSubmit
                    onChangeText={(TextInputValue) =>
                      this.setState({TextInputEmail: TextInputValue})
                    }
                    style={{width: '85%'}}
                    placeholder="Enter User Name"
                    onEndEditing={this.clearFocus}
                    autoFocus={false}
                    onFocus={() =>
                      this.setState({
                        evalidate: true,
                      })
                    }
                  />
                  {this.state.evalidate == false ? (
                    <Validation text={this.state.emsg} />
                  ) : null}
                </View>
                <Text
                  style={{
                    color: 'black',
                    paddingVertical: 5,
                    marginLeft: 2,
                    marginTop: 10,
                  }}>
                  Password :
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderColor: 'black',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    paddingLeft: 10,
                  }}>
                  <Icon
                    name="briefcase"
                    size={20}
                    style={{color: 'gray', paddingRight: 5}}
                  />
                  <TextInput
                    blurOnSubmit
                    secureTextEntry={true}
                    onChangeText={(TextInputValue) =>
                      this.setState({TextInputPassword: TextInputValue})
                    }
                    style={{width: '85%'}}
                    placeholder="Enter Password"
                    onEndEditing={this.clearFocus}
                    autoFocus={false}
                    onFocus={() =>
                      this.setState({
                        pvalidate: true,
                      })
                    }
                  />
                  {this.state.pvalidate == false ? (
                    <Validation text={'Password is Required'} />
                  ) : null}
                </View>
                <Text
                  style={{
                    color: '#3B7457',
                    marginTop: 15,
                    marginBottom: 15,
                    textAlign: 'center',
                  }}
                  onPress={() => this.props.navigation.navigate('Forgotpw')}>
                  {' '}
                  Forgot Password?
                </Text>
               

                <Button
                  title="Sign In"
                  type="outline"
                  titleStyle={{color: 'white'}}
                  buttonStyle={{
                    borderRadius: 25,
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: '#3B7457',
                    padding: 12,
                    borderWidth: 1,
                    marginBottom: 10,
                    marginTop: 5,
                  }}
                  onPress={this.InputUsers}
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{paddingVertical: 5, color: 'black'}}>
                    Don't have account?
                  
                  </Text>
                </View>
                <Button
                  title="Sign Up"
                  type="outline"
                  titleStyle={{color: '#3B7457'}}
                  buttonStyle={{
                    borderRadius: 25,
                    borderColor: '#3B7457',

                    padding: 12,
                    borderWidth: 1,
                    marginBottom: 20,
                    marginTop: 5,
                  }}
                  onPress={() => this.props.navigation.navigate('SignUp')}
                />
              </Animatable.View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    // flex: 1,
    // width: 280,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 14,
    color: 'white',
    backgroundColor: 'transparent',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  ////////////////// manoj
  content: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 0,
    borderTopWidth: 3,
    borderColor: 'red',
  },
  arrow: {
    borderTopColor: 'red',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});
