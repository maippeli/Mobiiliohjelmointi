import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const API_KEY = "0XfCJNj31mw80ilXPr8a10QYAnaiUJsL";
const API_URL = `https://api.apilayer.com/exchangerates_data/latest?base=EUR`;

export default function App() {
  const [currencies, setCurrencies] = useState([]); 
  const [selectedCurrency, setSelectedCurrency] = useState(""); 
  const [exchangeRates, setExchangeRates] = useState({}); 
  const [amount, setAmount] = useState(""); 
  const [convertedAmount, setConvertedAmount] = useState(""); 

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "apikey": API_KEY,
          },
        });

        const data = await response.json();

        if (data.rates) {
          setExchangeRates(data.rates);
          setCurrencies(Object.keys(data.rates));
        } else {
          console.error("API response missing:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertToEuros = () => {
    if (!selectedCurrency || !amount) return;
    const rate = exchangeRates[selectedCurrency];
    if (!rate) {
      setConvertedAmount("Invalid currency");
      return;
    }
    const result = (parseFloat(amount) / rate).toFixed(2);
    setConvertedAmount(`${amount} ${selectedCurrency} ≈ ${result} EUR`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Euromuunnin</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Picker
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select currency" value="" />
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <Button title="Convert" onPress={convertToEuros} />

      {convertedAmount ? <Text style={styles.result}>{convertedAmount}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  picker: { height: 50, width: "40%", marginBottom: 10, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, width: "40%", textAlign: "center" },
  result: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 20 },
});