import React, {Component} from 'react';
import {
  StatusBar,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGE} from '../constants/image';
import {CustomHeader} from '../index';
import QRCode from 'react-native-qrcode-generator';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Toast from 'react-native-simple-toast';

import {Button} from 'react-native-elements';
import {Validation} from '../components/Validation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Context from '../../Context/context';

import Modal from 'react-native-modal';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhone: '',
      TextInputPassword: '',
      loading: false,
      showAlert: false,

      nview: false,
      eview: false,
      emairegulerex: false,
      mview: false,
      pview: false,

      isVisible: false,
      isVisible2: false,
    };
  }
  static contextType = Context;
  state = {
    text: 'http://facebook.github.io/react-native/',
    show: true,
  };
  handleClose = () => {
    this.setState({show: false});
  };
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  handleOpen() {
    this.setState({show: true});
  }

  InputUsers = () => {
    const {TextInputName} = this.state;
    const {TextInputEmail} = this.state;
    const {TextInputPhone} = this.state;
    const {TextInputPassword} = this.state;

    if (
      TextInputName == '' &&
      TextInputEmail == '' &&
      TextInputPhone == '' &&
      TextInputPassword == ''
    ) {
      this.setState({
        nview: true,
        eview: true,
        mview: true,
        pview: true,
      });
    } else if (
      TextInputName == '' &&
      TextInputEmail == '' &&
      TextInputPhone == ''
    ) {
      this.setState({
        nview: true,
        eview: true,
        pview: false,
        mview: true,
      });
    } else if (
      TextInputName == '' &&
      TextInputEmail == '' &&
      TextInputPassword == ''
    ) {
      this.setState({
        nview: true,
        eview: true,
        pview: true,
        mview: false,
      });
    } else if (
      TextInputName == '' &&
      TextInputPassword == '' &&
      TextInputPhone == ''
    ) {
      this.setState({
        nview: true,
        eview: false,
        pview: true,
        mview: true,
      });
    } else if (
      TextInputPassword == '' &&
      TextInputEmail == '' &&
      TextInputPhone == ''
    ) {
      this.setState({
        nview: false,
        eview: true,
        pview: true,
        mview: true,
      });
    } else if (TextInputEmail == '' && TextInputPhone == '') {
      this.setState({
        nview: false,
        eview: true,
        pview: false,
        mview: true,
      });
    } else if (TextInputEmail == '' && TextInputName == '') {
      this.setState({
        nview: true,
        eview: true,
        pview: false,
        mview: false,
      });
    } else if (TextInputPassword == '' && TextInputPhone == '') {
      this.setState({
        nview: false,
        eview: false,
        mview: true,
        pview: true,
      });
    } else if (TextInputName == '' && TextInputPassword == '') {
      this.setState({
        nview: true,
        eview: false,
        mview: false,
        pview: true,
      });
    } else if (TextInputName == '' && TextInputPhone == '') {
      this.setState({
        nview: true,
        eview: false,
        mview: true,
        pview: false,
      });
    } else if (TextInputEmail == '' && TextInputPassword == '') {
      this.setState({
        nview: false,
        eview: true,
        pview: true,
        mview: false,
      });
    } else if (TextInputName == '') {
      this.setState({
        nview: true,
        eview: false,
        mview: false,
        pview: false,
      });
    } else if (TextInputEmail == '') {
      this.setState({
        nview: false,
        eview: true,
        mview: false,
        pview: false,
      });
    } else if (TextInputPhone == '') {
      this.setState({
        nview: false,
        eview: false,
        mview: true,
        pview: false,
      });
    } else if (TextInputPassword == '') {
      this.setState({
        nview: false,
        eview: false,
        mview: false,
        pview: true,
      });
    } else {
      let emailValidateregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
      if (emailValidateregex.test(TextInputEmail) == false) {
        this.setState({
          nview: false,
          emairegulerex: true,
          eview: false,
          mview: false,
          pview: false,
        })
      }else{
       
      fetch('https://boxesfree.shop/register', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cus_name: TextInputName,
          cus_email: TextInputEmail,
          cus_mobile_number: TextInputPhone,
          cus_password: TextInputPassword,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState(
            {
              isLoading: false,
              loading: true,
            },
            function () {},
          );
          console.log(responseJson);
          let id = responseJson.userid;

          if (responseJson.userid != undefined) {
            
            AsyncStorage.setItem('cus_name', TextInputName).then(
              (responseJson) => {
                this.setState({
                  loading: false,
                  isVisible2: true,
                });
               

              },
            );
            // AsyncStorage.setItem('memberId', '' + responseJson.userid);
            AsyncStorage.setItem('cus_id', '' + responseJson.userid);
            AsyncStorage.setItem('cus_name', responseJson.name);

            this.context.addNewTask(responseJson);

            const jsonValue = JSON.stringify(responseJson);
            AsyncStorage.setItem('userInfo', jsonValue);

          } else if (responseJson == 'Already') {
            this.setState({
              loading: false,
              isVisible: true,
            });
          }
        })
        .catch((error) => {
          // console.error(error);
        });
      }
    }
  };

  render() {
    const {loading, isVisible, isVisible2} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F2F2F2'}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3B7457"
        />
        
         <CustomHeader
          title="Sign Up"
          isHome={false}
          bdcolor="#3B7457"
          bgcolor="#3B7457"
          navigation={this.props.navigation}
        />
        <FlashMessage duration={1000} />
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
                  color: '#00897b',
                }}>
                Sign Up{' '}
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: -3}}>
                Please Enter Below Informations to
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 25}}>
                Create An Account
              </Text>
            </View>

            <Modal
              isVisible={isVisible}
              // isVisible={true}
              backdropOpacity={0.5}
              animationIn={'bounceIn'}>
              <View>
                <View
                  style={{flexDirection: 'row', marginBottom: -30, zIndex: 1}}>
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
                  <Text style={{fontSize: 16}}>Gmail Already Registerd</Text>

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
                        isVisible: false,
                      })
                    }
                  />
                </View>
              </View>
            </Modal>

            <Modal 
                  isVisible={isVisible2}
                  // isVisible={true}
                  backdropOpacity={0.5}
                  animationIn={'bounceIn'}
                  >
                    <View>
                      <View style={{flexDirection:'row',marginBottom:-30,zIndex:1}}>
                        <View style={{backgroundColor: 'green',height:40,width:windowWidth-100,borderTopLeftRadius:5,alignItems:'center',padding:10,flexDirection:'row'}} >
                          <MaterialIcons
                              name="done"
                              size={25}
                              color={'white'}
                              style={{alignSelf:'center',paddingRight:10}}
                          />

                          <Text style={{color:'white'}}>Success</Text>
                        </View>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderRightWidth: 20,
                          borderTopWidth: 40,
                          borderRightColor: "transparent",
                          borderTopColor: "green",
                        }}/>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderLeftWidth: 5,
                          borderRightWidth: 5,
                          borderBottomWidth: 10,
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          borderBottomColor: "#104c2e",
                          marginLeft:-5
                        }}/>
                      </View>
                      
                     <View style={{backgroundColor:'white',padding:15,paddingTop:40,borderRadius:5}}>
                      <Text style={{fontSize:16}}>You are successfully logged</Text>
            
                      <Button 
                      title="Ok"
                      
                      titleStyle={{color:'black',fontSize:17}} 
                      buttonStyle={{alignSelf:'flex-end',marginTop:10,paddingVertical:5,borderColor:'#3B7457',paddingHorizontal:20,backgroundColor:'white',borderWidth:2,borderRadius:10}}
                      onPress={()=>
                      {this.setState({
                        isVisible2:false
                      });this.props.navigation.navigate('wherehouse');}
                      }
                      />
                      
                    </View> 
                    </View>
                    
                  </Modal>


            <Animatable.View animation="fadeInUp">
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 5,
                }}>
                Name :
              </Text>
              <View
                style={{
                  borderColor: 'gray',
                  borderRadius: 8,
                  borderWidth: 0.5,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: windowWidth - 30,
                }}>
                <TextInput
                  blurOnSubmit
                  onChangeText={(TextInputValue) =>
                    this.setState({TextInputName: TextInputValue})
                  }
                  style={{
                    // borderColor: 'gray',
                    // borderWidth: 0.5,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    paddingLeft: 10,
                    width: windowWidth - 75,
                  }}
                  placeholder="Enter User Name"
                  onEndEditing={this.clearFocus}
                  autoFocus={false}
                  onFocus={() =>
                    this.setState({
                      nview: false,
                    })
                  }
                />
                {this.state.nview == true ? (
                  <Validation text={'Name is Required'} />
                ) : null}
              </View>
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Email :
              </Text>
              <View
                style={{
                  borderColor: 'gray',
                  borderRadius: 8,
                  borderWidth: 0.5,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: windowWidth - 30,
                }}>
                <TextInput
                  blurOnSubmit
                  onChangeText={(TextInputValue) =>
                    this.setState({TextInputEmail: TextInputValue})
                  }
                  style={{
                    // borderColor: 'gray',
                    // borderWidth: 0.5,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    paddingLeft: 10,
                    width: windowWidth - 75,
                  }}
                  placeholder="Enter Email Address"
                  onEndEditing={this.clearFocus}
                  autoFocus={false}
                  onFocus={() =>
                    this.setState({
                      eview: false,
                    })
                  }
                />
                {this.state.eview == true ? (
                  <Validation text={'Email is Required'} />
                ) : null}
                {this.state.emairegulerex == true ? (
                  <Validation text={'Email is invalid'} />
                ) : null}
              </View>
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Mobile Number :
              </Text>
              <View
                style={{
                  borderColor: 'gray',
                  borderRadius: 8,
                  borderWidth: 0.5,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: windowWidth - 30,
                }}>
                <TextInput
                  blurOnSubmit
                  onChangeText={(TextInputValue) =>
                    this.setState({TextInputPhone: TextInputValue})
                  }
                  style={{
                    // borderColor: 'gray',
                    // borderWidth: 0.5,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    paddingLeft: 10,
                    width: windowWidth - 75,
                  }}
                  placeholder="Enter Mobile Number"
                  onEndEditing={this.clearFocus}
                  autoFocus={false}
                  keyboardType="numeric"
                  maxLength={10}
                  onFocus={() =>
                    this.setState({
                      mview: false,
                    })
                  }
                />
                {this.state.mview == true ? (
                  <Validation text={'Mobile Number is Required'} />
                ) : null}
              </View>
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Password :
              </Text>
              <View
                style={{
                  borderColor: 'gray',
                  borderRadius: 8,
                  borderWidth: 0.5,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: windowWidth - 30,
                }}>
                <TextInput
                  blurOnSubmit
                  secureTextEntry={true}
                  onChangeText={(TextInputValue) =>
                    this.setState({TextInputPassword: TextInputValue})
                  }
                  style={{
                    // borderColor: 'gray',
                    // borderWidth: 0.5,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    paddingLeft: 10,
                    width: windowWidth - 75,
                  }}
                  placeholder="Enter Password"
                  onEndEditing={this.clearFocus}
                  autoFocus={false}
                  onFocus={() =>
                    this.setState({
                      pview: false,
                    })
                  }
                />
                {this.state.pview == true ? (
                  <Validation text={'Password is Required'} />
                ) : null}
              </View>

              <Button
                title="Sign Up"
                loading={loading}
                activeOpacity={0.5}
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
                    paddingHorizontal: 82,
                    marginTop: 40,
                  })
                }
                onPress={this.InputUsers}
              />
            </Animatable.View>
          </View>
        </ScrollView>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});
