import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  LogBox,
} from 'react-native';
import Swiper from 'react-native-web-swiper';
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
import { IMAGE } from '../constants/image';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import Star from 'react-native-star-view';
// import { SearchBar } from 'react-native-elements';
import { Icon, Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import Carousel from 'react-native-snap-carousel';
import Dialog from 'react-native-dialog';
import { MaterialDialog } from 'react-native-material-dialog';
import AsyncStorage from '@react-native-community/async-storage';
let deviceWidth = Dimensions.get('window').width;


import Context from '../../Context/context';

import * as Animatable from 'react-native-animatable';
export class MainHome extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      setLoading: false,
      errormsg: '',
      slides: [],
      data: [],
      dbs: '',
      visible: false,
      setVisible: '',
      isModalVisible: false,
      setModalVisible: false,
    };

    this.loadDbVarable = this.loadDbVarable.bind(this);
  }

  loadDbVarable() {
    this.getAllSlides();
  }
  state = {
    search: '',
  };

  toggleModal() {
    this.setState({
      setModalVisible: true,
    });
  }
  _renderItem = ({ item, index }) => {
    return (
      <View>
        <ImageBackground
          source={{
            uri:
              'https://boxesfree.shop/work/public/images/slides/' + item.thumb,
          }}
          style={{
            resizeMode: 'cover',
            width: '100%',
            height: '100%',

            justifyContent: 'flex-end',
          }}>
          {/* {item.id == 11 ? (
            <Button
              title="Boxes free"
              color="#841584"
              buttonStyle={
                (styles.submitText,
                {
                  margin: 10,
                  borderRadius: 25,
                  width: 110,
                  borderColor: 'white',
                  backgroundColor: 'red',
                  color: '#ccc',
                  padding: 7,
                  borderWidth: 1.5,
                })
              }
              onPress={() => this.showDialog()}
              accessibilityLabel="Learn more about this purple button"
            />
          ) : item.id == 12 ? (
            <Button
              title="Events"
              color="#841584"
              buttonStyle={
                (styles.submitText,
                {
                  margin: 10,
                  borderRadius: 25,
                  width: 110,
                  borderColor: 'white',
                  backgroundColor: 'red',
                  color: '#ccc',
                  padding: 7,
                  borderWidth: 1.5,
                })
              }
              onPress={() => this.props.navigation.navigate('Events')}
              accessibilityLabel="Learn more about this purple button"
            />
          ) : null} */}
        </ImageBackground>
      </View>
    );
  };

  loadScren() {
    fetch('https://boxesfree.shop/getAllsubcategory', {
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
          data: responseJson,
        });
      })
      .catch((error) => {
        // console.error(error);
        this.setState({
          errormsg: 1,
        });
      });
  }
  async componentDidMount() {
    this.getAllSlides();
    this.loadScren();


    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.setState({
      setLoading: true,
    });

    const jsonValue = await AsyncStorage.getItem('userInfo');
    const cart_val = await AsyncStorage.getItem('cart_Value');


    this.context.addNewTask(cart_val);

    this.context.addCart(cart_val);

    return jsonValue != null ? this.context.addNewTask(JSON.parse(jsonValue)) : null

  }
  abc = () => {
    this.getAllSlides();
    this.loadScren();
  };
  getAllSlides() {
    fetch('https://boxesfree.shop/admin/getAllSlides', {
      method: 'get',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          isLoading: false,
          slides: responseJson,
        });
      })
      .catch((error) => {
        this.setState({
          errormsg: 1,
        });
        // console.error(error);
      });
  }
  updateSearch = (search) => {
    this.setState({
      isLoading: false,
      search,
    });
  };

  showDialog() {
    this.setState({
      visible: true,
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  handleDelete() {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({
      visible: false,
    });
  }
  renderItem = ({ item }) => {
    return (
      <ListItem
        style={{
          marginBottom: 10,
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: item.color,
          // backgroundColor:'#FFEDD2'
        }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('TabScreentest', {
              categpry_name: item.name,
            })
          }>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: -15,
              marginLeft: 5,
              marginBottom: -20,
            }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ImageBackground
                source={{ uri: item.image }}
                style={{
                  bottom: 50,
                  resizeMode: 'cover',
                  width: 105,
                  height: 90,
                }}></ImageBackground>
            </View>
            <View style={{ bottom: 30 }}>
              <Text style={(styles.dateText, { fontWeight: 'bold' })}>
                {item.name}{' '}
              </Text>
            </View>
            <View style={{ bottom: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('TabScreentest', {
                    categpry_name: item.name,
                  })
                }>
                <View style={styles.addWrapper}>
                  <Text style={{ color: 'white' }}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </ListItem>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    let { isLoading } = this.state;
    const { search } = this.state;
    const starStyle = {
      width: 70,
      height: 15,
      marginBottom: 0,
      marginTop: 0,
    };
    if (isLoading) {
      return (
        <View style={{ backgroundColor: '#F2F2F2', height: 220 }}>
          <View style={{ backgroundColor: '#3B7457', height: 80, elevation: 10 }}>
            <View style={{ marginLeft: 20, marginBottom: 10, marginTop: -5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 32, color: 'white' }}>
                Welcome To
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 20,
                  color: 'white',
                }}>
                Marlen's Wherehouse
              </Text>
            </View>

            <View style={{ marginTop: 0, paddingLeft: 15, paddingRight: 15 }}>
              {/* <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 25,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  height: 42,
                }}>
                <Icon
                  name="search"
                  type="font-awesome"
                  size={20}
                  style={{color: '#9e9e9e', paddingRight: 5}}
                />

                <TextInput
                  style={{width: '85%'}}
                  placeholder="Search..."
                  onEndEditing={this.clearFocus}
                  autoFocus={false}
                />
              </View> */}
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            {this.state.errormsg != 1 ? (
              <BarIndicator style={{ marginTop: 35 }} color="#3B7457" size={30} />
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Check your connection and</Text>
                <Text>Try again</Text>
                <Button
                  title="Retry"
                  type="solid"
                  titleStyle={{ color: 'white' }}
                  buttonStyle={{
                    borderRadius: 10,
                    borderColor: 'white',
                    color: 'white',
                    padding: 8,
                    borderWidth: 1,
                    marginBottom: 20,
                    marginTop: 5,
                    width: 80,
                    backgroundColor: 'red',
                  }}
                  onPress={() => this.abc()}
                />
              </View>
            )}
          </View>

          {/* <BarIndicator style={{marginTop: 35}} color="#3B7457" size={30} /> */}
        </View>
      );
    } else {
      return (
        <Animatable.View animation="bounceInDown">
          <ParallaxScroll
            renderHeader={({ animatedValue }) => (
              <View style={{ backgroundColor: 'red', height: 80 }}>
                <View style={{ backgroundColor: '#3B7457', height: 80 }}>
                  <View
                    style={{ marginLeft: 20, marginBottom: 10, marginTop: -5 }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 32,
                        color: 'white',
                      }}>
                      Welcome To
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 20,
                        color: 'white',
                      }}>
                      Marlen's Warehouse
                    </Text>
                  </View>
                  <View
                    style={{ marginTop: 0, paddingLeft: 15, paddingRight: 15 }}>
                    {/* <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderColor: 'gray',
                      borderWidth: 0.5,
                      borderRadius: 25,
                      backgroundColor: '#F2F2F2',
                      paddingLeft: 10,
                      height: 42,
                    }}>
                    <Icon
                      name="search"
                      type="font-awesome"
                      size={20}
                      style={{color: '#9e9e9e', paddingRight: 5}}
                    />
                    <TextInput
                      style={{width: '85%'}}
                      placeholder="Search..."
                      onEndEditing={this.clearFocus}
                      autoFocus={false}
                    />
                  </View> */}
                  </View>
                </View>
              </View>
            )}
            headerHeight={80}
            isHeaderFixed={false}
            parallaxHeight={80}
            parallaxBackgroundScrollSpeed={5}
            parallaxForegroundScrollSpeed={2.5}>
            <View style={{ height: 780, backgroundColor: '#F2F2F2' }}>
              <View style={{ height: 140, marginTop: 10, }}>
                <Carousel
                  ref={(c) => {
                    this._carousel = c;
                  }}
                  autoplay={true}
                  loop={true}
                  useScrollView={true}
                  scrollEnabled={true}
                  hasParallaxImages={true}
                  layout={'default'}
                  // inactiveSlideScale={1}


                  layoutCardOffset={18}
                  data={this.state.slides}
                  renderItem={this._renderItem}
                  sliderWidth={deviceWidth}
                  itemWidth={250}
                />

                {/* <Swiper
                horizontal
                loop
                timeout={-3.5}

                controlsProps={{
                  dotActiveStyle: {backgroundColor: 'red'},
                }}>
                {
                
                this.state.slides.map((item, key) => {
                  return (
                    <View key={key}>
                       <Image
                    source={{uri: "https://satasmemiy.tk/work/public/images/slides/"+item.thumb}}
                    style={{height: 300, width: 390}}></Image>

                      
                    </View>
                  );
                })
                
                } */}

                {/* <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(200,20,20,0.3)',
                  }}>
                  <Image
                    source={IMAGE.ICON_SLIDE7}
                    style={{height: 280, width: 390}}></Image>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(200,20,20,0.3)',
                  }}>
                  <Image
                    source={IMAGE.ICON_SLIDE4}
                    style={{height: 280, width: 400}}></Image>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(200,20,20,0.3)',
                  }}>
                  <Image
                    source={IMAGE.ICON_SLIDE5}
                    style={{height: 280, width: 400}}></Image>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(200,20,20,0.3)',
                  }}>
                  <Image
                    source={IMAGE.ICON_SLIDE6}
                    style={{height: 280, width: 400}}></Image>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(200,20,20,0.3)',
                  }}>
                  <Image
                    source={IMAGE.ICON_SLIDE3}
                    style={{height: 280, width: 400}}></Image>
                </View> */}
                {/* </Swiper> */}
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    paddingLeft: 15,
                    paddingTop: 20,
                  }}>
                  Our Category
                </Text>
                <View
                  style={{
                    borderTopWidth: 4,
                    borderTopColor: '#009688',
                    borderRadius: 3,
                    marginHorizontal: 16,
                    width: 45,
                    marginTop: 10,
                  }}></View>
                {/* <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentInsetAdjustmentBehavior="automatic"> */}
                <FlatList
                  horizontal
                  contentContainerStyle={{
                    paddingTop: StatusBar.currentHeight || 0,
                  }}
                  ListEmptyComponent={this.emptyComponent}
                  scrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={this.keyExtractor}
                  data={this.state.data}
                  renderItem={this.renderItem}
                />
                {/* </ScrollView> */}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    paddingLeft: 15,
                    paddingTop: 0,
                  }}>
                  Favourites
                </Text>
                <View style={[styles.card, { margin: 15 }]}>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{ backgroundColor: '#F2F2F2', borderRadius: 200 }}>
                      <Image
                        source={IMAGE.ICON_ABTIMG6}
                        style={{ height: 120, width: 120 }}></Image>
                    </View>
                    <View style={{ margin: 10 }}>
                      <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                        Blueberry Muffin
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: 11,
                          color: 'gray',
                          width: '21%',
                          marginTop: 5,
                        }}>
                        Originally published on this day in 2014, these
                        blueberry muffins are a personal and reader favorite. I
                        found myself baking the muffins often, swapping
                        blueberries for apples, peaches, and other fruits.
                      </Text>
                      <Star score={4.7} style={starStyle} />
                      <Text
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        A$ 4
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* <Button title="Show dialog" onPress={() => this.props.navigation.navigate('TestScreen')} /> */}
            </View>
            <View>
              <MaterialDialog
                title="Select Boxes type "
                visible={this.state.visible}
                cancelLabel={'CAncel'}
                onCancel={() => this.setState({ visible: false })}
              //  width={'100%'}
              >
                {/* <View> */}
                {/* <View> */}
                <View style={[styles.container1, { width: 310 }]}>
                  <Card style={[styles.card1, { backgroundColor: '#00897b' }]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleCancel();
                        this.props.navigation.navigate('BoxessFree');
                      }}>
                      <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 10, padding: 5 }}>
                          <Text style={{ color: 'white' }}>Residential</Text>
                          <Text style={{ color: 'white' }}>Boxes</Text>
                        </View>

                        <Text style={{ marginTop: 0, fontSize: 12 }}> </Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                  <Card style={[styles.card1, { backgroundColor: '#c1295c' }]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleCancel();
                        this.props.navigation.navigate('CommercialBoxes');
                      }}>
                      <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 10, padding: 5 }}>
                          <Text style={{ color: 'white' }}>Commercial</Text>
                          <Text style={{ color: 'white' }}>Boxes</Text>
                        </View>

                        <Text style={{ marginTop: 0, fontSize: 12 }}> </Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                  <Card style={[styles.card1, { backgroundColor: '#009ae4' }]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleCancel();
                        this.props.navigation.navigate('HomeAppliance');
                      }}>
                      <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 10, padding: 5 }}>
                          <Text style={{ color: 'white' }}>Home </Text>
                          <Text style={{ color: 'white' }}>Appliance</Text>
                        </View>

                        <Text style={{ marginTop: 0, fontSize: 12 }}> </Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                </View>


                {/* </View>
              </View> */}
                {/* <Text style={styles.dialogText}>
    Let Google help apps determine location. This means sending anonymous
    location data to Google, even when no apps are running.
  </Text> */}
              </MaterialDialog>

              {/* <Dialog.Container visible={this.state.visible}>
              <Dialog.Title>Select Boxes type </Dialog.Title>
              <Dialog.Description> 
                <View>
                  <View style={styles.container1}>
                    <Card style={[styles.card1, {backgroundColor: '#00897b'}]}>
                      <TouchableOpacity
                        onPress={() => {
                          this.handleCancel();
                          this.props.navigation.navigate('BoxessFree');
                        }}>
                        <View style={{alignItems: 'center'}}>
                          <View style={{height: 10, padding: 5}}>
                            <Text style={{color: 'white'}}>Residential</Text>
                            <Text style={{color: 'white'}}>Boxes</Text>
                          </View>

                          <Text style={{marginTop: 0, fontSize: 12}}> </Text>
                        </View>
                      </TouchableOpacity>
                    </Card>
                    <Card style={[styles.card1, {backgroundColor: '#c1295c'}]}>
                      <TouchableOpacity
                        onPress={() => {
                          this.handleCancel();
                          this.props.navigation.navigate('Commercial Boxes');
                        }}>
                        <View style={{alignItems: 'center'}}>
                          <View style={{height: 10, padding: 5}}>
                            <Text style={{color: 'white'}}>Commercial</Text>
                            <Text style={{color: 'white'}}>Boxes</Text>
                          </View>

                          <Text style={{marginTop: 0, fontSize: 12}}> </Text>
                        </View>
                      </TouchableOpacity>
                    </Card>
                    <Card style={[styles.card1, {backgroundColor: '#009ae4'}]}>
                      <TouchableOpacity
                        onPress={() => {
                          this.handleCancel();
                          this.props.navigation.navigate('Home Appliance');
                        }}>
                        <View style={{alignItems: 'center'}}>
                          <View style={{height: 10, padding: 5}}>
                            <Text style={{color: 'white'}}>Home </Text>
                            <Text style={{color: 'white'}}>Appliance</Text>
                          </View>

                          <Text style={{marginTop: 0, fontSize: 12}}> </Text>
                        </View>
                      </TouchableOpacity>
                    </Card>
                  </View>
                </View>
              </Dialog.Description>
              <Dialog.Button
                label="Cancel"
                onPress={() => this.handleCancel()}
              />
            </Dialog.Container> */}
            </View>
          </ParallaxScroll>
        </Animatable.View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  addWrapper: {
    width: 25,
    height: 25,
    backgroundColor: '#3B7457',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 0.2,
  },
  card: {
    height: 135,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'flex-start',

    // margin: 5
  },
  card1: {
    height: 65,
    // width:'100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'flex-start',
    color: 'white',
    // margin: 5
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: 'red',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  container1: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // width:200
    marginLeft: -8,
  },
});
