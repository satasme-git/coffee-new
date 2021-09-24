import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';
import QRCode from 'react-native-qrcode-generator';
import { Avatar, Button } from 'react-native-elements';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import Context from '../../Context/context';
import { Validation } from '../components/Validation';
import AsyncStorage from '@react-native-community/async-storage';


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
export class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: new Animated.Value(0),
      isLoading: true,
      isLoading2: false,
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

  selectPhoto() {

    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        const imdata = response.data;
        console.log(source)
        this.setState({
          isLoading: false,
          // isLoading2: true,
          imageSource: source,
          abc: '',
          dataa: imdata,
        });

        this.uploadPhoto();

      }
    });
  }
  async uploadPhoto() {
    this.setState(
      {
        isLoading2: true,
      })
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
        { name: 'image', filename: 'image.png', type: 'image/png', data: aaaa },
        { name: 'member_id', data: myArray },
      ],
    )

      .then((response) => response.json())
      .then((responseJson) => {
        // this.context.setState({loading:true})
        this.context.addNewTask(responseJson);
        this.setState(
          {
            isLoading: false,
            isLoading2: false,
            isVisible: true,
          }
        );
        

        

        const jsonValue = JSON.stringify(responseJson);
        AsyncStorage.setItem('userInfo', jsonValue);

      })
      .catch((error) => {

        console.error(error);
      });



    this.setState({
      isLoading: false,

      dataa: '',
    });
  }


  static contextType = Context;
  state = {
    scroll: new Animated.Value(0),
  };

  async componentDidMount() {



    const myArray = await AsyncStorage.getItem('cus_id');
    this.setState({
      isLoading: false,
      _cus_id: myArray,
    });
    const { navigation } = this.props;


    this._unsubscribe = navigation.addListener('focus', () => {
      this.getoPoints();

      this.getorderCount();
      this.getorderBoxCount();
      // this.getoprofileDetails();
    });
    const { scroll } = this.state;
    scroll.addListener(({ value }) => (this._value = value));
  }
  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }



  renderContent = (label) => (
    <View style={styles.content}>
      <Text>{label}</Text>
    </View>
  );

  async editName() {
    const { TextInputName, TextInputEmail } = this.state;

    const id = await AsyncStorage.getItem('cus_id');


    if (TextInputName == '') {
      this.setState({
        nview: true,
      });
    } else {
      this.setState({ isVisible3: false });

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
            function () { },
          );
          // console.log(responseJson);

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

            abc: responseJson.image,
          });


        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  async editPhone() {
    
    const { TextInputName, TextInputPhone } = this.state;
    const id = await AsyncStorage.getItem('cus_id');
    if (TextInputPhone == '') {
      this.setState({
        pview: true,
      });
    } else {
      this.setState({ isVisible4: false });
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
            function () { },
          );
          // console.log(responseJson);

          this.setState({
            isLoading: false,
            _id: responseJson.id,
            _name: responseJson.name,
            _email: responseJson.email,
            _mobile_no: responseJson.mobile_no,
            text: responseJson.mobile_no,

            _cus_id: id,
            abc: responseJson.image,
          });


          this.context.addNewTask(responseJson);
          // this.setState(
          //   {
          //     isLoading2: false,
          //   })
          const jsonValue = JSON.stringify(responseJson);
          AsyncStorage.setItem('userInfo', jsonValue);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  renderForeground = () => {
    const { scroll } = this.state;
    const titleOpacity = scroll.interpolate({

      outputRange: [1, 1, 0],

      inputRange: [0, 60, 120],

      extrapolate: 'clamp',
    });
    const { isVisible, isVisible2, isVisible3, isVisible4 ,isLoading2,imageSource} = this.state;
    return (
      <View style={styles.foreground}>

        <Animated.View style={{ opacity: titleOpacity }}>
          <View >
          <TouchableOpacity style={styles.avatarButton}  onPress={() => this.selectPhoto()}>
            <View>
            {this.context.name.image != ''?
              isLoading2==true?
            <Image source={imageSource} style={styles.avatar}  />
            :
            <Image source={{uri:'https://boxesfree.shop/images/Customer/' + this.context.name.image}} style={styles.avatar}  />
            
            :
            imageSource !== null ?
            <Image source={imageSource} style={styles.avatar}  />
            :
            
            <Image source={require('../images/profiled.png')} style={styles.avatar} />
            
            }
            <Image source={imageSource} style={[styles.avatar,{position:'absolute',zIndex:-1}]}  />
            </View>
            </TouchableOpacity>
            {/* <Avatar
              rounded
              showEditButton

              size={100}
              borderRadius={100}
              source={
                this.context.name.image != ''
                  ? {
                    uri:
                      'https://boxesfree.shop/images/Customer/' + this.context.name.image,
                  }
                  : this.state.imageSource !== null
                    ? this.state.imageSource
                    : require('../images/profiled.png')
              }

              containerStyle={{
                marginTop: 50,
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 3, width: 8 },
                borderWidth: 2,
                borderColor: 'white', // IOS
                shadowOpacity: 3, // IOS
                shadowRadius: 5,
                elevation: 1,


              }}
              onEditPress={() => console.log('edit button pressed')}
              onLongPress={() => console.log('component long pressed')}
              // onPress={() => this.props.navigation.navigate('ProfileImageView')}
              editButton={{
                name: 'edit',
              }}
              onPress={() => this.selectPhoto()}

            /> */}
          </View>



          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              marginTop: -15
            }}>
            <Text style={styles.message}>{this.context.name.name}</Text>


            <MaterialIcons
              name="mode-edit"
              size={15}
              color={'#F2F2F2'}
              style={{ alignSelf: 'center', paddingLeft: 10, marginTop: 20 }}
              onPress={() =>
                this.setState({
                  isVisible3: true,
                })
              }
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              // alignSelf: 'flex-start',
              justifyContent: 'space-between',
              marginTop: 0
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              {this.context.name.mobile_no}
            </Text>

            <MaterialIcons
              name="mode-edit"
              size={15}
              color={'#F2F2F2'}
              style={{ alignSelf: 'center', paddingLeft: 10 }}
              onPress={() =>
                this.setState({
                  isVisible4: true,
                })
              }
            />
          </View>

        </Animated.View>

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
                  style={{ alignSelf: 'center', paddingRight: 10 }}
                />

                <Text style={{ color: 'white' }}>Edit Name</Text>
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
                    this.setState({ TextInputName: TextInputValue })
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button
                  title="Cancel"
                  titleStyle={{ color: 'black', fontSize: 17 }}
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
                      isVisible3: false,
                    })
                  }
                />
                <Button
                  title="Save"
                  titleStyle={{ color: 'black', fontSize: 17 }}
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
                      isVisible: false,
                    });
                    {
                      this.editName();
                    }
                  }}
                />
              </View>


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
                  style={{ alignSelf: 'center', paddingRight: 10 }}
                />

                <Text style={{ color: 'white' }}>Edit Phone Number</Text>
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
                    this.setState({ TextInputPhone: TextInputValue })
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

              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button
                  title="Cancel"
                  titleStyle={{ color: 'black', fontSize: 17 }}
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
                      isVisible4: false,
                    })
                  }
                />
                <Button
                  title="Save"
                  titleStyle={{ color: 'black', fontSize: 17 }}
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
                      isVisible: false,
                    });
                    {
                      this.editPhone();
                    }
                  }}
                />
              </View>

            </View>
          </View>
        </Modal>



      </View>
    );
  };
  renderHeader = () => {
    const { scroll } = this.state;

    const opacity = scroll.interpolate({
      inputRange: [0, 160, 200],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.headerWrapper}>

        <Icon
          name="arrow-back-outline"
          iconStyle={{
            fontWeight: 'normal',
          }}
          size={25}
          color="white"
          onPress={() => this.props.navigation.navigate('wherehouse')}
        />

        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3B7457"
        />
        <Animated.View style={{ opacity }}>
          <Text style={[styles.headerTitle]}>{this.context.name.name}</Text>
        </Animated.View>
      </View>
    );
  };
  render() {

    const { scroll, isVisible, isVisible2, isVisible3, isVisible4 } = this.state;
    return (
      <>
    {this.context.name != null ? (
        <StickyParallaxHeader

          foreground={this.renderForeground()}

          header={this.renderHeader()}
          parallaxHeight={190}
          headerHeight={50}
          headerSize={() => { }}
          onEndReached={() => { }}
          scrollEvent={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: false },
          )}
          tabs={[
            {
              title: null,
              content: this.renderContent(
                <View style={{ padding: 10 }}>



                  <View
                    style={{ flexDirection: 'row', justifyContent: 'center', width: windowWidth - 25 }}>
                    <View
                      style={[styles.cardcontainer, {
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        width: '30%',
                        marginHorizontal: 8,

                      }]}>
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
                      <Text style={{ fontSize: 16, marginTop: -10 }}>Orders</Text>
                    </View>
                    <View
                      style={[styles.cardcontainer, {
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        width: '30%',
                        marginHorizontal: 8,
                      }]}>
                      <Text
                        style={{
                          fontSize: 45,
                          fontWeight: 'bold',
                          color: '#3B7457',
                        }}>
                        {this.state._points != null ? this.state._points : 0}
                      </Text>
                      <Text style={{ fontSize: 16, marginTop: -10 }}>Points</Text>
                    </View>
                    <View
                      style={[styles.cardcontainer, {
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        width: '30%',
                        marginHorizontal: 8,
                      }]}>
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
                      <Text style={{ fontSize: 16, marginTop: -10 }}>
                        Box Orders
                      </Text>
                    </View>
                  </View>


                  <View
                    style={[styles.cardcontainer, {
                      width: windowWidth - 25, justifyContent: 'center',
                      alignItems: 'center',
                    }]}
                    activeOpacity={0.95}>
                    <View style={styles.labelContainer}>
                      <View style={{
                        // paddingTop: 30,

                      }}>
                        {/* <View>
                        <Text style={styles.mainText}>Basic Information</Text>
                      </View> */}

                        <QRCode
                          value={'' + this.context.name.mobile_no}
                          size={200}
                          bgColor="black"
                          fgColor="white"
                        />

                      </View>


                    </View>

                  </View>
                </View>
              ),
            },
          ]}
          tabTextStyle={styles.tabText}
          tabTextContainerStyle={styles.tabTextContainerStyle}
          tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
          // tabsContainerBackgroundColor={'#3B7457'}
          tabsContainerStyle={styles.backgroundRadious}
          tabsWrapperStyle={styles.tabsWrapper}

        >

        </StickyParallaxHeader>
    ):   <View
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
  </View>}
      </>

    );
  }
}
const styles = StyleSheet.create({
  content: {
    height: 1000,
    marginTop: 0,
  },
  foreground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#3B7457',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  message: {
    color: 'white',
    fontSize: 20,
    paddingTop: 24,
    paddingBottom: 7,
  },
  headerWrapper: {
    backgroundColor: '#3B7457',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',

  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12,
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: 'lightgreen',
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },
  cardcontainer: {
    marginTop: 12,
    shadowColor: 'rgb(35,35,35)',
    shadowOffset: {
      width: 2,
      heght: 2,
    },
    shadowRadius: 40,
    shadowOpacity: 0.08,
    borderWidth: 2,
    borderColor: 'rgb(246,245,248)',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  labelTextContainer: {
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: 16,
    color: 'rgb(25,25,25)',
  },
  labelText: {
    fontSize: 13,
    lineHeight: 16,
    color: 'black',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: 'AvertaStd-Semibold',
    letterSpacing: 0.8,
  },
  mainText: {
    fontSize: 20,
    lineHeight: 24,
    color: 'black',
    paddingTop: 8,
    paddingBottom: 20,
    fontFamily: 'AvertaStd-Semibold',
  },
  radioButtonText: {
    paddingVertical: 8,
    fontSize: 12,
    color: 'gray',
  },
  backgroundRadious: {
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35
  },
  avatar:{
    width:95,
    height:95,
    borderRadius:100
  },
  avatarButton:{
    height:100,
    width:100,
    backgroundColor:'gray',
    borderRadius:100,
    borderWidth:5,
    borderColor:'white',
    alignItems:'center',
    justifyContent:'center'
  }
});
