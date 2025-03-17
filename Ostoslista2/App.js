import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { setupDatabase, insertItem, getItems, deleteItem } from './database';

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    async function initDB() {
      await setupDatabase();
      loadItems();
    }
    initDB();
  }, []);

  const loadItems = async () => {
    await getItems(setShoppingList);
  };

  const addItem = async () => {
    if (product.trim() && amount.trim()) {
      await insertItem(product, amount, () => {
        setProduct('');
        setAmount('');
        loadItems();
      });
    }
  };

  const removeItem = async (id) => {
    await deleteItem(id, () => loadItems());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ostoslista</Text>

      <TextInput
        style={styles.input}
        placeholder="Tuote"
        value={product}
        onChangeText={setProduct}
      />
      <TextInput
        style={styles.input}
        placeholder="Määrä"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Lisää" onPress={addItem} />

      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.product} - {item.amount}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={styles.bought}>[Ostettu]</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
  bought: { color: 'red', fontWeight: 'bold' }
});