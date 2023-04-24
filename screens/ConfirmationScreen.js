import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { useCallback, useState} from 'react';
import { StyleSheet} from 'react-native';
import { CheckBox } from '@rneui/base';

export default function ConfirmationScreen({route, navigation}){
  let {checkoutList} = route.params

  let getCheckoutItems = useCallback(()=>{
    return checkoutList.map((item)=>{
      return(
        <Text key={item.key}>{"\t"}{item.amount} x {item.Item}, ${item.price}{"\n"}</Text>
      )
    })
  })

  let getTotalPrice = useCallback(()=>{
    let total = 0
    checkoutList.forEach((item) => {
      console.log(item.Item + " " + item.price.toString() + " " + item.amount.toString())
      total += item.price*item.amount
    })
    return total.toFixed(2)
  })

  return(
    <View style={styles.container}>
      <Text>Your order of{"\n"}</Text>
      {getCheckoutItems()}
      <Text>For ${getTotalPrice()} Has been confirmed!</Text>
      <View style={styles.button}>
        <Button onPress={()=>{navigation.goBack()}} title="Return"></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
  },
  button: {
    minWidth: '20%',
    maxWidth: 200,
    minHeight: '10%',
    maxHeight: 150,
    alignItems: 'right'
  }
});