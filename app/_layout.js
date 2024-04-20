import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const unstable_settings = {
  initialRouteName: "home",
};

const Layout = () => {
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack initialRouteName="home">
        <Stack.Screen name="home" />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;
