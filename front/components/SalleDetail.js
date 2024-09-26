import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IP } from '@env'

export default function SalleDetail({ navigation, route }) {
    const [salle, setSalle] = useState([]);
    const [creneaux, setCreneaux] = useState([])
    const [idRole, setIdRole] = useState(0)
    const today = new Date().toJSON().slice(0, 10);
    const todayFormat = new Date().toDateString()

    useEffect(() => {
      const fetchData = async () => {
        const headers = {headers: {Authorization: `Bearer ${route.params.token}`}}
        const salleResponse = await axios.get(`http://${IP}:3000/salles/${route.params.salleId}`, headers)
        setSalle(await salleResponse.data[0]);
        const creneauxResponse = await axios.get(`http://${IP}:3000/reservation/${route.params.salleId}/${today}`, headers)
        setCreneaux(await creneauxResponse.data);
        const idRoleResponse = await axios.get(`http://${IP}:3000/idRole/get`, headers)
        setIdRole(await idRoleResponse.data["idRole"]);
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
            <View key={i} style={styles.reservationContainer}>
              <Text style={styles.salle}>{creneau["horaire"]}</Text>
              {
                creneau["idReservation"] != null ?
                <Text style={styles.salle}>Réservé - {creneau["nom"]} - {creneau["description"]}</Text>
                :
                <Text style={styles.salle}>Disponible</Text>
              }
            </View>
          ))
        }
      </ScrollView>
      {
        idRole > 1 ?
        <Button
          style={styles.salle}
          title="Réserver"
          onPress={() =>
            navigation.navigate('Reservation', {token: route.params.token, salleId: salle["idSalle"]})
          }
        />
        : null
      }
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
