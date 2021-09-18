import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
export class Details extends Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>test!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SettingDetail')}

          >
            <Text>tEST dCRENN</Text>
   
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}