import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
export class MainPage extends Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>maon!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SignUp')}

          >
            <Text>Sign</Text>
   
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SignIn')}

          >
            <Text>Sign</Text>
   
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('TabScreentest')}

          >
            <Text>tabs</Text>
   
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('MainHome')}

          >
            <Text>Mein</Text>
   
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}