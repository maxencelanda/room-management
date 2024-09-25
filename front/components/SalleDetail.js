import { StyleSheet, Text, View } from 'react-native';
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
        const salleResponse = await axios.get(`http://10.60.137.63:3000/salles/${route.params.salleId}`)
        setSalle(salleResponse.data[0]);
        const reservationResponse = await axios.get(`http://10.60.137.63:3000/reservation/${route.params.salleId}`)
        setReservations(reservationResponse.data);
        const creneauResponse = await axios.get(`http://10.60.137.63:3000/creneaux/all`)
        setCreneaux(creneauResponse.data);
      }
      fetchData()
  }, [])

  return (
    <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>{salle["nom"]}</Text>
        </View>
          {
            creneaux.map((creneau, i) => (
              <View>
              <Text key={i} style={styles.salle}>{creneau["horaire"]}</Text>
              {
                reservations.filter(reservation => today == reservation["dateReservation"] && creneau["idCreneau"] == reservation["idCreneau"]).length > 0 ?
                reservations.map((reservation, x) => 
                  <Text key={x} style={styles.salle}>Réservé</Text>
                )
                :
                <Text key={i} style={styles.salle}>Disponible</Text>
              }
              </View>
            )
          )}
          {/*reservations.map((reservation, i) => 
            today == reservation["dateReservation"] ? 
            <Text key={i} style={styles.salle}>Ajd</Text>
            : <Text key={i} style={styles.salle}>Pas ajd ({reservation["dateReservation"]} vs {today})</Text>
          )
          */}
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
