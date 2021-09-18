import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
export class Home extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('CofeeDetails')}

          >
            <Text>cofee dCRENN</Text>

          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('Menu')}

          >
            <Text>Menu</Text>

          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('PlaceOrder')}

          >
            <Text>PlaceOrder</Text>

          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('FirstPage')}

          >
            <Text>First </Text>

          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SignIn')}

          >
            <Text>First </Text>

          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}