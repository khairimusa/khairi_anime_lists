import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

import styles from "./animelists.style";
import { COLORS } from "../../../constants";
import AnimeListCard from "../../common/cards/animelistscard/AnimeListCard";
import useGetPosts from "../../../hook/useGetPosts";

const AnimeLists = () => {
  const router = useRouter();
  const { data, isLoading, refetch, hasNextPage, fetchNextPage, error } =
    useGetPosts();

  const dataArr = data?.pages.map((page) => page).flat();

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({ item }) => (
    <View
      style={{
        paddingVertical: 5,
        paddingHorizontal: 1,
        shadowColor: COLORS.black,
      }}
    >
      <AnimeListCard
        anime={item}
        key={item.mal_id}
        handleNavigate={() => router.push(`/anime-details/${item.mal_id}`)}
      />
    </View>
  );

  const onReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anime Lists</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <View style={{ marginBottom: 80 }}>
            <FlatList
              data={dataArr}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              onEndReached={onReachEnd}
              onEndReachedThreshold={0}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default AnimeLists;
