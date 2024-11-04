import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { FIRESTORE_DB } from "@/firebaseConfig"; 
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";

// Definindo a interface para o usuário
interface pants {
    id: string;
    name: string;
    size: string;
    price: string;
    url: string;
}

export default function pants() {
    const [pantsTb, setPantsTb] = useState<pants[]>([]);
    const [namePants, setNamePants] = useState('');
    const [sizePants, setSizePants] = useState('');
    const [pricePants, setPricePants] = useState('');
    const [urlPants, setUrlPants] = useState('');
    const [editingPants, setEditingPants] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(FIRESTORE_DB, "tbPants"), (snapshot) => {
            const pantsList: pants[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as pants[];
            setPantsTb(pantsList);
        });

        return () => unsubscribe();
    }, []);

    const add = async () => {
        if (namePants.trim() === "") {
            Alert.alert("Por favor, insira um nome.");
            return;
        }
        await addDoc(collection(FIRESTORE_DB, "tbPants"), { name: namePants, size: sizePants, price: pricePants, url: urlPants });
        clearForm();
    };

    const deletePants = async (id: string) => {
        await deleteDoc(doc(FIRESTORE_DB, "tbPants", id));
    };

    const updateJacket = async () => {
        if (!editingPants) return;

        await updateDoc(doc(FIRESTORE_DB, "tbPants", editingPants), {
            name: namePants,
            size: sizePants,
            price: pricePants,
            url: urlPants,
        });

        clearForm();
        setModalVisible(false);
    };

    const clearForm = () => {
        setNamePants('');
        setSizePants('');
        setPricePants('');
        setUrlPants('');
        setEditingPants(null);
    };

    const openEditModal = (s: pants) => {
        setNamePants(s.name);
        setSizePants(s.size);
        setPricePants(s.price);
        setUrlPants(s.url);
        setEditingPants(s.id);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Adicione calças aqui</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite um título"
                    value={namePants}
                    onChangeText={setNamePants}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o tamanho"
                    value={sizePants}
                    onChangeText={setSizePants}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o preço"
                    value={pricePants}
                    onChangeText={setPricePants}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cole aqui a URL da imagem do produto"
                    value={urlPants}
                    onChangeText={setUrlPants}
                />
                <TouchableOpacity style={styles.button} onPress={add}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={pantsTb}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <img src={item.url} alt="" style={ styles.img} />
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => openEditModal(item)}>
                            <Text style={styles.editButton}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletePants(item.id)}>
                            <Text style={styles.deleteButton}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar calça</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite um título"
                            value={namePants}
                            onChangeText={setNamePants}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o tamanho"
                            value={sizePants}
                            onChangeText={setSizePants}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o preço"
                            value={pricePants}
                            onChangeText={setPricePants}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cole aqui a URL da imagem do produto"
                            value={urlPants}
                            onChangeText={setUrlPants}
                        />
                        <View style={styles.space}>
                            <TouchableOpacity style={styles.button} onPress={updateJacket}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        backgroundColor: '#4F1077FF',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
    userItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', 
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopColor: '#ccc',
        flexWrap: "wrap",
        gap: 10,
        margin: 12,
        borderRadius: 10
    },
    space : {
        gap: 5
    },
    deleteButton: {
        color: "#FFFFFFFF",
        backgroundColor: '#e4605e',
        padding: 10,
        borderRadius: 10,
    },
    editButton: {
        color: '#007BFF',
        padding: 10,
    },
    img: {
        width: 'auto', 
        height: 100,
        borderRadius: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        margin: 12,
    },
    box: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cancelButton: {
        backgroundColor: '#e4605e',
    },
});
