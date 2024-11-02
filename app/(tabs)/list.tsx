import { useFonts } from 'expo-font';
// import { useFonts } from '@/expo-google-fonts/inter';
import React from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet } from "react-native";
import data from "@/constants/dataEx.json";
import { Item } from "@/components/item";

SplashScreen.preventAutoHideAsync();

export default function List() {
  const [loaded, error] = useFonts({
    'comic': require('../../assets/fonts/ComicNeue-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Text style={styles.title}>Lista</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item  image={item.image} nome={item.nome} idade={item.idade} data={item.data} />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 30,
  },

});
