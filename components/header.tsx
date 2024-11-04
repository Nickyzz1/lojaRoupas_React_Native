import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";

export const Header = () => {
  return (
    <View style={styles.bg}>
      <Image
        source={require('@/assets/images/icons8-loja-100.png')}
        style={styles.img}
        resizeMode="contain" // Use "contain" para manter as proporções
      />
      <Text style={styles.txt}>Morgana</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#4F1077FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  img: {
    height: 50, 
    width: 50, 
    marginRight: 10,
  },
  txt: {
    color: "#FFFFFFFF",
    fontWeight: "500",
    fontSize: 20,
    fontFamily: 'ComicNeue-Regular.ttf',
  },
});
