import { Button } from 'native-base';
import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
export class FoodForm extends Component {

  constructor(props) {
    super(props)

  }
  state = {
    food: null,
    foodList: []
  }
  submitFood = (food) => {
    this.setState(
      {
        foodList:
          [...this.state.foodList, {
            key: Math.random(),
            name: food
          }]
      }
    )
  }
  deleteFood = (key) => {
    this.setState(
      {
        foodList: [
          ...this.state.foodList.filter((item) =>
            item.key !== key)
        ]
      }
    )
  }

  render() {
    console.log(this.state.foodList);
    return (
      <View style={styles.container}>
        <Text style={styles.title} Redux></Text>
        <TextInput value={this.state.food} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#F2F2F2', paddingLeft: 10 }} placeholder="Enter name herename" />
        <TextInput
          value={this.state.food}


        >

        </TextInput>
        <Button
          title="submit"
          color="black"
        >
          {/* <Text>Footer</Text> */}
        </Button>
        <Button
          title="submit"
          color="black"
          onPress={() => this.submitFood(this.state.food)}

        >
          <Text>submit</Text>
        </Button>
        <Button
          title="go to foodlist"

          onPress={() => this.props.navigation.navigate('FoodList',
            {
              foodList: this.state.foodList,
              deleteFood: this.deleteFood
            }
          )}
        >
          <Text>go to foodlist</Text>
        </Button>
      </View>
    );
  }
} const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center'

  },
  title: {
    fontSize: 64,
    marginBottom: 48
  },
  foodInput: {
    fontSize: 32,
    marginBottom: 32,
    borderWidth: 1,
    width: '80%',
    padding: 8,
    borderRadius: 10
  }
})