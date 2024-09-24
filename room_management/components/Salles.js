import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Salles() {
    const [etages, setEtages] = useState([]);
    const [salles, setSalles] = useState([]);

    useEffect(() => {
        axios.get('http://10.60.136.157:3000/etages/all')
        .then(function (response) {
          console.log(response.data);
          setEtages(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });   
        axios.get('http://10.60.136.157:3000/salles/all')
        .then(function (response) {
            console.log(response.data);
            setSalles(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
  }, [])

  return (
    <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Salles</Text>
        </View>
        {etages.map((etage, i) => (
          <View key={i}>
            <Text style={styles.title}>{etage["nom"]}</Text>
            {salles.filter(salle => salle["idEtage"] == etage["idEtage"]).map((salle, x) => (
              <Text key={x} style={styles.salle}>{salle["nom"]}</Text>
            ))}
          </View>
        ))}
    </View>
  )
}
