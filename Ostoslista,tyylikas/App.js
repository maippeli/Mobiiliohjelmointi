import * as React from 'react';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Provider as PaperProvider, Text, TextInput, Button, Card, Title } from 'react-native-paper';

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
    <PaperProvider>
      <View style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f6f6f6' }}>
        <TextInput
          label="Enter item"
          value={item}
          onChangeText={setItem}
          mode="outlined"
          style={{ marginBottom: 20 }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
          <Button mode="contained" onPress={addItem}>
            Add
          </Button>
          <Button mode="outlined" onPress={clearList}>
            Clear
          </Button>
        </View>

        <Title style={{ textAlign: 'center', marginBottom: 10 }}>Shopping List</Title>

        <FlatList
          data={shoppingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 10 }}>
              <Card.Content>
                <Text>{item}</Text>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </PaperProvider>
  );
}