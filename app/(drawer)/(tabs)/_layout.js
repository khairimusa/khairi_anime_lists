import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { MaterialIcons, Entypo, Foundation } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

const CustomTabs = (props) => {
  return (
    <Tabs
      screenOptions={{
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
          headerTitle: "Airing Shows",
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
          headerTitle: "Upcoming Shows",
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="archive" size={24} color={color} />
          ),
          tabBarLabel: "Completed",
          headerTitle: "Completed Shows",
        }}
      />
    </Tabs>
  );
};

export default function Layout() {
  return <CustomTabs />;
}
