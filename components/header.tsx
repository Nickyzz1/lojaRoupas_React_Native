// import {Text, ImageSourcePropType, Image, View, StyleSheet} from "react-native";

import React from "react";
import { Text } from "react-native";
import { ImageSourcePropType } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export const Header = ({ image }: { image: ImageSourcePropType }) => {
  return (
    <>
      <View style={styles.bg}>
        {/* <Image source={image} style={styles.img} /> */}
        <Text style={styles.txt}>Morgana</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#252525",
    justifyContent: "center",
    // alignItems: "center",
    display: "flex",
    flexDirection: "row",
    // paddingHorizontable: 10,
    paddingVertical: 10,
  },
  img: 
  {
    alignSelf: "flex-start",
    height: 20,
 
  },
  txt: {
    color: "#E77E7EFF",
    fontWeight: "500",
    fontSize: 20,
    fontFamily: 'ComicNeue-Regular.ttf', // Substitua pelo nome correto da fonte
  }
});


