import { StyleSheet, Text, View, Button, SafeAreaView, TextInput } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IP } from '@env'

export default function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const connect = async () => {
        if (username != '' && password != ''){
            const response = await axios.post(`http://${IP}:3000/utilisateur/login`, {"nom": username, "mdp": password})
            if (response.data["error"]){
                setError(response.data["error"])
                return;
            }
            navigation.navigate('Salles', {token: response.data["token"]})
        }
    }

    return (
        <View style={styles.body}>
            <View style={styles.header}>
            <Text style={styles.title}>Connexion</Text>
            </View>
            <Text style={styles.error}>{error}</Text>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Nom d'utilisateur"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Mot de passe"
                />
                <Button title='connexion' onPress={connect}>Connexion</Button>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
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
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
  error: {
    color: '#f33',
    textAlign: 'center',
    marginTop: 10
  }
});
