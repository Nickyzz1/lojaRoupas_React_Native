import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { FIRESTORE_DB } from "@/firebaseConfig"; 
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";

// Definindo a interface para o usuário
interface shorts {
    id: string;
    name: string;
    size: string;
    price: string;
    url: string;
}

export default function shorts() {
    const [shortsTb, setShortsTb] = useState<shorts[]>([]);
    const [nameShorts, setNameShorts] = useState('');
    const [sizeShorts, setSizeShorts] = useState('');
    const [priceShorts, setPriceShorts] = useState('');
    const [urlShorts, setUrlShorts] = useState('');
    const [editingShorts, setEditingShorts] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(FIRESTORE_DB, "tbShorts"), (snapshot) => {
            const ShortsList: shorts[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as shorts[];
            setShortsTb(ShortsList);
        });

        return () => unsubscribe();
    }, []);

    const add = async () => {
        if (nameShorts.trim() === "") {
            Alert.alert("Por favor, insira um nome.");
            return;
        }
        await addDoc(collection(FIRESTORE_DB, "tbShorts"), { name: nameShorts, size: sizeShorts, price: priceShorts, url: urlShorts });
        clearForm();
    };

    const deleteShorts = async (id: string) => {
        await deleteDoc(doc(FIRESTORE_DB, "tbShorts", id));
    };

    const updateShorts = async () => {
        if (!editingShorts) return;

        await updateDoc(doc(FIRESTORE_DB, "tbShorts", editingShorts), {
            name: nameShorts,
            size: sizeShorts,
            price: priceShorts,
            url: urlShorts,
        });

        clearForm();
        setModalVisible(false);
    };

    const clearForm = () => {
        setNameShorts('');
        setSizeShorts('');
        setPriceShorts('');
        setUrlShorts('');
        setEditingShorts(null);
    };

    const openEditModal = (s: shorts) => {
        setNameShorts(s.name);
        setSizeShorts(s.size);
        setPriceShorts(s.price);
        setUrlShorts(s.url);
        setEditingShorts(s.id);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Adicione bermudas aqui</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite um título"
                    value={nameShorts}
                    onChangeText={setNameShorts}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o tamanho"
                    value={sizeShorts}
                    onChangeText={setSizeShorts}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o preço"
                    value={priceShorts}
                    onChangeText={setPriceShorts}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cole aqui a URL da imagem do produto"
                    value={urlShorts}
                    onChangeText={setUrlShorts}
                />
                <TouchableOpacity style={styles.button} onPress={add}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={shortsTb}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <img src={item.url} alt="" style={ styles.img} />
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => openEditModal(item)}>
                            <Text style={styles.editButton}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteShorts(item.id)}>
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
                        <Text style={styles.modalTitle}>Editar bermuda</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite um título"
                            value={nameShorts}
                            onChangeText={setNameShorts}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o tamanho"
                            value={sizeShorts}
                            onChangeText={setSizeShorts}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o preço"
                            value={priceShorts}
                            onChangeText={setPriceShorts}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cole aqui a URL da imagem do produto"
                            value={urlShorts}
                            onChangeText={setUrlShorts}
                        />
                        <View style={styles.space}>
                            <TouchableOpacity style={styles.button} onPress={updateShorts}>
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
