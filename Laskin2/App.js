import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StatusBar, FlatList } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]); 

  const handleInputChange = (text, setter) => {
    const validatedText = text.replace(/[^0-9.]/g, '');
    setter(validatedText);
  };

  const handleAddition = () => {
    const sum = parseFloat(number1) + parseFloat(number2);
    setResult(sum);
    updateHistory(number1, number2, "+", sum);
  };

  const handleSubtraction = () => {
    const difference = parseFloat(number1) - parseFloat(number2);
    setResult(difference);
    updateHistory(number1, number2, "-", difference);
  };

  const updateHistory = (num1, num2, operator, res) => {
    const newEntry = `${num1} ${operator} ${num2} = ${res}`;
    setHistory([...history, newEntry]); 
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
          borderRadius: 5,
          textAlign: 'center', 
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
          borderRadius: 5,
          textAlign: 'center', 
        }}
        keyboardType="numeric"
        placeholder="Enter second number"
        value={number2}
        onChangeText={(text) => handleInputChange(text, setNumber2)}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <Button title="+" onPress={handleAddition} />
        <Button title="-" onPress={handleSubtraction} />
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>History</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 16, padding: 5 }}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}