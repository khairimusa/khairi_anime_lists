import { View, SafeAreaView, Text } from "react-native";
import { Stack } from "expo-router";
import { ScreenHeaderBtn, Welcome, AnimeLists } from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import useStore from "../../../../utils/store";
import { useEffect } from "react";
import useGetCompletedAnime from "../../../../hook/useGetCompletedAnime";

export default function Page() {
  const { completedLists, setCompletedLists } = useStore();
  const { data, isLoading, refetch, hasNextPage, fetchNextPage, error } =
    useGetCompletedAnime();

  const dataArr = data?.pages.map((page) => page).flat();

  useEffect(() => {
    if (data) {
      setCompletedLists(dataArr);
    }
  }, [data]);

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

      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <Welcome />
        <AnimeLists
          data={completedLists}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          title={"Completed Animes"}
        />
      </View>
    </SafeAreaView>
  );
}
