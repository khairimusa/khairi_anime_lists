import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "react-native";
import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  AnimeAbout,
  AnimeTabs,
  ScreenHeaderBtn,
  Anime,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import useStore from "../../utils/store";

const styles = StyleSheet.create({
  likeBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: COLORS.primary,
  },
  likedBtn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  likedBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: COLORS.primary,
  },
});

const tabs = ["About", "Background"];

const AnimeDetails = () => {
  const queryClient = new QueryClient();
  const params = useSearchParams();
  const router = useRouter();
  const id = params.id;
  const [currentAnime, setCurrentAnime] = useState();
  const {
    favourite,
    setFavourite,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    favouriteAnimes,
  } = useStore();
  const { data, isLoading, error, refetch } = useFetch(id);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Background":
        return (
          <AnimeAbout
            info={data.background ?? "No data provided"}
            title={"Background"}
          />
        );
      case "About":
        return (
          <AnimeAbout
            info={data.synopsis ?? "No data provided"}
            title={"About"}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {}, [favourite]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <QueryClientProvider client={queryClient}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
              />
            ),
            headerRight: () => (
              <>
                {isLoading ? (
                  <Text></Text>
                ) : favourite ? (
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {
                      setFavourite(!favourite);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="cards-heart"
                      size={24}
                      color={COLORS.primary}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {
                      setFavourite(!favourite);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="cards-heart-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                  </Pressable>
                )}
              </>
            ),
            headerTitle: "",
          }}
        />

        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : data.length === 0 ? (
              <Text>No data available</Text>
            ) : (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Anime
                  animeLogo={data.images.webp.large_image_url}
                  animeTitle={data.title}
                  genre={data.genres[0]?.name}
                  producer={data.producers[0]?.name}
                  year={data.year}
                />

                <AnimeTabs
                  tabs={tabs ?? ""}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {displayTabContent()}
              </View>
            )}
          </ScrollView>
        </>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default AnimeDetails;
