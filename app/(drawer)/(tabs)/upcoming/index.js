import { View, SafeAreaView, Text } from "react-native";
import { Stack } from "expo-router";
import {
  UpcomingAnimeLists,
  ScreenHeaderBtn,
  Welcome,
  AnimeLists,
} from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import useStore from "../../../../utils/store";
import { useEffect } from "react";
import useGetUpcomingAnime from "../../../../hook/useGetUpcomingAnime";

export default function Page() {
  const { upcomingLists, setUpcomingLists } = useStore();
  const { data, isLoading, refetch, hasNextPage, fetchNextPage, error } =
    useGetUpcomingAnime();

  const dataArr = data?.pages.map((page) => page).flat();

  useEffect(() => {
    if (data) {
      setUpcomingLists(dataArr);
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
          data={upcomingLists}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          title={"Upcoming Shows"}
        />
      </View>
    </SafeAreaView>
  );
}
