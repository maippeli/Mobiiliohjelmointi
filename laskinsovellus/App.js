import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (text, setter) => {
    const validatedText = text.replace(/[^0-9.]/g, '');
    setter(validatedText);
  };

  const handleAddition = () => {
    setResult(parseFloat(number1) + parseFloat(number2));
  };

  const handleSubtraction = () => {
    setResult(parseFloat(number1) - parseFloat(number2));
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, marginTop: StatusBar.currentHeight || 0 }}>
      <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
        Result: {result !== null ? result : ''}
      </Text>

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginBottom: 20,
        }}
        keyboardType="numeric"
        placeholder="Enter first number"
        value={number1}
        onChangeText={(text) => handleInputChange(text, setNumber1)}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginBottom: 20,
        }}
        keyboardType="numeric"
        placeholder="Enter second number"
        value={number2}
        onChangeText={(text) => handleInputChange(text, setNumber2)}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="+" onPress={handleAddition} />
        <Button title="-" onPress={handleSubtraction} />
      </View>
    </SafeAreaView>
  );
}