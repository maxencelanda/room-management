import { ScrollView, SafeAreaView, TextInput, StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IP } from '@env'

export default function Reservation({ navigation, route }) {
    const [salle, setSalle] = useState([]);
    const [creneaux, setCreneaux] = useState([])
    const [error, setError] = useState('')
    const [date, setDate] = useState('')
    const [motif, setMotif] = useState('')
    const today = new Date().toJSON().slice(0, 10);
    const [dateInput, setDateInput] = useState(today)
    const [horaire, setHoraire] = useState(creneaux[0])

    const dateValid = (dateStr) => {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate());
        console.log("-")
        console.log(yesterday.getDate())
        console.log(new Date(dateStr).getDate())
        if (!isNaN(new Date(dateStr)) && new Date(dateStr).getDate() >= yesterday.getDate()){
            setDate(new Date(dateStr).toJSON().slice(0, 10))
        } else {
            setDate('')
        }
        setDateInput(dateStr)
        return dateStr
    }

    function getIdCreneauByHoraire(horaire) {
        const creneau = creneaux.find(creneau => creneau.horaire === horaire);
        return creneau ? creneau.idCreneau : null;
    }

    const reserver = async () => {
        if (date != ''){
            const horaires = creneaux.map(creneau => creneau.horaire)
            if (horaires.includes(horaire)){
                const idCreneau = getIdCreneauByHoraire(horaire)
                if (idCreneau){
                    try {
                        const headers = {headers: {Authorization: `Bearer ${route.params.token}`}}
                        const salleId = route.params.salleId
                        const body = {description: motif, dateReservation: date, idSalle: salleId, idCreneau: idCreneau}
                        const response = await axios.post(`http://${IP}:3000/reservation/create`, body, headers)
                        console.log(response.data)
                    } catch (error) {
                        console.error("Error before logging body:", error);
                    }
                }
            }
        } else {
            console.log(dateInput)
            setError("Date non valide")
        }
    }

    useEffect(() => {
      const fetchData = async () => {
        const headers = {headers: {Authorization: `Bearer ${route.params.token}`}}
        const salleResponse = await axios.get(`http://${IP}:3000/salles/${route.params.salleId}`, headers)
        setSalle(await salleResponse.data[0]);
        const creneauxResponse = await axios.get(`http://${IP}:3000/creneaux/all`, headers)
        setCreneaux(await creneauxResponse.data)
        //console.log(creneauxData)
      }
      fetchData()
  }, [])

  return (
    <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Réservation {salle["nom"]}</Text>
        </View>
      <Text style={styles.error}>{error}</Text>
        <SafeAreaView>
        <TextInput
            style={styles.input}
            onChangeText={dateValid}
            value={dateInput}
            placeholder="AAAA-MM-JJ"
            placeholderTextColor={'white'}
        />
        <TextInput
            style={styles.input}
            onChangeText={setHoraire}
            value={horaire}
            placeholder="Ex: 8:00 - 9:00"
            placeholderTextColor={'white'}
        />
        <TextInput
            style={styles.input}
            onChangeText={setMotif}
            value={motif}
            placeholder={"Motif"}
            placeholderTextColor={'white'}
        />
        <Button title='reserver' onPress={reserver}>Réserver</Button>
        </SafeAreaView>
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
  input: {
    color: '#fff',
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
  salle: {
    marginTop: '10%',
    color: '#fff',
  }
});
