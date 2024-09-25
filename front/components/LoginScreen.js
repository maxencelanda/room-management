import { StyleSheet, Text, View, Button, SafeAreaView, TextInput } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const connect = async () => {
        if (username != '' && password != ''){
            const response = await axios.post("http://10.60.136.210:3000/utilisateur/login", {"nom": username, "mdp": password})
            console.log(await response.data)
            navigation.navigate('Salles', {token: response.data["token"]})
        }
    }

    return (
        <View style={styles.body}>
            <View style={styles.header}>
            <Text style={styles.title}>Connexion</Text>
            </View>
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
  }
});
