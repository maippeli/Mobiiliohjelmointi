import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { fetchAddresses, deleteAddress, clearHistory } from './database';

export default function History() {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    const items = await fetchAddresses();
    setHistory(items);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    await deleteAddress(id);
    loadHistory();
  };

  const handleClear = () => {
    Alert.alert('Varmistus', 'Tyhjennetäänkö koko historia?', [
      { text: 'Peruuta' },
      { text: 'Tyhjennä', onPress: async () => {
        await clearHistory();
        loadHistory();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.address}
              right={() => (
                <Button onPress={() => handleDelete(item.id)}>Poista</Button>
              )}
            />
          </Card>
        )}
      />

      {history.length > 0 && (
        <Button mode="outlined" onPress={handleClear} style={{ marginTop: 20 }}>
          Tyhjennä koko historia
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  card: {
    marginBottom: 10,
  },
});