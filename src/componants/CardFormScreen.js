import React, { PureComponent } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';

import stripe from 'tipsi-stripe';
import axios from 'axios'
// import Button from '../components/Button'
// import testID from '../componants/utils/testID'


stripe.setOptions({
    publishableKey: 'pk_test_Wim6Z9pN58qzMYDDXvsPMrR0',

})

export class CardFormScreen extends PureComponent {
    static title = 'Card Form'

    state = {
        loading: false,
        token: null,
        success: null
    }

    doPayment = async () => {
        // Use firebase serve for local testing if you don't have a paid firebase account
        fetch('http://localhost:5000/shoppr-c97a7/us-central1/payWithStripe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 0.001,
                currency: "usd",
                token: this.state.token.tokenId
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    success: responseJson.status == 'succeeded' ? true : false,
                    response: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });;
    }

    handleCardPayPress = async () => {


        try {
            
        // const options = {
        //     requiredBillingAddressFields: 'full',
        //     prefilledInformation: {
        //       billingAddress: {
        //         name: 'Gunilla Haugeh',
        //         line1: 'Canary Place',
        //         line2: '3',
        //         city: 'Macon',
        //         state: 'Georgia',
        //         country: 'US',
        //         postalCode: '31217',
        //       },
        //     },
        //   }
          
        //   const paymentMethod = await stripe.paymentRequestWithCardForm(options)
        //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+paymentMethod.tokenId);


            // this.setState({ loading: true, token: null })
            // const token = await stripe.createTokenWithCard({
            //     number: '4242424242424242',
            //     expMonth: 11,
            //     expYear: 17,
            //     cvc: '223'
            //   });
            
            // //   console.log(token);
            const token = await stripe.paymentRequestWithCardForm({
                // Only iOS support this options
                smsAutofillDisabled: true,
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                    billingAddress: {
                        name: 'chamil pathirana',
                        line1: '130/B',
                        line2: 'Dandeniya',
                        city: 'Eheliyagoda',
                        state: 'Rathnapura',
                        country: 'Sri lanka',
                        postalCode: '70600',
                        email: 'chamiljay88@gmail.com',
                    },
                },
            })
            // this.setState({ loading: true, token: null })
            this.setState({ loading: false, token })
        } catch (error) {
            this.setState({ loading: false })
        }
    }

    render() {
        const { loading, token, success, response } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Card Form Example
              </Text>
                <Text style={styles.instruction}>
                    Click button to show Card Form dialog.
              </Text>
                <Button
                    text="Enter you card and pay"
                    loading={loading}
                    onPress={this.handleCardPayPress}
                // {...testID('cardFormButton')}
                />
                <View
                    style={styles.token}
                >
                 
                    {token && (
                        <View>
                            <Text style={styles.instruction}>Token: {token.id} </Text>

                            <Button
                                text="Make Payment"
                                loading={loading}
                                onPress={this.doPayment}
                       
                            />
                        </View>

                    )}
                    {success &&
                        <>
                            <Text style={styles.instruction}>
                                Status: {response.status}
                            </Text>
                            <Text style={styles.instruction}>
                                ID: {response.id}
                            </Text>
                            <Text style={styles.instruction}>
                                Amountssssss: {response.amount}
                            </Text>
                        </>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTitle: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instruction: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    token: {
        height: 20,
        color:'black',
        fontSize:20,

    },
})
