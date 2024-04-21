import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons, Entypo, Foundation } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { COLORS } from "../../../constants";

const CustomTabs = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopColor: "#ccc",
        },
        headerStyle: {
          backgroundColor: COLORS.lightWhite,
          borderBottomColor: COLORS.lightWhite,
        },
        headerShown: true,
        headerLeft: () => <DrawerToggleButton tintColor="#000" />,
      }}
    >
      <Tabs.Screen
        name="airing"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="live-tv" size={24} color={color} />
          ),
          tabBarLabel: "Airing",
          headerTitle: "",
          headerRight: () => <View></View>,
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="burst-new" size={24} color={color} />
          ),
          tabBarLabel: "Upcoming",
          headerTitle: "",
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="archive" size={24} color={color} />
          ),
          tabBarLabel: "Completed",
          headerTitle: "",
        }}
      />
    </Tabs>
  );
};

export default function Layout() {
  return <CustomTabs />;
}
