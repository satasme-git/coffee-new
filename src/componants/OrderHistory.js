import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {List, ListItem, Left, Body, Right} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';
import {CustomHeader} from '../index';
export class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      orders: [],
      refreshing: false,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
  

    this._unsubscribe = navigation.addListener('focus', () => {
      this.fetchCats();
    });

    // this.fetchCats();
  }
  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }

  async fetchCats(){
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://boxesfree.shop/api/order_history/' + myArray, {
      method: 'get',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            // data: responseJson,
            orders: responseJson,
          },
          function () {},
        );

        // var datas=JSON.stringify(responseJson);
      })
      .catch((error) => {
        // console.error(error);
        this.setState({
          visible: true,
          errormsg: 1,
        });
      });
  }
  handleRefresh = () => {
    this.setState({refreshing: false}, () => {
      this.fetchCats();
    }); // call fetchCats after setting the state
  };
  emptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F2F2F2',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>No orders</Text>
      </View>
    );
  };
  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3B7457"
        />
         <CustomHeader
          title="Order History"
          isHome={true}
          bdcolor="#3B7457"
          bgcolor="#3B7457"
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, paddingBottom: 50}}>
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Order history
            </Text>
            <View>
              <Button
                title="Box orders"
                type="solid"
                titleStyle={{color: 'white'}}
                buttonStyle={{
                  borderRadius: 25,
                  backgroundColor: '#3B7457',
                  color: 'white',
                  padding: 5,
                  paddingHorizontal: 15,
                  marginBottom: 5,
                  marginTop: 5,
                }}
                onPress={() => this.props.navigation.navigate('Box Orders')}
              />
            </View>
          </View>
          <View>
            {/* <FlatList
              contentContainerStyle={{
                // padding: 15,
                paddingTop: StatusBar.currentHeight || 0,
              }}
              ListEmptyComponent={this.emptyComponent}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={this.keyExtractor}
              data={this.state.orders}
              renderItem={this.renderItem}
            /> */}

            <FlatList
              data={this.state.orders}
              ListEmptyComponent={this.emptyComponent}
              renderItem={({item}) => (
                <ListItem
                  style={{
                    paddingTop: 10,
                    flexDirection: 'row',
                    marginBottom: 15,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    // borderRadius: 16,
                    borderBottomColor: 'white',
                    borderBottomWidth: 0.1,
                    marginLeft: 0,
                  }}>
                  <Body style={{padding: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // marginBottom: 3,
                      }}>
                      <View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: '#d4e157',
                              borderRadius: 10,
                              marginTop: 2,
                              marginLeft: 10,
                              width: 70,
                              height: 22,
                              alignItems: 'center',
                              justifyContent: 'center',
                              // marginLeft: 10,
                            }}>
                            <Text>Order Id</Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 17,
                                fontWeight: 'bold',
                                marginLeft: 25,
                              }}>
                              {item.order_id}
                            </Text>
                            <Text style={{marginLeft: 25}}>{item.date}</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View>
                      {/* <Text>{item.order_id}</Text> */}
                      <FlatList
                        data={item.items}
                        renderItem={({item}) => (
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                margin: 10,
                                marginLeft: 20,
                              }}>
                              <Image
                                source={{
                                  uri:
                                    'https://boxesfree.shop/public/images/food/' +
                                    item.image,
                                }}
                                style={{
                                  resizeMode: 'cover',
                                  width: 60,
                                  height: 60,
                                  marginRight: 25,
                                  justifyContent: 'flex-end',
                                }}></Image>
                              <View>
                                <Text style={{fontWeight: 'normal'}}>
                                  {item.food_name}
                                </Text>
                                <Text
                                  numberOfLines={2}
                                  ellipsizeMode="tail"
                                  style={{fontSize: 10, color: 'gray'}}>
                                  {item.food_disc}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                  <Text style={{color: 'green'}}>Quantity</Text>
                                  <View
                                    style={{
                                      backgroundColor: 'gray',
                                      borderRadius: 10,
                                      marginTop: 2,
                                      width: 26,
                                      height: 16,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      marginLeft: 10,
                                    }}>
                                    <Text
                                      style={{fontSize: 10, color: 'white'}}>
                                      {item.qty}
                                    </Text>
                                  </View>
                                </View>
                                <Text>{item.pSize}</Text>
                                {item.topins != 0 ? (
                                  <Text style={{color: 'red'}}>
                                    {item.topins}
                                  </Text>
                                ) : null}

                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{fontWeight: 'bold', marginTop: 2}}>
                                    A$ {item.price}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </View>

                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 17,
                        marginLeft: 100,
                      }}>
                      Total : {item.total}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 100,
                        marginTop: 5,
                      }}>
                      {/* <Text style={{fontSize: 10, color: 'white'}}> */}
                      {item.payment_method == 'Cash' ? (
                        <View
                          style={{
                            backgroundColor: 'red',
                            borderRadius: 5,
                            marginTop: 2,
                            width: 46,
                            height: 22,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 8,
                          }}>
                          <Text style={{color: 'white'}}>Cash</Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: '#64b5f6',
                            borderRadius: 5,
                            marginTop: 2,
                            width: 46,
                            height: 22,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 8,
                          }}>
                          <Text style={{color: 'white'}}>Card</Text>
                        </View>
                      )}
                      {/* </Text> */}
                      {item.status == 2 ? (
                        <View
                          style={{
                            backgroundColor: '#26a69a',
                            borderRadius: 5,
                            marginTop: 2,
                            // width: 46,
                            height: 22,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 8,
                          }}>
                          <Text style={{color: 'white'}}>Order completed</Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: '#ffa726',
                            borderRadius: 5,
                            marginTop: 2,
                            marginRight: 8,
                            height: 22,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{color: 'white'}}>Order pending</Text>
                        </View>
                      )}
                    </View>

                    {/* <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: 'green',
                      }}>
                      {item.order_id}
                    </Text> */}
                  </Body>
                </ListItem>
              )}
              keyExtractor={(item) => item.id}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
