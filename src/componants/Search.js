import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
export class Search extends Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>search!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SettingDetail')}

          >
            <Text>Search dCRENN</Text>
   
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}