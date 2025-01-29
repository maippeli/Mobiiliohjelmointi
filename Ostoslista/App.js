import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (item.trim()) {
      setShoppingList([...shoppingList, item]);
      setItem('');
    }
  };

  const clearList = () => {
    setShoppingList([]);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, marginTop: StatusBar.currentHeight || 0 }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
          textAlign: 'center',
        }}
        placeholder="Enter item"
        value={item}
        onChangeText={setItem}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        <Button title="Add" onPress={addItem} />
        <Button title="Clear" onPress={clearList} />
      </View>

      <Text style={{ fontSize: 22, marginBottom: 10, textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>
        Shopping List
      </Text>

      <FlatList
        data={shoppingList}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, padding: 5, textAlign: 'center' }}>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}