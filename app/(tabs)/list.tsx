import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

// Definindo a interface para o usuário
interface User {
    id: string;
    name: string;
}

export default function List() {
    const [users, setUsers] = useState<User[]>([]); // Define o tipo de users
    const [newUser, setNewUser] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(FIRESTORE_DB, "users"), (snapshot) => {
            const userList: User[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
            setUsers(userList);
        });

        return () => unsubscribe();
    }, []);

    const addUser = async () => {
        if (newUser.trim() === "") {
            Alert.alert("Por favor, insira um nome.");
            return;
        }
        await addDoc(collection(FIRESTORE_DB, "users"), { name: newUser });
        setNewUser('');
    };

    const deleteUser = async (id: string) => {
        await deleteDoc(doc(FIRESTORE_DB, "users", id));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => deleteUser(item.id)}>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    deleteButton: {
        color: 'red',
    },
});