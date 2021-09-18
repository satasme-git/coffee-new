import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {CustomHeader} from '../index';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import {IMAGE} from '../constants/image';
handleLoadMore = () => {
  this.setState({page: this.state.page + 1, isLoading: true}, this.getData);
};

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // dataSource: []
      page: 1,
      isLoading: false,
    };
  }
  renderItem = ({item}) => {
    <View>
      <View>
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
        <Text>{item.event_image}</Text>
        <Text>{item.description}</Text>
      </View>
    </View>;
  };
  componentDidMount() {
    this.setState({isLoading: true}, this.getData);
  }
  renderRow = ({item}) => {
    return (
      <Card>
        <View style={styles.itemRow}>
        
          <CardImage
            style={styles.itemImage}
            source={{
              uri: 'https://boxesfree.shop/images/Events/' + item.event_image,
            }}
          />
     
          <View style={{flex: 2, paddingTop: 0, paddingEnd: 0,padding:10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
            <Text >
              {item.description}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 11, color: 'grey'}}>2h .</Text>
              <Icon name="heart" style={{color: '#0A69FE', paddingTop: 3}} />
            </View>
          </View>
          {/* <CardAction separator={true}>
            <View style={styles.line}>
     
            </View>
          </CardAction> */}
        </View>
      </Card>
    );
  };
  getData = async () => {
    const apiURL = 'https://boxesfree.shop/events';
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          data: this.state.data.concat(resJson),
          isLoading: false,
        });
      });
  };

  render() {
    return (
      <View>
      {/* <StatusBar barStyle="light-content" backgroundColor="#3B7457" /> */}
      <ParallaxScroll
        renderHeader={({animatedValue}) => (
          <View 
          
          animatedValue={animatedValue}>
            {/* <Text>asdasdad</Text> */}
            <CustomHeader
              title="Events"
              isPost={false}
              isHome={true}
              bdcolor="#3B7457"
              bgcolor="white"
              navigation={this.props.navigation}
            />
          </View>
        )}
        headerHeight={50}
        
        isHeaderFixed={false}
        parallaxHeight={250}
        headerBackgroundColor="rgba(0,0,0,0.01)"
        fadeOutParallaxBackground={true}
        fadeOutParallaxForeground={true}
        //   headerFixedTransformY={1}
        //   isHeaderFixed={true}
        renderParallaxBackground={({animatedValue}) => (
          <View
          style={{  elevation: 5,
           
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 5,}}
          animatedValue={animatedValue}>
            <Image
              style={{width: '100%', marginTop: -40,
          
          }}
              source={IMAGE.ICON_EVT_BACK}
              resizeMode="contain"
            />
          </View>
        )}
        renderParallaxForeground={({animatedValue}) => (
          <View
            style={{marginTop: 180, paddingLeft: 15,
              elevation: 5,
              
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 5,
          }}
            animatedValue={animatedValue}>
            {/* <Text
              style={{fontWeight: 'normal', fontSize: 20, color: 'white'}}>
             Events
            </Text> */}
          </View>
        )}
        parallaxBackgroundScrollSpeed={5}
        parallaxForegroundScrollSpeed={2.5}>
        <View
          style={{
            // height: 800,
            backgroundColor: '#F2F2F2',
          padding:6,
           
          }}>
            <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter}
        />
        </View>
      </ParallaxScroll>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInputStyleClass: {
    textAlign: 'center',
    height: 38,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  inputsContainer: {
    flex: 1,
  },
  fullWidthButton: {
    backgroundColor: 'blue',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: 'white',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  line: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    height: 20,
  },
  textLabel: {
    height: 50,
    fontSize: 18,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  textBox: {
    color: 'grey',
    height: 50,
    fontSize: 18,
    flexGrow: 1,
    alignItems: 'center',
    padding: 12,
  },
  container: {
    marginTop: 20,
    backgroundColor: '#f5fcff',
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginTop: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: '100%',
    // height: 200,
    resizeMode: 'cover',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
