import { View, SafeAreaView, Text } from "react-native";
import { Stack } from "expo-router";
import { ScreenHeaderBtn, Welcome, AnimeLists } from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import useStore from "../../../../utils/store";
import { useEffect } from "react";
import useGetAiringAnimes from "../../../../hook/useGetAiringAnimes";

export default function Page() {
  const { airingLists, setAiringLists } = useStore();
  const { data, isLoading, refetch, hasNextPage, fetchNextPage, error } =
    useGetAiringAnimes();

  const dataArr = data?.pages.map((page) => page).flat();

  useEffect(() => {
    if (data) {
      setAiringLists(dataArr);
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
          data={airingLists}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          title={"Airing Shows"}
        />
      </View>
    </SafeAreaView>
  );
}
