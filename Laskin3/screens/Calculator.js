import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StatusBar } from 'react-native';

export default function Calculator({ navigation }) {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]); 

  const handleAddition = () => {
    const sum = parseFloat(number1) + parseFloat(number2);
    setResult(sum);
    setHistory([...history, `${number1} + ${number2} = ${sum}`]);
  };

  const handleSubtraction = () => {
    const difference = parseFloat(number1) - parseFloat(number2);
    setResult(difference);
    setHistory([...history, `${number1} - ${number2} = ${difference}`]);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, marginTop: StatusBar.currentHeight || 0 }}>
      <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
        Result: {result !== null ? result : ''}
      </Text>

      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
        placeholder="Enter first number"
        value={number1}
        onChangeText={setNumber1}
      />

      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
        placeholder="Enter second number"
        value={number2}
        onChangeText={setNumber2}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 5 }}>
        <Button title="+" onPress={handleAddition} />
        <Button title="-" onPress={handleSubtraction} />
        <Button title="History" onPress={() => navigation.navigate('History', { history })} />
      </View>

    </SafeAreaView>
  );
}