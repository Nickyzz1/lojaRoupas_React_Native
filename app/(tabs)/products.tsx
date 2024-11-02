import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// Importe o JSON da pasta constants
import products from '@/constants/products.json';

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filtra os produtos com base na categoria selecionada
  const filteredProducts = products.filter((product) =>
    selectedCategory ? product.category === selectedCategory : true
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar por Categoria:</Text>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todas as Categorias" value="" />
        <Picker.Item label="Camisetas" value="Camisetas" />
        <Picker.Item label="Blusas" value="Blusas" />
        <Picker.Item label="Bermudas" value="Bermudas" />
        <Picker.Item label="Calças" value="Calças" />
        <Picker.Item label="Jaquetas de couro" value="Jaquetas de couro" />
      </Picker>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
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
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
