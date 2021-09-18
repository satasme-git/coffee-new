import React, {Component} from 'react';
import { CustomHeader } from '../index';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  DrawerLayoutAndroidBase,
} from 'react-native';
import {Button} from 'react-native-elements';
// import {SafeAreaView} from 'react-native-safe-area-context';

import {WebView} from 'react-native-webview';

export class TermsAndConditions extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
        <WebView
        startInLoadingState
        source={{ uri: 'https://boxesfree.com/' }}
        style={{ marginTop: 20 }}
        renderLoading={() => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          )}

        allowsBackForwardNavigationGestures
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
