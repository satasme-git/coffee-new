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
import {Button} from 'react-native-elements';

import {Validation} from '../components/Validation'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class ForgotPw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputEmail: '',
      
      TextInputCode: '',

      showAlert: false,
      sent:false,
      anime:false,

      eview:false,
      cview:false,

      isVisible:false,
    };
  }

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



  inputEmail = () => {
    const {TextInputEmail} = this.state;

    if (TextInputEmail==''){
      this.setState({
        eview:true
      })
    }
    else {

      console.log("*********************** call email function")
      // setTimeout(
      //   function() {
      //       this.setState({sent:true});
      //   }
      //   .bind(this),
      //   700
      // );
      // this.setState({anime:true})
    // }
    fetch('https://boxesfree.shop/api/resetPassword', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cus_email: TextInputEmail,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("*********************** success email function")
        this.setState(
          {
            isLoading: false,
          },
          function () {},
        );
          console.log(responseJson)
        let id = responseJson.userid;
        if (responseJson=='"Error"'){
          this.setState({
            isVisible:true
          })
        }
        else{
        setTimeout(
            function() {
                this.setState({sent:true});
            }
            .bind(this),
            700
          );
          this.setState({anime:true})
        }
        // Alert.alert('Register success' );

        // if (responseJson.userid != undefined) {
        //   AsyncStorage.setItem('memberNames', TextInputName).then(
        //     (responseJson) => {
        //       this.props.navigation.navigate('wherehouse');
        //     },
        //   );
        //   AsyncStorage.setItem('memberId', '' + responseJson.userid);
        // } else {
        //   showMessage({
        //     message: 'Registration fail Fail',
        //     description: 'Username or password incorrect',
        //     backgroundColor: 'red',
        //   });
        // }

      })
      .catch((error) => {
        console.error(error);
      });

    }


  };

  inputCode = () => {    
    const {TextInputCode,TextInputEmail} = this.state;

    if (TextInputCode==''){
      this.setState({
        cview:true
      })
    }
    else {
      this.props.navigation.navigate('ForgotPwScreen',{email:TextInputEmail})
    }
    // fetch('https://satasmemiy.tk/api/resetPassword/', {
    //   method: 'put',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     cus_email: TextInputEmail,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState(
    //       {
    //         isLoading: false,
    //       },
    //       function () {},
    //     );
    //       console.log(responseJson)
    //     let id = responseJson.userid;

          
    //     // Alert.alert('Register success' );

    //     // if (responseJson.userid != undefined) {
    //     //   AsyncStorage.setItem('memberNames', TextInputName).then(
    //     //     (responseJson) => {
    //     //       this.props.navigation.navigate('wherehouse');
    //     //     },
    //     //   );
    //     //   AsyncStorage.setItem('memberId', '' + responseJson.userid);
    //     // } else {
    //     //   showMessage({
    //     //     message: 'Registration fail Fail',
    //     //     description: 'Username or password incorrect',
    //     //     backgroundColor: 'red',
    //     //   });
    //     // }

    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // }

  };


  render() {
    
    const {isVisible} = this.state;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3B7457"
        />
        <CustomHeader
          title="Forgot Password?"
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
        // animation={this.state.sent==false?"fadeIn":"fadeOut"}  
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 0,
            }}>
              <Modal 
                  isVisible={isVisible}
                  // isVisible={true}
                  backdropOpacity={0.5}
                  animationIn={'bounceIn'}
                  >
                    <View>
                      <View style={{flexDirection:'row',marginBottom:-30,zIndex:1}}>
                        <View style={{backgroundColor: '#ea3f37',height:40,width:windowWidth-100,borderTopLeftRadius:5,alignItems:'center',padding:10,flexDirection:'row'}} >
                          <MaterialIcons
                              name="error"
                              size={25}
                              color={'white'}
                              style={{alignSelf:'center',paddingRight:10}}
                          />

                          <Text style={{color:'white'}}>Error</Text>
                        </View>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderRightWidth: 20,
                          borderTopWidth: 40,
                          borderRightColor: "transparent",
                          borderTopColor: "#ea3f37",
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
                          borderBottomColor: "#940700",
                          marginLeft:-5
                        }}/>
                      </View>
                      
                     <View style={{backgroundColor:'white',padding:15,paddingTop:40,borderRadius:5}}>
                      <Text style={{fontSize:16}}>Email isn't exist. Enter Correct Email</Text>
            
                      <Button 
                      title="Ok"
                      
                      titleStyle={{color:'black',fontSize:17}} 
                      buttonStyle={{alignSelf:'flex-end',marginTop:10,paddingVertical:5,borderColor:'#ea3f37',paddingHorizontal:20,backgroundColor:'white',borderWidth:2,borderRadius:10}}
                      onPress={()=>
                      this.setState({
                        isVisible:false
                      })
                      }
                      />
                      
                    </View> 
                    </View>
                    
                  </Modal>

                {this.state.sent==false?
            <Animatable.View animation={this.state.anime==false?"fadeIn":"fadeOut"} style={{flex: 1, justifyContent: 'center'}} >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  marginTop: 15,
                  color: '#00897b',
                }}>
                {/* {this.state.sent==true?'sent':'not'} */}
                Forgot Your Password?{' '}
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: -3}}>
                Please Enter Your Email Address to Send
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 25}}>
                Verification code to Email
              </Text>
            </Animatable.View>
            :
            <Animatable.View animation={this.state.anime==true?"fadeIn":"fadeOut"} style={{flex: 1, justifyContent: 'center'}} >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  marginTop: 15,
                  color: '#00897b',
                }}>
                {/* {this.state.sent==true?'sent':'not'} */}
                Verify Email{' '}
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: -3}}>
                Please Enter the Verification Code to
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 25}}>
                Verify your Email
              </Text>
            </Animatable.View>
            }

            {this.state.sent==false?
            <Animatable.View animation={this.state.anime==false?"fadeInUp":"fadeOutDown"}>
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Email :
              </Text>
              <View style={{borderColor: 'gray',borderRadius: 8,borderWidth: 0.5,backgroundColor: '#F2F2F2',flexDirection:'row',alignItems:'center',width:windowWidth-30}}>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputEmail: TextInputValue})
                }
                style={{
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  width:windowWidth-75
                }}
                placeholder="Enter Email Address"
                onEndEditing={this.clearFocus}
                autoFocus={false}
                onFocus={()=>this.setState({
                  eview:false
                })}
              />
              {
                this.state.eview==true?
                <Validation text={'Email is Required'}/>
                :
                null
              }
              </View>

              <Button
                title="Send"
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
                    marginTop:40,
                  })
                }

                onPress={()=>this.inputEmail()
                    
                    // setTimeout(function(){this.setState({sent:true})}, 1000)
                    // {
                    //   setTimeout(
                    //     function() {
                    //         this.setState({sent:true});
                    //     }
                    //     .bind(this),
                    //     700
                    //   );
                    //   this.setState({anime:true})

                    // }
                
                }

                // onPress={this.InputUsers}
              />

              
            </Animatable.View>

            :

            <Animatable.View animation={this.state.anime==true?"fadeInUp":"fadeOutDown"}>
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Verification Code :
              </Text>
              <View style={{borderColor: 'gray',borderRadius: 8,borderWidth: 0.5,backgroundColor: '#F2F2F2',flexDirection:'row',alignItems:'center',width:windowWidth-30}}>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputCode: TextInputValue})
                }
                style={{
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  width:windowWidth-75
                }}
                placeholder="Enter Verification Code"
                onEndEditing={this.clearFocus}
                autoFocus={false}
                onFocus={()=>this.setState({
                  cview:false
                })}
              />
              {
                this.state.cview==true?
                <Validation text={'Verification Code is Required'}/>
                :
                null
              }
            </View>

              <Button
                title="Verify"
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
                    marginTop:40,
                  })
                }

                onPress={()=>
                    
                    // {setTimeout(
                    //     function() {
                    //         this.setState({sent:false});
                    //     }
                    //     .bind(this),
                    //     700
                    //   )
                    //   ;
                    //   this.setState({anime:false})}

                    // this.props.navigation.navigate('ForgotPwScreen')
                    this.inputCode()
                    // this.setState({sent:false})
                }

                // onPress={this.InputUsers}
              />

              
            </Animatable.View>
        }  
            
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
