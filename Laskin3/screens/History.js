import React from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';

export default function History({ route }) {
  const { history } = route.params; 

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, marginTop: StatusBar.currentHeight || 0 }}>
      <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
        History
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 16, paddingVertical: 2, textAlign: 'center' }}>{item}</Text>
        )}
      />
    </SafeAreaView>
  );
}