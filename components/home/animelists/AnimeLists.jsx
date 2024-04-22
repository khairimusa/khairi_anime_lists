import { useRouter } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";

import styles from "./animelists.style";
import { COLORS } from "../../../constants";
import AnimeListCard from "../../common/cards/animelistscard/AnimeListCard";

const AnimeLists = (props) => {
  const { data, isLoading, hasNextPage, fetchNextPage, error, title } = props;
  const router = useRouter();
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
        handleNavigate={() => {
          router.push(`/anime-details/${item.mal_id}`);
        }}
      />
    </View>
  );

  const onReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title ?? "bro"}</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <View
            style={{
              paddingVertical: windowHeight / 3.1,
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <View style={{ marginBottom: 80 }}>
            <FlatList
              data={data}
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
