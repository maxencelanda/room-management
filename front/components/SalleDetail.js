import { ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SalleDetail({ navigation, route }) {
    const [salle, setSalle] = useState([]);
    const [reservations, setReservations] = useState([])
    const [creneaux, setCreneaux] = useState([])
    const today = new Date().toJSON().slice(0, 10);
    const todayFormat = new Date().toDateString()

    useEffect(() => {
      const fetchData = async () => {
        const salleResponse = await axios.get(`http://10.60.136.210:3000/salles/${route.params.salleId}`)
        setSalle(salleResponse.data[0]);
        const reservationResponse = await axios.get(`http://10.60.136.210:3000/reservation/${route.params.salleId}`)
        setReservations(reservationResponse.data);
        const creneauResponse = await axios.get(`http://10.60.136.210:3000/creneaux/all`)
        setCreneaux(creneauResponse.data);
      }
      fetchData()
  }, [])

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.title}>{salle["nom"]}</Text>
      </View>
      <ScrollView>
        <Text style={styles.title}>{todayFormat}</Text>
        {
          creneaux.map((creneau, i) => (
            <View style={styles.reservationContainer}>
            <Text key={i} style={styles.salle}>{creneau["horaire"]}</Text>
            {
              reservations.filter(reservation => today == reservation["dateReservation"] && creneau["idCreneau"] == reservation["idCreneau"]).length > 0 ?
              (
              <View key={i+1000} style={styles.reservationInfos}>
                <Text style={styles.salle}>Réservé</Text>
                <Text style={styles.salle}>{reservations[i]["description"]}</Text>
              </View>)
              :
              <Text key={i+2000} style={styles.salle}>Disponible</Text>
            }
            </View>
          )
        )}
      </ScrollView>
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
  },
  reservationInfos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  reservationContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});
