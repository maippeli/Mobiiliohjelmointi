import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      setRecipes(data.meals || []); 
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes</Text>
      <TextInput
        style={styles.input}
        placeholder="search"
        value={ingredient}
        onChangeText={setIngredient}
      />
      <Button title="FIND" onPress={fetchRecipes} />

      <View style={styles.spacing} />
      
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.recipe}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  spacing: { height: 15 },
  recipe: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  image: { width: 80, height: 80, marginRight: 10 },
  title: { fontSize: 16, },
});