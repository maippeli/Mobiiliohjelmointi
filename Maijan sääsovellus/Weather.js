import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button, Card, Title, Text } from 'react-native-paper';
import { OPENWEATHER_API_KEY, GEOCODE_API_KEY } from '@env';
import { setupDatabase, saveAddress } from './database';

export default function Weather({ navigation }) {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setupDatabase();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sijainnin käyttö estetty', 'Salli sijainti asetuksista.');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };
      setLocation(coords);
      fetchWeather(coords.latitude, coords.longitude);
    })();
  }, []);

  const fetchCoordinates = async () => {
    if (!address.trim()) {
      alert('Syötä ensin osoite');
      return;
    }

    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${encodeURIComponent(address)}, Suomi&api_key=${GEOCODE_API_KEY}&format=json`
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setLocation({ latitude: lat, longitude: lon });
        fetchWeather(lat, lon);
        await saveAddress(address);
      } else {
        alert('Osoitetta ei löytynyt');
      }
    } catch (error) {
      alert('Virhe haettaessa koordinaatteja');
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fi&appid=${OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name
      });
    } catch (error) {
      alert('Virhe haettaessa säätietoa');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button mode="outlined" onPress={() => navigation.navigate('Historia')} style={{ marginBottom: 10 }}>
        Näytä hakuhistoria
      </Button>

      <TextInput
        style={styles.input}
        placeholder="Syötä osoite"
        value={address}
        onChangeText={setAddress}
      />
      <Button mode="contained" onPress={fetchCoordinates} style={{ marginBottom: 10 }}>
        Hae sää
      </Button>

      {location && (
        <MapView
          style={styles.map}
          region={{
            ...location,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          <Marker coordinate={location} />
        </MapView>
      )}

      {weather && (
        <Card style={{ padding: 10, marginTop: 20 }}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Title>{weather.city}</Title>
            <Image
              source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
              style={{ width: 80, height: 80 }}
            />
            <Text style={{ fontSize: 20 }}>{weather.temp} °C</Text>
            <Text style={{ textTransform: 'capitalize' }}>{weather.desc}</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
});