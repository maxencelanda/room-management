import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SalleDetail({ navigation, route }) {
    const [salle, setSalle] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const salleResponse = await axios.get(`http://10.60.137.63:3000/salles/${route.params.salleId}`)
        setSalle(salleResponse.data[0]);
      }
      fetchData()
  }, [])

  return (
    <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>{salle["nom"]}</Text>
        </View>
        <View>
          
        </View>
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
