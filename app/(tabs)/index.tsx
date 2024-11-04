import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { FIRESTORE_DB } from "@/firebaseConfig"; 
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";

// Definindo a interface para o usuário
interface shirts {
    id: string;
    name: string;
    size: string;
    price: string;
    url: string;
}

export default function shirts() {
    const [shirtTb, setShirtTb] = useState<shirts[]>([]);
    const [nameShirt, setNameShirt] = useState('');
    const [sizeShirt, setSizeShirt] = useState('');
    const [priceShirt, setPriceShirt] = useState('');
    const [urlShirt, setUrlShirt] = useState('');
    const [editingShirt, setEditingShirt] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(FIRESTORE_DB, "tbShirts"), (snapshot) => {
            const jacketsList: shirts[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as shirts[];
            setShirtTb(jacketsList);
        });

        return () => unsubscribe();
    }, []);

    const addJackets = async () => {
        if (nameShirt.trim() === "") {
            Alert.alert("Por favor, insira um nome.");
            return;
        }
        await addDoc(collection(FIRESTORE_DB, "tbShirts"), { name: nameShirt, size: sizeShirt, price: priceShirt, url: urlShirt });
        clearForm();
    };

    const deleteJackets = async (id: string) => {
        await deleteDoc(doc(FIRESTORE_DB, "tbShirts", id));
    };

    const updateJacket = async () => {
        if (!editingShirt) return;

        await updateDoc(doc(FIRESTORE_DB, "tbShirts", editingShirt), {
            name: nameShirt,
            size: sizeShirt,
            price: priceShirt,
            url: urlShirt,
        });

        clearForm();
        setModalVisible(false);
    };

    const clearForm = () => {
        setNameShirt('');
        setSizeShirt('');
        setPriceShirt('');
        setUrlShirt('');
        setEditingShirt(null);
    };

    const openEditModal = (s: shirts) => {
        setNameShirt(s.name);
        setSizeShirt(s.size);
        setPriceShirt(s.price);
        setUrlShirt(s.url);
        setEditingShirt(s.id);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Adicione camisas/camisetas aqui</Text>
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
                <TouchableOpacity style={styles.button} onPress={addJackets}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={shirtTb}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <img src={item.url} alt="" style={ styles.img} />
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => openEditModal(item)}>
                            <Text style={styles.editButton}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteJackets(item.id)}>
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
                        <Text style={styles.modalTitle}>Editar Camisa</Text>
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
