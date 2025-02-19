import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null); 

  const fetchCoordinates = async () => {
    if (!address.trim()) {
      alert('Syötä ensin osoite');
      return;
    }
  
    try {
      const response = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&format=json`);
      const data = await response.json();
  
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);  
        const lon = parseFloat(data[0].lon);  
        setLocation({ latitude: lat, longitude: lon });
      } else {
        alert('Osoitetta ei löytynyt');
      }
    } catch (error) {
      alert('Virhe haettaessa koordinaatteja');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            <Marker coordinate={location} />
          </MapView>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Syötä osoite"
        value={address}
        onChangeText={(text) => setAddress(text)}
        editable={true}
      />

      <Button title="Show" onPress={fetchCoordinates} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  map: {
    flex: 1,
    marginTop: 10,
  },
  mapContainer: {
    width: '100%',
    height: 300, 
    marginBottom: 20, 
  },
});