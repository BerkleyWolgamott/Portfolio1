import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { useCallback, useState} from 'react';
import { StyleSheet} from 'react-native';
import { CheckBox } from '@rneui/base';

export default function MainMenuScreen({navigation}){
  const [currentSelections, setCurrentSelections] = useState([])

  let menuItems=[
  {
      "Item": "Meatball Meatball",
    "Description": "Meatball meatball meatball",
    "price": 5.99,
    "amount": 0,
    "key": '0'
  },
  {
    "Item": "Pizza Pizza",
    "Description": "Yum yum",
    "price": 8.99,
    "amount": 0,
    "key": '1'
  },
  {
    "Item": "Bird Meat",
    "Description": "Flap flap",
    "price": 9.88,
    "amount": 0,
    "key": '2'
  },
  {
    "Item": "Soylent Green",
    "Description": "Soylent Green is people!",
    "price": 585.0,
    "amount": 0,
    "key": '3'
  }
  ]
  let goToCheckout = useCallback(()=>{
    if(currentSelections.length > 0){
      navigation.navigate("Checkout", {checkoutList: currentSelections});
    }
  }) 

  function GetMenuItems(){
    return (menuItems.map((item, index) => {return (
      <View style={styles.container} key={item.key}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={currentSelections.find((currentItem) => currentItem.key == item.key)}
            onPress={()=>{
                if(currentSelections.find((currentItem) => currentItem.key == item.key) != undefined){
                  setCurrentSelections(currentSelections.filter(currentItem => currentItem.key != item.key))
                }else{
                  if(item.amount <= 0){
                    item.amount = 1;
                    menuItems[index].amount = 1;
                  }
                  setCurrentSelections([...currentSelections, item])
                }
              }
            }
            style={styles.checkbox}
          />
          <Text style={styles.label}>{item.Item}{"\n"}{item.Description}</Text>
        </View>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(inputValue)=>{
            menuItems[index].amount = inputValue;
            let indexCheck = currentSelections.findIndex((currentItem) => currentItem.key == item.key)
            if(indexCheck != -1){
              if(inputValue <= 0){
                setCurrentSelections(currentSelections.filter(currentItem => currentItem.key != item.key))
              }else{
                currentSelections[index].amount = inputValue
                setCurrentSelections([...currentSelections])
              }
            }else{
              item.amount = inputValue;
              setCurrentSelections([...currentSelections, item])
            }
          }}
          placeholder={currentSelections.find((currentItem) => currentItem.key == item.key) ? currentSelections[currentSelections.findIndex((currentItem) => currentItem.key == item.key)].amount : item.amount}
          keyboardType="numeric"
      />
      </View>
    )}))
  }

  return(
    <View style={styles.container}>
      {GetMenuItems()}
      <Button onPress={goToCheckout} title="Checkout"></Button>
      <StatusBar style='auto'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    alignItems: 'center'
  },
  price: {
    marginLeft: 200,
    alignItems: 'right'
  },
  input: {
    marginLeft: 200,
    minWidth: '20%',
    maxWidth: 200,
    minHeight: '10%',
    maxHeight: 150,
    alignItems: 'right'
  }
});