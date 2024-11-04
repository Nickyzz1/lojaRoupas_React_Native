import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from "react-native";
import { FIRESTORE_DB } from "@/firebaseConfig"; 
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

// Definindo a interface para o usuário
interface User {
    id: string;
    name: string;
}

export default function HomeScreen() {
    const [shirtsTb, setShirtsTb] = useState<User[]>([]); // se nn existir cria a tabela
    const [nameShirt, setNameShirt] = useState('');
    const [sizeShirt, setSizeShirt] = useState('');
    const [priceShirt, setPriceShirt] = useState('');
    const [urlShirt, setUrlShirt] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(FIRESTORE_DB, "tbShirts"), (snapshot) => {
            const shirtsList: User[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
            setShirtsTb(shirtsList);
        });

        return () => unsubscribe();
    }, []);

    const addShirt = async () => {
        if (nameShirt.trim() === "") {
            Alert.alert("Por favor, insira um nome.");
            return;
        }
        await addDoc(collection(FIRESTORE_DB, "tbShirts"), { name: nameShirt, size: sizeShirt, price: priceShirt, url: urlShirt });
        setNameShirt(''), setSizeShirt(''), setPriceShirt(''), setUrlShirt('');
    };

    const deleteShirt = async (id: string) => {
        await deleteDoc(doc(FIRESTORE_DB, "tbShirts", id));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite um título"
                value={nameShirt}
                onChangeText={setNameShirt}
            />

          <TextInput
                style={styles.input}
                placeholder="Digite o tamanho"
                value={sizeShirt}
                onChangeText={setSizeShirt}
            />
            <TextInput
                style={styles.input}
                placeholder="Digite o preço"
                value={priceShirt}
                onChangeText={setPriceShirt}
            />
            <TextInput
                style={styles.input}
                placeholder="Cole aqui a URL da imagem do produto"
                value={urlShirt}
                onChangeText={setUrlShirt}
            />
            <TouchableOpacity style={styles.button} onPress={addShirt}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>

            <FlatList
                data={shirtsTb}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>

                      <View style={styles.obj}>
                        <img src={item.url} alt="" style={ styles.img} />
                       <Text>{item.name}</Text>
                       </View>
                       
                        <TouchableOpacity onPress={() => deleteShirt(item.id)}>
                            <Text style={styles.deleteButton}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      height: 40,
      paddingHorizontal: 10,
      marginBottom: 10,
  },
  button: {
      backgroundColor: '#4b6beb',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
  },
  buttonText: {
      color: '#fff',
  },
  userItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', 
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
  userName: {
      flex: 1, 
      marginLeft: 10,
  },
  deleteButton: {
      color: 'red',
  },
  img: {
      width:'auto', 
      height: 100,
  },
  obj : 
  {
    flexDirection:'row',
    alignItems:"center",
    gap: 20
  }

});