import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { COLORS, icons, SIZES } from "../constants";
import { AnimeLists, ScreenHeaderBtn, Welcome } from "../components";

const Home = () => {
  const queryClient = new QueryClient();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => <View></View>,
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <QueryClientProvider client={queryClient}>
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
            }}
          >
            <Welcome />
            <AnimeLists />
          </View>
        </QueryClientProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
