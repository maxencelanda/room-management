import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Salles({ navigation, route }) {
    const [etages, setEtages] = useState([]);
    const [salles, setSalles] = useState([]);

    useEffect(() => {
      console.log(route.params.token)
      const fetchData = async () => {
        const etagesResponse = await axios.get(`http://10.60.136.210:3000/etages/all`, {headers: {Authorization: `Bearer ${route.params.token}`}})
        setEtages(etagesResponse.data)
        const sallesResponse = await axios.get(`http://10.60.136.210:3000/salles/all`, {headers: {Authorization: `Bearer ${route.params.token}`}})
        setSalles(sallesResponse.data);
      }
      fetchData()
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
              <Button
                key={x}
                style={styles.salle}
                title={salle["nom"]}
                onPress={() =>
                  navigation.navigate('SalleDetail', {token: route.params.token, salleId: salle["idSalle"]})
                }
              />
            ))}
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#080110',
    height: "100%",
  },
  header: {
    backgroundColor: '#8846DD',
  },
  title: {
    textAlign: 'center',
    marginTop: '10%',
    color: '#fff',
  },
  salle: {
    marginTop: '10%',
    color: '#fff',
  }
});
