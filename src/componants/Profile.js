import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import {CustomHeader} from '../index';
import {Avatar, Button} from 'react-native-elements';
import QRCode from 'react-native-qrcode-generator';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
// import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import * as ImagePicker from "react-native-image-picker"
import Context from '../../Context/context';
import {Validation} from '../components/Validation';

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
// const options = {
//   title: 'Select Avatar',
//   takePhotoButtonTitle: 'Take a photo',
//   chooseFromLibraryButtonTitle: 'choose from galary',
//   quality: 1
// }
var options = {
  title: 'Select Image',
  customButtons: [
    {
      name: 'customOptionKey',
      title: 'Choose Photo from Custom Option',
    },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: '',
      _id: '',
      _name: '',
      _email: '',
      _mobile_no: '',
      _points: 0,
      _cus_id: '',
      _orderCount: '0',
      _orderboxCount: 0,
      imageSource: null,
      dataa: null,
      abc: '',
      isVisible: false,
      isVisible2: false,

      isVisible3: false,
      isVisible4: false,

      TextInputName: '',
      TextInputPhone: '',

      nview: false,
      pview: false,
    };
  }
  static contextType = Context;
  state = {
    text: 'https://facebook.github.io/react-native/',
  };
  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('cus_id');
    this.setState({
      isLoading: false,
      _cus_id: myArray,
    });
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.getoPoints();
      this.getorderCount();
      this.getorderBoxCount();
      this.getoprofileDetails();
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }
  selectPhoto() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        const imdata = response.data;

        this.setState({
          isLoading: false,
          imageSource: source,
          abc: '',
          dataa: imdata,
        });

        this.uploadPhoto();
      }
    });
  }
  async uploadPhoto() {
    var aaaa = this.state.dataa;
    const myArray = await AsyncStorage.getItem('cus_id');

    RNFetchBlob.fetch(
      'POST',
      'https://boxesfree.shop/api/fileUpload',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      [
        {name: 'image', filename: 'image.png', type: 'image/png', data: aaaa},
        {name: 'member_id', data: myArray},
      ],
    )
      .then((resp) => {
        this.setState({
          isVisible: true,
        });
        console.log(resp.text());

        // Alert.alert('Success', 'Upload successfully', [{text: 'OK'}]);
      })
      .catch((err) => {
        this.setState({
          isVisible2: true,
        });
        // Alert.alert('Error', 'Something went wrong', [{text: 'OK'}]);
        console.log(err);
      });

    this.setState({
      isLoading: false,

      dataa: '',
    });
  }
  async getoPoints() {
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://boxesfree.shop/api/points/' + myArray, {
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
          _points: responseJson.points,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getoprofileDetails() {
    const myArray = await AsyncStorage.getItem('cus_id');
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
          _name: responseJson.name,
          _email: responseJson.email,
          _mobile_no: responseJson.mobile_no,
          text: responseJson.mobile_no,
          // _points: responseJson.points,
          _cus_id: myArray,
          abc: responseJson.image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getorderCount() {
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://boxesfree.shop/api/countorder/' + myArray, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          _orderCount: responseJson.orders_Count,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getorderBoxCount() {
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://boxesfree.shop/api/countorderbox/' + myArray, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          _orderboxCount: responseJson.orderbox_Count,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async refresh() {
    this.getorderCount();
    this.getorderBoxCount();
    // const myArray = await AsyncStorage.getItem('cus_id');
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://boxesfree.shop/api/profile/' + myArray, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          _id: responseJson.id,
          _name: responseJson.name,
          _email: responseJson.email,
          _mobile_no: responseJson.mobile_no,
          text: responseJson.mobile_no,
          _points: responseJson.points,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // manoj
  async editName() {
    const {TextInputName, TextInputEmail} = this.state;

    const id = await AsyncStorage.getItem('cus_id');

  
    if (TextInputName == '') {
      this.setState({
        nview: true,
      });
    } else {
      this.setState({isVisible3: false});
      // this.props.navigation.navigate('ForgotPwScreen',{email:TextInputEmail})
      // }
      fetch('https://boxesfree.shop/api/nameUpdate/' + id, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cus_id: id,
          cus_name: TextInputName,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState(
            {
              isLoading: false,
            },
            function () {},
          );
          console.log(responseJson);
          let id = responseJson.userid;
          this.context.addNewTask(responseJson);

          const jsonValue = JSON.stringify(responseJson);
          AsyncStorage.setItem('userInfo', jsonValue);
     

          this.setState({
            isLoading: false,
            // _id: responseJson.id,
            _name: responseJson.name,
            _email: responseJson.email,
            _mobile_no: responseJson.mobile_no,
            text: responseJson.mobile_no,
            // _points: responseJson.points,
            // _cus_id: id,
            abc: responseJson.image,
          });

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
  }

  async editPhone() {
    const {TextInputName, TextInputPhone} = this.state;
    const id = await AsyncStorage.getItem('cus_id');
    if (TextInputPhone == '') {
      this.setState({
        pview: true,
      });
    } else {
      this.setState({isVisible4: false});
      // this.props.navigation.navigate('ForgotPwScreen',{email:TextInputEmail})
      // }
      fetch('https://boxesfree.shop/api/phoneUpdate/' + id, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cus_id: id,
          cus_phone: TextInputPhone,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState(
            {
              isLoading: false,
            },
            function () {},
          );
          console.log(responseJson);
          // let id = responseJson.userid;
          this.setState({
            isLoading: false,
            _id: responseJson.id,
            _name: responseJson.name,
            _email: responseJson.email,
            _mobile_no: responseJson.mobile_no,
            text: responseJson.mobile_no,
            // _points: responseJson.points,
            _cus_id: id,
            abc: responseJson.image,
          });

          // Alert.alert('Register success' );

          if (responseJson.id != undefined) {
            // AsyncStorage.setItem('memberNames', TextInputName).then(
            //   (responseJson) => {
            //     this.props.navigation.navigate('wherehouse');
            //   },
            // );
            // AsyncStorage.setItem('memberId', '' + responseJson.userid);
          } else {
            // showMessage({
            //   message: 'Registration fail Fail',
            //   description: 'Username or password incorrect',
            //   backgroundColor: 'red',
            // });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    let {isLoading} = this.state;
    const {isVisible, isVisible2, isVisible3, isVisible4} = this.state;
    if (isLoading) {
      return <BarIndicator color="#3B7457" />;
    } else {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <CustomHeader
            title=""
            isHome={true}
            bdcolor="#3B7457"
            bgcolor="#3B7457"
            navigation={this.props.navigation}
          />
          {this.state._cus_id != null ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              {/* manoj */}

              <Modal
                isVisible={isVisible3}
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
                        name="mode-edit"
                        size={25}
                        color={'white'}
                        style={{alignSelf: 'center', paddingRight: 10}}
                      />

                      <Text style={{color: 'white'}}>Edit Name</Text>
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
                    {/* <Text style={{fontSize:16}}>Successfully Updated</Text> */}
                    <Text
                      style={{
                        color: 'black',
                        paddingVertical: 5,
                        marginLeft: 2,
                        marginTop: 8,
                      }}>
                      Name :
                    </Text>
                    <View
                      style={{
                        borderColor: 'gray',
                        borderRadius: 8,
                        borderWidth: 0.5,
                        backgroundColor: '#F2F2F2',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: windowWidth - 65,
                      }}>
                      <TextInput
                        blurOnSubmit
                        onChangeText={(TextInputValue) =>
                          this.setState({TextInputName: TextInputValue})
                        }
                        style={{
                          borderRadius: 8,
                          backgroundColor: '#F2F2F2',
                          paddingLeft: 10,
                          width: windowWidth - 110,
                        }}
                        placeholder="Enter Name"
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
                    <Button
                      title="Save"
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
                      onPress={() => this.editName()}
                    />
                  </View>
                </View>
              </Modal>

              <Modal
                isVisible={isVisible4}
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
                        name="mode-edit"
                        size={25}
                        color={'white'}
                        style={{alignSelf: 'center', paddingRight: 10}}
                      />

                      <Text style={{color: 'white'}}>Edit Phone Number</Text>
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
                    {/* <Text style={{fontSize:16}}>Successfully Updated</Text> */}
                    <Text
                      style={{
                        color: 'black',
                        paddingVertical: 5,
                        marginLeft: 2,
                        marginTop: 8,
                      }}>
                      Phone Number :
                    </Text>
                    <View
                      style={{
                        borderColor: 'gray',
                        borderRadius: 8,
                        borderWidth: 0.5,
                        backgroundColor: '#F2F2F2',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: windowWidth - 65,
                      }}>
                      <TextInput
                        blurOnSubmit
                        onChangeText={(TextInputValue) =>
                          this.setState({TextInputPhone: TextInputValue})
                        }
                        style={{
                          borderRadius: 8,
                          backgroundColor: '#F2F2F2',
                          paddingLeft: 10,
                          width: windowWidth - 110,
                        }}
                        placeholder="Enter Phone Number"
                        onEndEditing={this.clearFocus}
                        autoFocus={false}
                        onFocus={() =>
                          this.setState({
                            pview: false,
                          })
                        }
                      />
                      {this.state.pview == true ? (
                        <Validation text={'Phone Number is Required'} />
                      ) : null}
                    </View>
                    <Button
                      title="Save"
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
                      onPress={() => this.editPhone()}
                    />
                  </View>
                </View>
              </Modal>

              {/* end manoj */}

              <View style={styles.header}>
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
                        Gmail Already Registerd
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
                      <Text style={{fontSize: 16}}>Upload successfully</Text>

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
                        onPress={() =>
                          this.setState({
                            isVisible: false,
                          })
                        }
                      />
                    </View>
                  </View>
                </Modal>

                <View style={{height: 200}}>
                  <View
                    style={{
                      backgroundColor: '#3B7457',
                      height: 240,
                      zIndex: -1,
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bottom: 240,
                    }}>
                    <Avatar
                      rounded
                      showEditButton
                      size={120}
                      // source={
                      //   this.state.imageSource !== null
                      //     ? this.state.imageSource
                      //     : require('../images/profiled.png')
                      // }

                      source={
                        this.state.abc != ''
                          ? {
                              uri:
                                'https://boxesfree.shop/images/Customer/' +
                                this.state.abc,
                            }
                          : this.state.imageSource !== null
                          ? this.state.imageSource
                          : require('../images/profiled.png')
                      }
                      containerStyle={{
                        margin: 10,
                        shadowColor: 'rgba(0,0,0, .4)', // IOS
                        shadowOffset: {height: 3, width: 8},
                        borderWidth: 6,
                        borderColor: 'white', // IOS
                        shadowOpacity: 3, // IOS
                        shadowRadius: 5,
                        elevation: 8,
                      }}
                      onEditPress={() => console.log('edit button pressed')}
                      onLongPress={() => console.log('component long pressed')}
                      // onPress={() => this.props.navigation.navigate('ProfileImageView')}
                      editButton={{
                        name: 'edit',
                      }}
                      onPress={() => this.selectPhoto()}
                      // showAccessory
                      // onAccessoryPress={() => this.selectPhoto()}
                      // accessory={{ size: 33, style: { backgroundColor: 'gray', height: 45, paddingTop: 3, width: 45, borderRadius: 25, alignItems: 'center', alignContent: 'center' } }}
                    />
                    {/* manoj */}

                    <View
                      style={{
                        paddingLeft: 20,
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        {this.state._name}
                      </Text>

                      <MaterialIcons
                        name="mode-edit"
                        size={20}
                        color={'white'}
                        style={{alignSelf: 'center', paddingLeft: 10}}
                        onPress={() =>
                          this.setState({
                            isVisible3: true,
                          })
                        }
                      />
                    </View>

                    <View
                      style={{
                        padding: 5,
                        paddingLeft: 20,
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}>
                      <Text style={{fontSize: 17, color: 'white'}}>
                        {this.state._mobile_no}
                      </Text>
                      <MaterialIcons
                        name="mode-edit"
                        size={20}
                        color={'white'}
                        style={{alignSelf: 'center', paddingLeft: 10}}
                        onPress={() =>
                          this.setState({
                            isVisible4: true,
                          })
                        }
                      />
                    </View>

                    <Text style={{paddingLeft:20,fontSize: 17,color: 'white',alignSelf:'flex-start'}}>{this.state._email}</Text>
                    {/* <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      {this.state._name}
                    </Text>
                    <Text style={{color: 'white'}}>{this.state._email}</Text> */}


                  </View>
                </View>
              </View>

              <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <View style={{height: 500}}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 40,
                      }}>
                      <Text
                        style={{
                          fontSize: 35,
                          fontWeight: 'bold',
                          color: '#3B7457',
                        }}>
                        {this.state._orderCount != null
                          ? this.state._orderCount
                          : 0}
                      </Text>
                      <Text style={{fontSize: 16, marginTop: -10}}>Orders</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 40,
                      }}>
                      <Text
                        style={{
                          fontSize: 45,
                          fontWeight: 'bold',
                          color: '#3B7457',
                        }}>
                        {this.state._points != null ? this.state._points : 0}
                      </Text>
                      <Text style={{fontSize: 16, marginTop: -10}}>Points</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 40,
                      }}>
                      <Text
                        style={{
                          fontSize: 35,
                          fontWeight: 'bold',
                          color: '#3B7457',
                        }}>
                        {this.state._orderboxCount != null
                          ? this.state._orderboxCount
                          : 0}
                      </Text>
                      <Text style={{fontSize: 16, marginTop: -10}}>
                        Box Orders
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingTop: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <QRCode
                      value={'' + this.state._mobile_no}
                      size={200}
                      bgColor="black"
                      fgColor="white"
                    />

                    {/* <TouchableOpacity
                  style={{marginTop: 20}}
                  onPress={() => this.selectPhoto()}>
                  <Text>refresh</Text>
                </TouchableOpacity> */}
                  </View>
                </View>
              </Animatable.View>
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
              }}>
              <Text>Please login</Text>
              <Button
                title="Login"
                activeOpacity={0.5}
                titleStyle={{color: 'white'}}
                buttonStyle={
                  (styles.submitText,
                  {
                    backgroundColor: 'red',
                    borderRadius: 5,
                    // width: '100%',
                    borderColor: 'white',
                    color: '#ccc',
                    padding: 5,
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    marginTop: 10,
                  })
                }
                onPress={() => this.props.navigation.navigate('SignIn')}
              />
            </View>
          )}
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9100',

    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,

    elevation: 2,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  header: {
    justifyContent: 'center',
    // alignItems: 'center',

    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    height: 200,
  },
  title: {
    color: '#85375a',
    fontWeight: 'normal',
    fontSize: 18,
  },
  text: {
    color: 'gray',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  // footer: {
  //   marginTop: 20,
  //   flex: 1,
  //   backgroundColor: 'white',

  //   paddingHorizontal: 10,
  //   // paddingVertical: 30,
  //   height: 500,
  // },
  container: {},
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 50,
    width: 50,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  circleGradient: {
    margin: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  linearGradient: {
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
  triangleCorner: {
    // position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    // zIndex: -1,
    // borderRightWidth: 600,
    borderTopWidth: 170,
    borderRightColor: 'transparent',
    borderTopColor: '#3B7457',
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    paddingVertical: 20,
    padding: 20,
    //  paddingHorizontal: 20
  },
  // header: {
  //   flex: 1,
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  // },
});
