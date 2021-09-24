import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity,StatusBar } from 'react-native';
import { CustomHeader } from '../index';
import moment from 'moment';

export class Week extends Component {
  constructor(props) {
    super(props)
    this.state = {
        openData :[]
      };

  }

  fetchOpen(){
    fetch('https://boxesfree.shop/api/getweek', {
      method: 'get',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          openData: responseJson,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        // console.error(error);
        // this.setState({
        //   visible: true,
        //   errormsg: 1,
        // });
      });
  }
  componentDidMount() {
      this.fetchOpen();
  }
  render() {
      let {openData}= this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-light" hidden={false} backgroundColor="#3B7457" />
                <CustomHeader title="Opening Hours" isPost={false} isHome={true} bdcolor='#3B7457' bgcolor='#3B7457' navigation={this.props.navigation} />
                
        <View style={{ flex: 1,padding:15 }}>
          
          {openData.map((data)=>
          <View key={data.id} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
              <View style={{
                borderWidth:2,
                borderColor:data.status==1?'#37B5E5':'#E3685E',
                width:50,
                height:50,
                margin:5,
                borderRadius:60,
                alignItems:'center',
                justifyContent:'center',
                zIndex:0,
                elevation:1,
                backgroundColor:moment(new Date()).format('dddd')==data.day?data.status==1?'#37B5E5':'#E3685E':'white'
                }}
              >
                <Text style={{color:moment(new Date()).format('dddd')!=data.day?'black':'white',fontSize:17}}>{data.day.slice(0, 3).toUpperCase()}</Text>  
              </View>

              <View style={{backgroundColor:'white',marginLeft:-30,height:50,zIndex:1, justifyContent:'space-between',width:'90%',borderBottomRightRadius:5,borderTopRightRadius:5,flexDirection:'row',alignItems:'center',paddingRight:10}}>
                {data.status==1?
                <Text style={{fontSize:17,paddingLeft:40,color:'#3a2f2f'}}>{data.open} - {data.close}</Text>
                :
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                <Text style={{fontSize:17,paddingLeft:40,color:'#E3685E'}}>Closed{data.reason?' - ':''}</Text>
                <Text style={{fontSize:17,color:'#E3685E',textAlign:'left',width:'45%'}}>{data.reason}</Text>
                </View>
              }
              <Text style={{color:data.status==1?'#37B5E5':'#E3685E'}}>{data.date} </Text>
              </View>
              

              
              
          </View>
          )}

        </View>

      </SafeAreaView>
    );
  }
}