import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="register"
          options={{ headerShown: false }}
        ></Stack.Screen>
        
        <Stack.Screen
          name="products"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </>
  );
}
