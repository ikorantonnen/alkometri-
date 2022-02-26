import {  Text,TextInput, View, Button, } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';

export default function App() {

  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(0);
  const [balvl, setBalvl] = useState(0);
 
  const [time, setTime] = useState(0);
  const h= Array(24)
  .fill('')
  .map((_,i) => ({label: `${i +1} h`,value: `${i + 1}`}));
 
  const [bottle, setBottle] = useState(0);
  const bottles = Array(48)
  .fill('')
  .map((_,i) => ({label: `${i +1} bottle`,value: `${i + 1}`}));
   
  const genders = [
    {label: 'female', value: 'female' },
    {label: 'male', value: 'male' } 
  ];

  function formula() {
  let litre = bottle * 0.33;
  let grams = litre * 8 * 4.5;
  let burning = weight / 10;
  let lgrams =grams - (burning  * time);
  let result = 0;
 
   if (gender === 'male') {
    result = lgrams / (weight * 0.7);
  }
    else {
     result = lgrams / (weight * 0.6);
   }
    setBalvl(result);
  }
  
  return (
  <View style={styles.container}>
    <View>
      <Text style={styles.headline}>Alcometer</Text>
    </View>

    <View style={styles.field}>
      <Text style={styles.aligncenter}>Botless</Text>
      <Picker
      onValueChange={(itemValue) => setBottle(itemValue) }
      selectedValue={bottle}
      >
        {bottles.map((bottle,index) => (
        <Picker.Item key={index} label={bottle.label} value={bottle.value}/>
        ))}
        </Picker>
    </View>

    <View style={styles.field}>
      <Text style={styles.aligncenter}>Time</Text>
      <Picker 
      onValueChange={(itemValue) => setTime(itemValue) }
      selectedValue={time}
      >
        {h.map((time,index) => (
        <Picker.Item key={index} label={time.label} value={time.value}/>
        ))}
        </Picker>
    </View>
    <View style={styles.centre}>
      <Text style={styles.aligncenter}>Weight</Text>
      <TextInput
      onChangeText={text => setWeight(text)}
      placeholder='in kilograms'
      keyboardType='numeric'
      >
      </TextInput>
    </View>
    <View style={styles.centre}>
      <Text style={styles.aligncenter}>Gender</Text>
      <RadioForm 
        radio_props={genders}
        initial={0}
        onPress={(value) => {setGender({value})}}
      />
    </View >
    <View style={styles.centre}>
      <Button onPress={formula} title="Calculate"></Button>
      <Text style={styles.ans}>{balvl.toFixed(2)}</Text>
      </View>
  </View>
  );
}
