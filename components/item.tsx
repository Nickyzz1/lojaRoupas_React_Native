import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

export const Item = ({ nome, idade, data, image}: { nome: string; idade: string; data: string; image: string}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View style={styles.container} >
      <TouchableOpacity
      style={[styles.list, isHovered && styles.hovered]}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
    >
        <Text style={styles.txtNome}>{nome}</Text>
        <Text style={styles.txt}>{idade}</Text>
        <Text style={styles.txt}>{data}</Text>
        <Image style={styles.imageStyle} source={image}/>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#252525",
    margin: 10,
    height: 200,
    minHeight: "auto",
    minWidth: "auto",
    width: 300,
    justifyContent: "center",
    borderRadius: 10,
  },
  txtNome : {
    color: "#D16363FF"
  },
  hovered: {
    backgroundColor: "#B40808FF", 
    transform: "scale[1.1]"
  },
  txt: {
    color: "#ffffff",
    fontFamily: 'comic'
  },
  imageStyle:
  {
    width: 30,
    height: 30
  },
  container:
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
