import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1-100');
  const [guessCount, setGuessCount] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = () => {
    const numericGuess = parseInt(guess);

    if (isNaN(numericGuess)) {
      setMessage('Please enter a valid number');
      return;
    }

    setGuessCount(guessCount + 1);

    if (numericGuess < randomNumber) {
      setMessage(`Your guess ${numericGuess} is too low`);
    } else if (numericGuess > randomNumber) {
      setMessage(`Your guess ${numericGuess} is too high`);
    } else {
      Alert.alert(
        'Congratulations!',
        `You guessed the number in ${guessCount + 1} guesses!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setRandomNumber(Math.floor(Math.random() * 100) + 1);
              setGuess('');
              setMessage('Guess a number between 1-100');
              setGuessCount(0);
            },
          },
        ]
      );
    }
    setGuess('');
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{message}</Text>

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginBottom: 20,
        }}
        keyboardType="numeric"
        placeholder="Enter your guess"
        value={guess}
        onChangeText={setGuess}
      />

      <Button title="Make Guess" onPress={handleGuess} />
    </SafeAreaView>
  );
}