import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { Header } from "@/components/header";

export default function TabLayout() {
  return (
    <>
      <Header image={require("../../assets/images/react-logo.png")} />

      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <>
                <Text>👚</Text>
              </>
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="jacket"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <>
                <Text>🧥</Text>
              </>
            ),
          }}
        ></Tabs.Screen>

      <Tabs.Screen
          name="pants"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <>
                <Text>👖</Text>
              </>
            ),
          }}
        ></Tabs.Screen>

    <Tabs.Screen
          name="shorts"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <>
                <Text>🩳</Text>
              </>
            ),
          }}
        ></Tabs.Screen>

      </Tabs>
    </>
  );
}
